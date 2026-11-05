/**
 * frontend/src/workspace.ts
 *
 * the dockable panel system: a registry of panels on top of dockview with persisted layouts and presets
 */

import type { DockviewApi, DockviewGroupPanel, DockviewPanelApi, IContentRenderer, IHeaderActionsRenderer, SerializedDockview } from 'dockview-core';
import { settings } from './settings.ts';
import { getTheme } from './themes.ts';

/** the full umd build is loaded from the cdn in index.html because it embeds the stylesheet; the npm package only provides types */
const dockview = (globalThis as unknown as Record<string, typeof import('dockview-core')>)['dockview-core'];

export interface PanelContext {
    api: DockviewPanelApi;
    workspace: Workspace;
}

export interface PanelInstance {
    dispose(): void;
    /** panels that can't be scaled with css zoom (monaco) implement their own */
    setZoom?(factor: number): void;
}

export interface PanelDefinition {
    id: string;
    title: string;
    /** builds the panel into container; called once per opened panel */
    create(container: HTMLElement, context: PanelContext): PanelInstance;
}

interface LayoutStep {
    id: string;
    position?: { referencePanel: string; direction: 'left' | 'right' | 'above' | 'below' | 'within' };
    initialWidth?: number;
    initialHeight?: number;
}

const LAYOUT_KEY = 'aoc.layout';
const ZOOM_KEY = 'aoc.zoom';
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.1;
const PRESETS_KEY = 'aoc.layout.presets';
const LOCK_KEY = 'aoc.layout.locked';
const KNOWN_KEY = 'aoc.layout.known'; // panel ids this browser has seen, so new panels show up once in an existing layout

type Listener = () => void;

export class Workspace {
    readonly dock: DockviewApi;
    private definitions = new Map<string, PanelDefinition>();
    private listeners = new Set<Listener>();
    private saveTimer: number | undefined;
    private restoring = false;
    private zoomLevels: Record<string, number> = Workspace.loadZoom();
    private hosts = new Map<string, { host: HTMLElement; instance: PanelInstance | null }>();
    private zoomListeners = new Set<Listener>();
    private lockedState = localStorage.getItem(LOCK_KEY) === 'true';

    constructor(private root: HTMLElement, definitions: PanelDefinition[], private defaultLayout: LayoutStep[]) {
        for (const definition of definitions) this.definitions.set(definition.id, definition);

        this.dock = dockview.createDockview(root, {
            theme: getTheme(settings.get().theme).dark ? dockview.themeDark : dockview.themeLight,
            disableFloatingGroups: false,
            locked: this.lockedState,
            createComponent: ({ name }) => this.createRenderer(name),
            createRightHeaderActionComponent: (group) => this.createHeaderActions(group),
        });

        this.dock.onDidLayoutChange(() => this.scheduleSave());
        this.dock.onDidAddPanel(() => this.notify());
        this.dock.onDidRemovePanel(() => this.notify());

        const restored = this.restore();
        if (!restored) this.reset();
        this.introduceNewPanels(restored);
    }

    /** dockview's base theme (icon colours, drag overlays) follows light/dark; the palette itself comes from css variables */
    setDark(dark: boolean): void {
        this.dock.updateOptions({ theme: dark ? dockview.themeDark : dockview.themeLight });
    }

    get panels(): PanelDefinition[] {
        return [...this.definitions.values()];
    }

    get locked(): boolean {
        return this.lockedState;
    }

    setLocked(locked: boolean): void {
        this.lockedState = locked;
        this.dock.updateOptions({ locked });
        localStorage.setItem(LOCK_KEY, String(locked));
        this.notify();
    }

    isOpen(id: string): boolean {
        return this.dock.getPanel(id) !== undefined;
    }

    /** opens (or focuses) a panel; new panels join the active group so they land somewhere sensible */
    open(id: string): void {
        const existing = this.dock.getPanel(id);
        if (existing) {
            existing.api.setActive();
            return;
        }
        const definition = this.definitions.get(id);
        if (!definition) throw new Error(`unknown panel '${id}'`);

        const active = this.dock.activePanel;
        this.dock.addPanel({
            id,
            component: id,
            title: definition.title,
            position: active ? { referencePanel: active.id, direction: 'within' } : undefined,
        });
    }

