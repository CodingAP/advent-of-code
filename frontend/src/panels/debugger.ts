/**
 * frontend/src/panels/debugger.ts
 *
 * an in-browser debugger for solution runs: breakpoints from the editor gutter, pause / resume / step, call stack,
 * scope variables and an evaluate box, over the inspector websocket the api proxies. works in any browser.
 *
 * deno runs transpiled javascript, so v8 reports line numbers of the generated code; the solution's inline source
 * map translates them back to the typescript file (and breakpoints the other way).
 */

import { type CallFrame, CdpClient, describeValue, inspectorUrl, type PausedEvent, type PropertyDescriptor, type RemoteObject, SourceMap } from '../cdp.ts';
import { type DebugRequest, debugStore } from '../debugstore.ts';
import { clear, h, pad, replace } from '../dom.ts';
import { createLiveLog, devtoolsUrl } from '../livelog.ts';
import { settings } from '../settings.ts';
import { actions, getState, subscribe } from '../state.ts';
import type { Part, PuzzleRef, RunHandlers } from '../types.ts';
import type { PanelDefinition } from '../workspace.ts';

const solutionRegex = (puzzle: PuzzleRef) => `.*/puzzles/${puzzle.year}/day${pad(puzzle.day)}/solution\\.ts$`;
const isSolutionUrl = (url: string, puzzle: PuzzleRef) => new RegExp(solutionRegex(puzzle)).test(url);
const shortFile = (url: string) => url.split('/').slice(-3).join('/');

