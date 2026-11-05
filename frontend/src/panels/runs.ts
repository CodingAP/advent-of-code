/**
 * frontend/src/panels/runs.ts
 *
 * history of every run recorded for the active puzzle
 */

import { formatDate, formatMs, h, replace } from '../dom.ts';
import { getState, subscribe } from '../state.ts';
import type { PanelDefinition } from '../workspace.ts';

export const runsPanel: PanelDefinition = {
    id: 'runs',
    title: 'Runs',
    create(container) {
        const body = h('div', { className: 'body' });
        container.append(h('div', { className: 'panel' }, body));

        const render = () => {
            const { detail } = getState();
            if (!detail) return replace(body, h('div', { className: 'empty' }, 'loading…'));
            if (detail.runs.length === 0) return replace(body, h('div', { className: 'empty' }, 'no runs recorded yet.'));

            replace(
                body,
                h(
                    'table',
                    { className: 'results' },
                    h(
                        'thead',
                        null,
                        h(
                            'tr',
                            null,
                            h('th', null, 'when'),
                            h('th', null, 'part'),
                            h('th', null, 'answer'),
                            h('th', null, 'avg time'),
                            h('th', null, 'iters'),
                            h('th', null, 'status'),
                        ),
                    ),
                    h(
                        'tbody',
                        null,
                        detail.runs.map((run) =>
                            h(
                                'tr',
                                null,
                                h('td', { className: 'dim' }, formatDate(run.created)),
                                h('td', null, `part ${run.part}`),
                                h(
                                    'td',
                                    null,
                                    run.answer === null ? h('span', { className: 'dim' }, 'n/a') : h('span', { className: 'result-answer' }, run.answer),
                                ),
                                h('td', { className: 'num' }, formatMs(run.time_ms)),
                                h('td', { className: 'num' }, String(run.iterations)),
                                h(
                                    'td',
                                    { className: run.success ? 'ok' : 'error', title: run.error ?? '' },
                                    run.success ? '✓' : `✗ ${run.error ?? ''}`.slice(0, 80),
                                ),
                            )
                        ),
                    ),
                ),
            );
        };

        const unsubscribe = subscribe(render, ['detail']);
        render();
        return { dispose: unsubscribe };
    },
};
