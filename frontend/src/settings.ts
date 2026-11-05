/**
 * frontend/src/settings.ts
 *
 * user preferences persisted in localStorage
 */

import type { Part, PuzzleRef } from './types.ts';

export interface Settings {
    token: string;
    apiBase: string;
    defaultPart: Part;
    defaultIterations: number;
    defaultFake: boolean;
    confirmSubmit: boolean;
    runTimeoutMs: number;
    editorFontSize: number;
    editorMinimap: boolean;
    editorWordWrap: boolean;
    editorTabSize: number;
    snowflakes: boolean;
    theme: string;
    aocPanelMode: 'text' | 'website';
    lastPuzzle: PuzzleRef | null;
}

const STORAGE_KEY = 'aoc.settings';

export const DEFAULT_SETTINGS: Settings = {
    token: '',
    apiBase: '',
    defaultPart: 'both',
    defaultIterations: 10,
    defaultFake: false,
    confirmSubmit: true,
    runTimeoutMs: 120_000,
    editorFontSize: 14,
    editorMinimap: false,
    editorWordWrap: false,
    editorTabSize: 4,
    snowflakes: true,
    theme: 'aoc',
    aocPanelMode: 'text',
    lastPuzzle: null,
};

type Listener = (settings: Settings, changed: (keyof Settings)[]) => void;

const load = (): Settings => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_SETTINGS };
    } catch {
        return { ...DEFAULT_SETTINGS };
    }
};

let current = load();
const listeners = new Set<Listener>();

export const settings = {
    get: (): Settings => current,

    set(patch: Partial<Settings>): void {
        const changed = (Object.keys(patch) as (keyof Settings)[]).filter((key) => JSON.stringify(patch[key]) !== JSON.stringify(current[key]));
        if (changed.length === 0) return;
        current = { ...current, ...patch };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
        for (const listener of listeners) listener(current, changed);
    },

    reset(): void {
        this.set({ ...DEFAULT_SETTINGS, token: current.token, apiBase: current.apiBase });
    },

    onChange(listener: Listener): () => void {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },
};