export const debuggerPanel: PanelDefinition = {
    id: 'debugger',
    title: 'Debugger',
    create(container) {
        let client: CdpClient | null = null;
        let controller: AbortController | null = null;
        let paused: PausedEvent | null = null;
        let selectedFrame = 0;
        let firstPause = true;
        let sessionPuzzle: PuzzleRef | null = null;
        const breakpointIds = new Map<number, string>();
        /** the solution script once v8 has parsed it, with its source map */
        let solution: { scriptId: string; map: SourceMap | null } | null = null;

        const part = h(
            'select',
            null,
            h('option', { value: 'both' }, 'both parts'),
            h('option', { value: '1' }, 'part 1'),
            h('option', { value: '2' }, 'part 2'),
        ) as HTMLSelectElement;
        part.value = settings.get().defaultPart;
        const exceptions = h('input', { type: 'checkbox', id: 'dbg-exceptions', title: 'pause on uncaught exceptions' });
        const status = h('span', { className: 'dim' }, 'idle');
        const devtools = h('a', {
            className: 'bracket dim',
            target: '_blank',
            rel: 'noopener',
            style: 'display: none',
            title: 'the same session in chrome devtools',
        }, 'devtools url');

        const startButton = h('button', { className: 'link', onClick: () => start() }, '🐞 debug');
        const pauseButton = h('button', { className: 'link', title: 'pause', onClick: () => send('Debugger.pause') }, '⏸');
        const resumeButton = h('button', { className: 'link', title: 'resume (F8)', onClick: () => send('Debugger.resume') }, '▶');
        const overButton = h('button', { className: 'link', title: 'step over (F10)', onClick: () => send('Debugger.stepOver') }, '⤼ over');
        const intoButton = h('button', { className: 'link', title: 'step into (F11)', onClick: () => send('Debugger.stepInto') }, '⤵ into');
        const outButton = h('button', { className: 'link', title: 'step out (shift+F11)', onClick: () => send('Debugger.stepOut') }, '⤴ out');
        const stopButton = h('button', { className: 'link error', title: 'stop the run', onClick: () => stop() }, '■ stop');

        const frames = h('div', { className: 'dbg-list' });
        const breakpoints = h('div', { className: 'dbg-list' });
        const scopes = h('div', { className: 'dbg-list' });
        const evalInput = h('input', { type: 'text', placeholder: 'evaluate in the selected frame, e.g. lines.length', className: 'dbg-eval' });
        const evalOutput = h('div', { className: 'dbg-eval-output' });
        const live = createLiveLog();

        const setStatus = (text: string, className = 'dim') => {
            status.textContent = text;
            status.className = className;
        };

        const updateButtons = () => {
            const active = !!client && !client.closed;
            startButton.disabled = getState().running || active;
            pauseButton.disabled = !active || !!paused;
            for (const button of [resumeButton, overButton, intoButton, outButton]) button.disabled = !active || !paused;
            stopButton.disabled = !controller;
        };

        const send = async (method: string, params?: Record<string, unknown>) => {
            if (!client) return;
            try {
                await client.send(method, params);
            } catch (error) {
                setStatus(error instanceof Error ? error.message : String(error), 'error');
            }
        };

        /** 1-based typescript line for a location in the solution script (raw line elsewhere) */
        const originalLine = (scriptId: string, lineNumber: number, columnNumber = 0): number => {
            if (solution && scriptId === solution.scriptId && solution.map) {
                const mapped = solution.map.toOriginal(lineNumber, columnNumber);
                if (mapped !== null) return mapped + 1;
            }
            return lineNumber + 1;
        };

        // ---- session -------------------------------------------------------

        const start = async (request?: DebugRequest) => {
            if (controller) return;
            if (request) part.value = request.part;
            sessionPuzzle = getState().puzzle;
            controller = new AbortController();
            firstPause = true;
            breakpointIds.clear();
            solution = null;
            live.clear();
            clear(frames);
            clear(scopes);
            clear(evalOutput);
            devtools.style.display = 'none';
            setStatus(request?.input ? `starting with example '${request.label ?? 'example'}'…` : 'starting…');
            updateButtons();

            const handlers: RunHandlers = {
                onLog: (line) => live.append(line),
                onInspector: ({ token }) => {
                    devtools.href = devtoolsUrl(token, settings.get().apiBase);
                    devtools.style.display = '';
                    connect(token).catch((error) => setStatus(error instanceof Error ? error.message : String(error), 'error'));
                },
            };
            const outcome = request?.input
                ? await actions.runExample({ part: part.value as Part, input: request.input, debug: true }, controller.signal, handlers)
                : await actions.run({ part: part.value as Part, iterations: 1, debug: true }, controller.signal, handlers);

            const cancelled = controller.signal.aborted;
            controller = null;
            disconnect();
            if (outcome?.success) {
                const answers = (['part1', 'part2'] as const)
                    .map((key) => outcome.results[key] ? `${key.replace('part', 'part ')} = ${outcome.results[key]!.answer}` : null)
                    .filter(Boolean)
                    .join(', ');
                setStatus(`finished: ${answers || 'no result'}`, 'ok');
            } else if (cancelled) setStatus('stopped');
            else setStatus(outcome?.error ?? getState().lastError ?? 'failed', 'error');
            updateButtons();
        };

        const connect = async (token: string) => {
            client = new CdpClient(inspectorUrl(token, settings.get().apiBase));
            client.onClose = () => {
                paused = null;
                debugStore.setPaused(null);
                updateButtons();
            };
            client.on('Debugger.paused', (params) => onPaused(params as PausedEvent));
            client.on('Debugger.resumed', () => {
                paused = null;
                debugStore.setPaused(null);
                clear(frames);
                clear(scopes);
                setStatus('running…');
                updateButtons();
            });
            await client.ready;
            await client.send('Runtime.enable');
            await client.send('Debugger.enable');
            await client.send('Debugger.setPauseOnExceptions', { state: exceptions.checked ? 'uncaught' : 'none' });
            // pause right before each source-mapped script runs: that is when the solution's breakpoints can be placed
            await client.send('Debugger.setInstrumentationBreakpoint', { instrumentation: 'beforeScriptWithSourceMapExecution' });
            await client.send('Runtime.runIfWaitingForDebugger');
            setStatus('running…');
            updateButtons();
        };

        const disconnect = () => {
            client?.close();
            client = null;
            paused = null;
            debugStore.setPaused(null);
            updateButtons();
        };

        const stop = () => {
            controller?.abort();
            disconnect();
        };

        const onPaused = async (event: PausedEvent) => {
            if (!client || !sessionPuzzle) return;
            const top = event.callFrames[0];
            const url = top ? (top.url || client.scripts.get(top.location.scriptId) || '') : '';

            if (event.reason === 'instrumentation') {
                const data = event.data as { scriptId?: string; url?: string } | undefined;
                const scriptId = data?.scriptId ?? top?.location.scriptId;
                const scriptUrl = data?.url ?? (scriptId ? client.scripts.get(scriptId) ?? '' : '');
                if (scriptId && isSolutionUrl(scriptUrl, sessionPuzzle)) {
                    const mapUrl = client.sourceMaps.get(scriptId);
                    solution = { scriptId, map: mapUrl ? SourceMap.fromUrl(mapUrl) : null };
                    await syncBreakpoints();
                }
                await send('Debugger.resume');
                return;
            }
            // --inspect-brk stops at the first line of the first module, not the solution: skip that one
            if (firstPause && !isSolutionUrl(url, sessionPuzzle)) {
                firstPause = false;
                await send('Debugger.resume');
                return;
            }
            firstPause = false;
            paused = event;
            selectedFrame = 0;
            const line = isSolutionUrl(url, sessionPuzzle) ? originalLine(top.location.scriptId, top.location.lineNumber, top.location.columnNumber) : 0;
            debugStore.setPaused({ ...sessionPuzzle, line, file: url });
            const reason = event.reason === 'exception'
                ? `exception: ${event.data?.description?.split('\n')[0] ?? ''}`
                : event.reason === 'other' || event.reason === 'breakpoint'
                ? 'paused'
                : event.reason;
            setStatus(`${reason} at ${line ? `solution.ts:${line}` : shortFile(url) + ':' + (top.location.lineNumber + 1)}`, 'ok');
            renderFrames();
            await renderScopes();
            updateButtons();
        };

        // ---- breakpoints -----------------------------------------------------

        const syncBreakpoints = async () => {
            if (!client || !sessionPuzzle || !solution) return; // nothing to attach to until v8 has parsed the solution
            const wanted = new Set(debugStore.breakpoints(sessionPuzzle));
            for (const [line, id] of breakpointIds) {
                if (!wanted.has(line)) {
                    await send('Debugger.removeBreakpoint', { breakpointId: id });
                    breakpointIds.delete(line);
                }
            }
            for (const line of wanted) {
                if (breakpointIds.has(line)) continue;
                const generated = solution.map ? solution.map.toGenerated(line - 1) : line - 1;
                if (generated === null) {
                    setStatus(`no code at line ${line} to break on`, 'error');
                    continue;
                }
                try {
                    const result = await client.send<{ breakpointId: string }>('Debugger.setBreakpoint', {
                        location: { scriptId: solution.scriptId, lineNumber: generated },
                    });
                    breakpointIds.set(line, result.breakpointId);
                } catch (error) {
                    setStatus(`breakpoint at line ${line}: ${error instanceof Error ? error.message : String(error)}`, 'error');
                }
            }
        };

        const renderBreakpoints = () => {
            const puzzle = getState().puzzle;
            const lines = debugStore.breakpoints(puzzle);
            replace(
                breakpoints,
                lines.length
                    ? lines.map((line) =>
                        h(
                            'div',
                            { className: 'dbg-row' },
                            h('span', null, `solution.ts:${line}`),
                            h('button', { className: 'link dim', title: 'remove', onClick: () => debugStore.toggleBreakpoint(puzzle, line) }, '×'),
                        )
                    )
                    : h('div', { className: 'dim' }, 'click the editor gutter (left of the line numbers) to add one'),
                lines.length ? h('button', { className: 'link dim', onClick: () => debugStore.clearBreakpoints(puzzle) }, 'clear all') : null,
            );
        };

        // ---- call stack and scopes ------------------------------------------

        const renderFrames = () => {
            if (!paused || !client || !sessionPuzzle) return clear(frames);
            replace(
                frames,
                paused.callFrames.map((frame: CallFrame, index) => {
                    const url = frame.url || client!.scripts.get(frame.location.scriptId) || '';
                    const own = isSolutionUrl(url, sessionPuzzle!);
                    const line = own
                        ? originalLine(frame.location.scriptId, frame.location.lineNumber, frame.location.columnNumber)
                        : frame.location.lineNumber + 1;
                    return h(
                        'div',
                        {
                            className: `dbg-row dbg-frame${index === selectedFrame ? ' active' : ''}${own ? '' : ' dim'}`,
                            onClick: async () => {
                                selectedFrame = index;
                                renderFrames();
                                await renderScopes();
                            },
                        },
                        h('span', null, frame.functionName || '(anonymous)'),
                        h('span', { className: 'dim' }, `${own ? 'solution.ts' : shortFile(url)}:${line}`),
                    );
                }),
            );
        };

        const propertyRow = (property: PropertyDescriptor): HTMLElement => {
            const value = property.value;
            const row = h('div', { className: 'dbg-prop' });
            const expandable = !!value?.objectId && value.type === 'object' && value.subtype !== 'null';
            let children: HTMLElement | null = null;
            const toggle = h('button', { className: 'link dim dbg-toggle', style: expandable ? '' : 'visibility: hidden' }, '▸');
            toggle.addEventListener('click', async () => {
                if (!client || !value?.objectId) return;
                if (children) {
                    children.remove();
                    children = null;
                    toggle.textContent = '▸';
                    return;
                }
                toggle.textContent = '▾';
                children = h('div', { className: 'dbg-children' }, h('span', { className: 'dim' }, 'loading…'));
                row.append(children);
                try {
                    const result = await client.send<{ result: PropertyDescriptor[] }>('Runtime.getProperties', {
                        objectId: value.objectId,
                        ownProperties: true,
                        generatePreview: true,
                    });
                    replace(children, result.result.filter((p) => p.name !== '__proto__').map(propertyRow));
                } catch (error) {
                    replace(children, h('span', { className: 'error' }, error instanceof Error ? error.message : String(error)));
                }
            });
            row.append(
                toggle,
                h('span', { className: 'dbg-name' }, property.name),
                h('span', { className: 'dim' }, ': '),
                h('span', { className: 'dbg-value' }, describeValue(value ?? property.get)),
            );
            return row;
        };

        const renderScopes = async () => {
            if (!paused || !client) return clear(scopes);
            const frame = paused.callFrames[selectedFrame];
            if (!frame) return clear(scopes);
            replace(scopes, h('div', { className: 'dim' }, 'loading…'));
            const sections: HTMLElement[] = [];
            for (const scope of frame.scopeChain) {
                if (scope.type === 'global' || !scope.object.objectId) continue;
                try {
                    const result = await client.send<{ result: PropertyDescriptor[] }>('Runtime.getProperties', {
                        objectId: scope.object.objectId,
                        ownProperties: true,
                        generatePreview: true,
                    });
                    const rows = result.result.filter((p) => p.name !== '__proto__');
                    if (!rows.length) continue;
                    sections.push(
                        h(
                            'div',
                            { className: 'dbg-scope' },
                            h('div', { className: 'dbg-scope-title' }, scope.name ? `${scope.type} (${scope.name})` : scope.type),
                            ...rows.map(propertyRow),
                        ),
                    );
                } catch (error) {
                    sections.push(h('div', { className: 'error' }, error instanceof Error ? error.message : String(error)));
                }
            }
            if (paused !== null) replace(scopes, sections.length ? sections : h('div', { className: 'dim' }, 'no local variables here'));
        };

        const evaluate = async () => {
            const expression = evalInput.value.trim();
            if (!expression || !client || !paused) return;
            const frame = paused.callFrames[selectedFrame];
            try {
                const result = await client.send<{ result: RemoteObject; exceptionDetails?: { text: string; exception?: RemoteObject } }>(
                    'Debugger.evaluateOnCallFrame',
                    {
                        callFrameId: frame.callFrameId,
                        expression,
                        generatePreview: true,
                    },
                );
                replace(
                    evalOutput,
                    h(
                        'div',
                        { className: 'dbg-row' },
                        h('span', { className: 'dim' }, `${expression} → `),
                        result.exceptionDetails
                            ? h('span', { className: 'error' }, describeValue(result.exceptionDetails.exception) || result.exceptionDetails.text)
                            : h('span', { className: 'dbg-value' }, describeValue(result.result)),
                    ),
                    ...(result.result.objectId && !result.exceptionDetails ? [propertyRow({ name: 'result', value: result.result })] : []),
                );
            } catch (error) {
                replace(evalOutput, h('span', { className: 'error' }, error instanceof Error ? error.message : String(error)));
            }
        };
        evalInput.addEventListener('keydown', (event) => event.key === 'Enter' && evaluate());

        // keyboard shortcuts while the panel has focus
        const keys = (event: KeyboardEvent) => {
            if (!client || !paused) return;
            if (event.key === 'F8') send('Debugger.resume');
            else if (event.key === 'F10') send('Debugger.stepOver');
            else if (event.key === 'F11' && !event.shiftKey) send('Debugger.stepInto');
            else if (event.key === 'F11' && event.shiftKey) send('Debugger.stepOut');
            else return;
            event.preventDefault();
        };
        container.addEventListener('keydown', keys);

        container.append(
            h(
                'div',
                { className: 'panel', tabIndex: 0 },
                h(
                    'div',
                    { className: 'toolbar' },
                    h('span', { className: 'group' }, startButton, part),
                    h('span', { className: 'group' }, pauseButton, resumeButton, overButton, intoButton, outButton),
                    h('span', { className: 'group' }, stopButton),
                    h('span', { className: 'group' }, exceptions, h('label', { htmlFor: 'dbg-exceptions' }, 'pause on exceptions')),
                    h('span', { className: 'spacer' }),
                    status,
                    devtools,
                ),
                h(
                    'div',
                    { className: 'body tight debugger' },
                    h(
                        'div',
                        { className: 'dbg-columns' },
                        h('div', { className: 'dbg-column' }, h('h4', null, 'call stack'), frames, h('h4', null, 'breakpoints'), breakpoints),
                        h('div', { className: 'dbg-column' }, h('h4', null, 'scope'), scopes, h('h4', null, 'evaluate'), evalInput, evalOutput),
                    ),
                    live.element,
                ),
            ),
        );

        exceptions.addEventListener('change', () => send('Debugger.setPauseOnExceptions', { state: exceptions.checked ? 'uncaught' : 'none' }));

        const unsubscribes = [
            debugStore.onChange(() => {
                renderBreakpoints();
                if (client && !client.closed) syncBreakpoints();
                const request = debugStore.takeRequest();
                if (request) start(request);
            }),
            subscribe(() => {
                if (controller) stop();
                renderBreakpoints();
                setStatus('idle');
            }, ['puzzle']),
            subscribe(updateButtons, ['running', 'detail']),
        ];
        renderBreakpoints();
        updateButtons();
        // another panel may have asked for a session before this one existed
        const pending = debugStore.takeRequest();
        if (pending) setTimeout(() => start(pending), 0);

        return {
            dispose: () => {
                stop();
                container.removeEventListener('keydown', keys);
                unsubscribes.forEach((fn) => fn());
            },
        };
    },
};