    close(id: string): void {
        this.dock.getPanel(id)?.api.close();
    }

    toggle(id: string): void {
        this.isOpen(id) ? this.close(id) : this.open(id);
    }

    // ---- zoom ------------------------------------------------------------

    getZoom(id: string): number {
        return this.zoomLevels[id] ?? 1;
    }

    /** scales a panel's content; remembered per panel */
    setZoom(id: string, factor: number): void {
        const clamped = Math.round(Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, factor)) * 100) / 100;
        if (clamped === 1) delete this.zoomLevels[id];
        else this.zoomLevels[id] = clamped;
        localStorage.setItem(ZOOM_KEY, JSON.stringify(this.zoomLevels));
        this.applyZoom(id);
        for (const listener of this.zoomListeners) listener();
    }

    zoomBy(id: string, steps: number): void {
        this.setZoom(id, this.getZoom(id) + steps * ZOOM_STEP);
    }

    onZoomChange(listener: Listener): () => void {
        this.zoomListeners.add(listener);
        return () => this.zoomListeners.delete(listener);
    }

    private applyZoom(id: string): void {
        const entry = this.hosts.get(id);
        if (!entry) return;
        const factor = this.getZoom(id);
        if (entry.instance?.setZoom) {
            entry.host.style.zoom = '';
            entry.instance.setZoom(factor);
        } else {
            entry.host.style.zoom = factor === 1 ? '' : String(factor);
        }
    }

    private static loadZoom(): Record<string, number> {
        try {
            return JSON.parse(localStorage.getItem(ZOOM_KEY) ?? '{}');
        } catch {
            return {};
        }
    }

    /** [−] 100% [+] [⤢] in every group's tab bar, acting on the group's active panel */
    private createHeaderActions(group: DockviewGroupPanel): IHeaderActionsRenderer {
        const element = document.createElement('div');
        element.className = 'dv-zoom-actions';

        const button = (label: string, title: string, onClick: () => void) => {
            const node = document.createElement('button');
            node.className = 'link';
            node.textContent = label;
            node.title = title;
            node.addEventListener('mousedown', (event) => event.stopPropagation()); // don't start a drag
            node.addEventListener('click', (event) => {
                event.stopPropagation();
                onClick();
            });
            return node;
        };

        const level = button('100%', 'reset zoom', () => {
            const id = group.activePanel?.id;
            if (id) this.setZoom(id, 1);
        });
        const maximize = button('⤢', 'maximize / restore this panel', () => {
            const panel = group.activePanel;
            if (!panel) return;
            this.dock.hasMaximizedGroup() ? this.dock.exitMaximizedGroup() : this.dock.maximizeGroup(panel);
        });

        element.append(
            button('−', 'zoom out', () => group.activePanel && this.zoomBy(group.activePanel.id, -1)),
            level,
            button('+', 'zoom in', () => group.activePanel && this.zoomBy(group.activePanel.id, 1)),
            maximize,
        );

        const refresh = () => {
            const id = group.activePanel?.id;
            level.textContent = `${Math.round(this.getZoom(id ?? '') * 100)}%`;
            maximize.textContent = this.dock.hasMaximizedGroup() ? '⤡' : '⤢';
        };

        const disposables: { dispose(): void }[] = [];
        return {
            element,
            init: (params) => {
                disposables.push(params.api.onDidActivePanelChange(refresh), params.containerApi.onDidMaximizedGroupChange(refresh));
                disposables.push({ dispose: this.onZoomChange(refresh) });
                refresh();
            },
            dispose: () => disposables.forEach((disposable) => disposable.dispose()),
        };
    }

    /** rebuilds the default arrangement */
    reset(): void {
        this.restoring = true;
        this.dock.clear();
        for (const step of this.defaultLayout) {
            const definition = this.definitions.get(step.id);
            if (!definition) continue;
            this.dock.addPanel({
                id: step.id,
                component: step.id,
                title: definition.title,
                position: step.position,
                initialWidth: step.initialWidth,
                initialHeight: step.initialHeight,
            });
        }
        // the first panel of every group becomes the visible tab
        for (const step of this.defaultLayout) {
            if (!step.position || step.position.direction !== 'within') this.dock.getPanel(step.id)?.api.setActive();
        }
        this.restoring = false;
        this.save();
        this.notify();
    }

    onChange(listener: Listener): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    /** panels added in a newer build get opened once, next to the runner, instead of hiding until someone finds the menu */
    private introduceNewPanels(restored: boolean): void {
        let known: string[] = [];
        try {
            known = JSON.parse(localStorage.getItem(KNOWN_KEY) ?? 'null') ?? [];
        } catch {
            known = [];
        }
        const ids = [...this.definitions.keys()];
        // first run of a build that tracks this: a restored layout knows exactly the panels it shows (settings is optional)
        if (!known.length && restored) known = [...ids.filter((id) => this.isOpen(id)), 'settings'];
        if (known.length) {
            for (const id of ids) {
                if (known.includes(id) || this.isOpen(id)) continue;
                const anchor = ['runner', 'code', ...ids].find((candidate) => this.isOpen(candidate));
                this.dock.addPanel({
                    id,
                    component: id,
                    title: this.definitions.get(id)!.title,
                    position: anchor ? { referencePanel: anchor, direction: 'within' } : undefined,
                    inactive: true,
                });
            }
        }
        localStorage.setItem(KNOWN_KEY, JSON.stringify(ids));
    }

    // ---- presets --------------------------------------------------------

    presetNames(): string[] {
        return Object.keys(this.loadPresets()).sort();
    }

    savePreset(name: string): void {
        const presets = this.loadPresets();
        presets[name] = this.dock.toJSON();
        localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
        this.notify();
    }

    loadPreset(name: string): boolean {
        const preset = this.loadPresets()[name];
        if (!preset) return false;
        return this.apply(preset);
    }

    deletePreset(name: string): void {
        const presets = this.loadPresets();
        delete presets[name];
        localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
        this.notify();
    }

    clearPresets(): void {
        localStorage.removeItem(PRESETS_KEY);
        this.notify();
    }

    // ---- internals ------------------------------------------------------

    private createRenderer(name: string): IContentRenderer {
        const definition = this.definitions.get(name);
        const element = document.createElement('div');
        element.className = 'panel-host';
        element.style.height = '100%';
        element.style.width = '100%';

        if (!definition) throw new Error(`unknown panel component '${name}'`);

        let instance: PanelInstance | null = null;
        return {
            element,
            init: (parameters) => {
                instance = definition.create(element, { api: parameters.api, workspace: this });
                this.hosts.set(name, { host: element, instance });
                this.applyZoom(name);
            },
            dispose: () => {
                instance?.dispose();
                instance = null;
                this.hosts.delete(name);
            },
        };
    }

    private apply(layout: SerializedDockview): boolean {
        this.restoring = true;
        try {
            this.dock.fromJSON(layout);
            if (this.dock.panels.length === 0) throw new Error('empty layout');
            return true;
        } catch (error) {
            console.warn('could not apply layout, using default', error);
            this.dock.clear();
            return false;
        } finally {
            this.restoring = false;
            this.save();
            this.notify();
        }
    }

    private restore(): boolean {
        const raw = localStorage.getItem(LAYOUT_KEY);
        if (!raw) return false;
        try {
            return this.apply(JSON.parse(raw));
        } catch {
            return false;
        }
    }

    private scheduleSave() {
        if (this.restoring) return;
        clearTimeout(this.saveTimer);
        this.saveTimer = setTimeout(() => this.save(), 300);
    }

    private save() {
        try {
            localStorage.setItem(LAYOUT_KEY, JSON.stringify(this.dock.toJSON()));
        } catch (error) {
            console.warn('could not save layout', error);
        }
    }

    private loadPresets(): Record<string, SerializedDockview> {
        try {
            return JSON.parse(localStorage.getItem(PRESETS_KEY) ?? '{}');
        } catch {
            return {};
        }
    }

    private notify() {
        for (const listener of this.listeners) listener();
    }
}
