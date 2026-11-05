/**
 * frontend/src/panels/code.ts
 *
 * monaco editor bound to the active puzzle's solution.ts
 */

import type * as Monaco from 'monaco-editor';
import { api } from '../api.ts';
import { debugStore } from '../debugstore.ts';
import { h, pad, replace } from '../dom.ts';
import { editorOptions, loadMonaco } from '../editor.ts';
import { settings } from '../settings.ts';
import { monacoThemeName } from '../themes.ts';
import { actions, getState, subscribe } from '../state.ts';
import type { PanelDefinition } from '../workspace.ts';

export const codePanel: PanelDefinition = {
    id: 'code',
    title: 'Code',
    create(container) {
        let editor: Monaco.editor.IStandaloneCodeEditor | null = null;
        let monaco: Monaco.editor.IStandaloneCodeEditor extends never ? never : typeof Monaco | null = null;
        let savedCode: string | null = null;
        let loadedFor = '';
        let disposed = false;
        let zoom = 1;
        let decorations: Monaco.editor.IEditorDecorationsCollection | null = null;

        const options = () => {
            const base = editorOptions(settings.get());
            return { ...base, fontSize: Math.round((base.fontSize ?? 14) * zoom * 10) / 10 };
        };

        const path = h('span', { className: 'dim path' });
        const status = h('span', { className: 'dim' });
        const saveButton = h('button', { className: 'link', onClick: () => save() }, 'save');
        const host = h('div', { className: 'fill' });
        const overlay = h('div', { className: 'empty' });
        const body = h('div', { className: 'body tight', style: 'display: flex; flex-direction: column' });

        container.append(
            h('div', { className: 'panel' }, h('div', { className: 'toolbar' }, saveButton, path, h('span', { className: 'spacer' }), status), body),
        );

        const setStatus = (text: string, className = 'dim') => {
            status.textContent = text;
            status.className = className;
        };

        const save = async () => {
            if (!editor || savedCode === null) return;
            const code = editor.getValue();
            const { year, day } = getState().puzzle;
            try {
                await api.saveSolution(year, day, code);
                savedCode = code;
                actions.setPendingCode(null);
                setStatus('saved', 'ok');
            } catch (error) {
                setStatus(error instanceof Error ? error.message : String(error), 'error');
            }
        };

        const showOverlay = (...children: Parameters<typeof replace>[1][]) => {
            replace(overlay, ...children);
            replace(body, overlay);
        };

        const showEditor = () => {
            if (body.firstChild !== host) replace(body, host);
        };

        const load = async () => {
            const { puzzle } = getState();
            const key = `${puzzle.year}/${puzzle.day}`;
            if (key === loadedFor) return;
            loadedFor = key;
            path.textContent = `puzzles/${puzzle.year}/day${pad(puzzle.day)}/solution.ts`;
            savedCode = null;
            setStatus('loading…');
            showOverlay('loading…');

            try {
                const [code, monacoApi] = await Promise.all([api.solution(puzzle.year, puzzle.day), loadMonaco()]);
                if (disposed || loadedFor !== key) return;
                monaco = monacoApi;

                if (code === null) {
                    setStatus('no solution yet');
                    showOverlay(
                        h('p', null, 'this puzzle has not been generated yet.'),
                        h('button', {
                            className: 'link',
                            onClick: async (event: Event) => {
                                (event.target as HTMLButtonElement).disabled = true;
                                try {
                                    const warning = await actions.fetchPuzzle();
                                    loadedFor = '';
                                    await load();
                                    if (warning) setStatus(`solution created, but ${warning}`, 'error');
                                } catch (error) {
                                    setStatus(error instanceof Error ? error.message : String(error), 'error');
                                    (event.target as HTMLButtonElement).disabled = false;
                                }
                            },
                        }, 'fetch puzzle: create solution.ts and download input'),
                    );
                    return;
                }

                showEditor();
                if (!editor) {
                    editor = monaco.editor.create(host, { ...options(), theme: monacoThemeName(settings.get().theme), language: 'typescript', value: '' });
                    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => save());
                    decorations = editor.createDecorationsCollection();
                    // clicking the glyph margin toggles a breakpoint for the debugger panel
                    editor.onMouseDown((event) => {
                        const position = event.target.position;
                        if (monaco && position && event.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
                            debugStore.toggleBreakpoint(getState().puzzle, position.lineNumber);
                        }
                    });
                    editor.onDidChangeModelContent(() => {
                        if (savedCode === null) return;
                        const dirty = editor!.getValue() !== savedCode;
                        actions.setPendingCode(dirty ? editor!.getValue() : null);
                        setStatus(dirty ? 'unsaved changes' : 'saved', dirty ? '' : 'ok');
                    });
                }

                savedCode = null; // suppress dirty tracking while swapping content
                editor.setValue(code);
                savedCode = code;
                actions.setPendingCode(null);
                setStatus('saved', 'ok');
                editor.focus();
                renderDecorations();
            } catch (error) {
                if (loadedFor !== key) return;
                loadedFor = ''; // allow the next puzzle change (or token fix) to retry
                setStatus(error instanceof Error ? error.message : String(error), 'error');
                showOverlay(h('span', { className: 'error' }, error instanceof Error ? error.message : String(error)));
            }
        };

        /** breakpoint dots and the line the debugger is paused on */
        const renderDecorations = () => {
            if (!editor || !monaco || !decorations) return;
            const puzzle = getState().puzzle;
            const items: Monaco.editor.IModelDeltaDecoration[] = debugStore.breakpoints(puzzle).map((line) => ({
                range: new monaco!.Range(line, 1, line, 1),
                options: { glyphMarginClassName: 'bp-glyph', glyphMarginHoverMessage: { value: `breakpoint at line ${line}` } },
            }));
            const paused = debugStore.paused;
            if (paused && paused.year === puzzle.year && paused.day === puzzle.day && paused.line > 0) {
                items.push({
                    range: new monaco!.Range(paused.line, 1, paused.line, 1),
                    options: { isWholeLine: true, className: 'debug-current-line', glyphMarginClassName: 'debug-current-glyph' },
                });
                editor.revealLineInCenterIfOutsideViewport(paused.line);
            }
            decorations.set(items);
        };

        const unsubscribes = [
            subscribe(load, ['puzzle']),
            debugStore.onChange(renderDecorations),
            // when a run auto-saved the pending code, reflect that here
            subscribe(() => {
                const { dirty, pendingCode } = getState();
                if (!dirty && editor && savedCode !== null && pendingCode === null && editor.getValue() !== savedCode) {
                    savedCode = editor.getValue();
                    setStatus('saved', 'ok');
                }
            }, ['dirty']),
            settings.onChange((next, changed) => {
                editor?.updateOptions(options());
                if (changed.includes('theme') && monaco) monaco.editor.setTheme(monacoThemeName(next.theme));
            }),
        ];

        load();

        return {
            setZoom: (factor) => {
                zoom = factor;
                editor?.updateOptions(options());
            },
            dispose: () => {
                disposed = true;
                unsubscribes.forEach((fn) => fn());
                editor?.dispose();
            },
        };
    },
};
