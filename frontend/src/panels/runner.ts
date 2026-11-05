/**
 * frontend/src/panels/runner.ts
 *
 * run / profile / debug / submit controls, live console output, and the latest result
 */

import { debugStore } from '../debugstore.ts';
import { formatMs, h, replace } from '../dom.ts';
import { createLiveLog } from '../livelog.ts';
import { settings } from '../settings.ts';
import { actions, getState, subscribe } from '../state.ts';
import type { Part, RunOutcome, SubmitOutcome } from '../types.ts';
import type { PanelDefinition } from '../workspace.ts';

const partSelect = (value: Part) =>
    h(
        'select',
        { value },
        h('option', { value: 'both' }, 'both parts'),
        h('option', { value: '1' }, 'part 1'),
        h('option', { value: '2' }, 'part 2'),
    ) as HTMLSelectElement;

export const runnerPanel: PanelDefinition = {
    id: 'runner',
    title: 'Runner',
    create(container, { workspace }) {
        const current = settings.get();
        const runPart = partSelect(current.defaultPart);
        const iterations = h('input', {
            type: 'number',
            min: '1',
            max: '1000',
            value: String(current.defaultIterations),
            style: 'width: 70px',
            title: 'iterations',
        });
        const submitPart = partSelect(current.defaultPart);
        const fake = h('input', { type: 'checkbox', checked: current.defaultFake, id: 'runner-fake' });
        const summary = h('div', { className: 'run-summary' });
        const live = createLiveLog();
        const status = h('span', { className: 'dim run-status' });

        let controller: AbortController | null = null;
        let ticker: number | undefined;

        const runButton = h('button', { className: 'link', onClick: () => run('run') }, '▶ run');
        const profileButton = h('button', { className: 'link', onClick: () => run('profile') }, '⏱ profile');
        const debugButton = h('button', {
            className: 'link',
            title: 'open the debugger panel and start this run under it',
            onClick: () => {
                workspace.open('debugger');
                debugStore.requestSession({ part: runPart.value as Part });
            },
        }, '🐞 debug');
        const submitButton = h('button', { className: 'link', onClick: () => submit() }, '⬆ submit');
        const cancelButton = h('button', { className: 'link error', onClick: () => controller?.abort(), style: 'display: none' }, 'cancel');

        const startTicker = (label: string) => {
            const started = performance.now();
            const tick = () => {
                status.textContent = `${label}… ${((performance.now() - started) / 1000).toFixed(1)} s · ${live.lines} line${live.lines === 1 ? '' : 's'}`;
            };
            tick();
            ticker = setInterval(tick, 200);
        };
        const stopTicker = () => {
            clearInterval(ticker);
            ticker = undefined;
        };

        const run = async (mode: 'run' | 'profile') => {
            controller = new AbortController();
            live.clear();
            replace(summary);
            startTicker(mode === 'profile' ? 'profiling' : 'running');
            const options = mode === 'profile'
                ? { part: 'both' as Part, iterations: Math.max(1, Number(iterations.value) || 1), updateReadme: true, commit: settings.get().profilePush }
                : { part: runPart.value as Part, iterations: 1 };
            await actions.run(options, controller.signal, { onLog: (line) => live.append(line) });
            stopTicker();
            if (controller.signal.aborted) {
                status.textContent = 'cancelled';
                replace(summary, h('p', { className: 'dim' }, 'cancelled: the solution process was stopped.'));
            }
            controller = null;
        };

        const submit = async () => {
            const part = submitPart.value as Part;
            const isFake = fake.checked;
            if (settings.get().confirmSubmit && !isFake) {
                const label = part === 'both' ? 'both parts' : `part ${part}`;
                if (!confirm(`submit ${label} of ${getState().puzzle.year} day ${getState().puzzle.day} to adventofcode.com?`)) return;
            }
            live.clear();
            replace(summary, h('p', { className: 'dim' }, h('span', { className: 'spinner' }), ' running and submitting…'));
            await actions.submit({ part, fake: isFake });
        };

        const renderRun = (run: RunOutcome) => {
            const rows = (['part1', 'part2'] as const).map((key) => {
                const result = run.results[key];
                return h(
                    'tr',
                    null,
                    h('td', null, key.replace('part', 'part ')),
                    h('td', null, result ? h('span', { className: 'result-answer' }, result.answer) : h('span', { className: 'dim' }, 'n/a')),
                    h('td', { className: 'num' }, result ? formatMs(result.timeMs) : ''),
                );
            });
            replace(
                summary,
                h(
                    'p',
                    { className: run.success ? 'ok' : 'error' },
                    run.success ? '✓ finished' : run.cancelled ? '■ cancelled' : '✗ failed',
                    h(
                        'span',
                        { className: 'dim' },
                        ` · ${run.iterations} iteration${run.iterations === 1 ? '' : 's'} · ${formatMs(run.durationMs)} total · ${run.logLines} log line${
                            run.logLines === 1 ? '' : 's'
                        }${run.readmeUpdated ? ' · readme updated' : ''}`,
                    ),
                ),
                h(
                    'table',
                    { className: 'results' },
                    h('thead', null, h('tr', null, h('th', null, 'part'), h('th', null, 'answer'), h('th', null, 'avg time'))),
                    h('tbody', null, rows),
                ),
                run.error && !run.cancelled ? h('pre', { className: 'error', style: 'margin-top: 8px' }, run.error) : null,
                run.git
                    ? h('p', { className: run.git.pushed || !run.git.committed ? 'ok' : 'error', style: 'margin-top: 8px' }, `git: ${run.git.message}`)
                    : null,
            );
            status.textContent = run.success ? `done in ${formatMs(run.durationMs)}` : run.cancelled ? 'cancelled' : 'failed';
        };

        const renderSubmit = (result: SubmitOutcome) => {
            const rows = (['part1', 'part2'] as const).map((key) => {
                const part = result[key];
                if (!part) return null;
                return h(
                    'tr',
                    null,
                    h('td', null, key.replace('part', 'part ')),
                    h('td', null, h('span', { className: 'result-answer' }, part.answer)),
                    h('td', { className: part.correct === true ? 'ok' : part.correct === false ? 'error' : 'dim' }, part.message),
                );
            });
            replace(
                summary,
                h(
                    'table',
                    { className: 'results' },
                    h('thead', null, h('tr', null, h('th', null, 'part'), h('th', null, 'answer'), h('th', null, 'result'))),
                    h('tbody', null, rows),
                ),
            );
            status.textContent = '';
        };

        const render = () => {
            const { running, lastRun, lastSubmit, lastError, detail } = getState();
            const canRun = !running && !!detail?.hasSolution;
            for (const button of [runButton, profileButton, debugButton, submitButton]) button.disabled = !canRun;
            cancelButton.style.display = running && controller ? '' : 'none';

            if (running) return;
            if (lastError) {
                replace(summary, h('pre', { className: 'error' }, lastError));
                status.textContent = 'failed';
            } else if (lastSubmit) renderSubmit(lastSubmit);
            else if (lastRun) renderRun(lastRun);
            else if (detail && !detail.hasSolution) {
                replace(summary, h('p', { className: 'dim' }, 'no solution yet: fetch the puzzle from the code panel first.'));
            } else if (!summary.childElementCount) {
                replace(
                    summary,
                    h('p', { className: 'dim' }, 'press run to execute the solution against your input. console output streams in below as it happens.'),
                );
            }
        };

        container.append(
            h(
                'div',
                { className: 'panel' },
                h(
                    'div',
                    { className: 'toolbar' },
                    h('span', { className: 'group' }, runButton, runPart),
                    h('span', { className: 'group' }, profileButton, iterations, h('span', { className: 'dim' }, 'iterations')),
                    h('span', { className: 'group' }, debugButton),
                    h(
                        'span',
                        { className: 'group' },
                        submitButton,
                        submitPart,
                        fake,
                        h('label', { htmlFor: 'runner-fake', title: 'record as correct without contacting adventofcode.com' }, 'fake'),
                    ),
                    h('span', { className: 'spacer' }),
                    status,
                    cancelButton,
                ),
                h('div', { className: 'body tight runner' }, summary, live.element),
            ),
        );

        const unsubscribes = [
            subscribe(render, ['running', 'lastRun', 'lastSubmit', 'lastError', 'detail']),
            subscribe(() => {
                live.clear();
                replace(summary);
                status.textContent = '';
            }, ['puzzle']),
            settings.onChange((next, changed) => {
                if (changed.includes('defaultPart')) runPart.value = submitPart.value = next.defaultPart;
                if (changed.includes('defaultIterations')) iterations.value = String(next.defaultIterations);
                if (changed.includes('defaultFake')) fake.checked = next.defaultFake;
            }),
        ];
        render();

        return { dispose: () => unsubscribes.forEach((fn) => fn()) };
    },
};
