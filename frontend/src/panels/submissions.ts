/**
 * frontend/src/panels/submissions.ts
 *
 * every answer ever submitted for the active puzzle
 */

import { formatDate, h, replace } from '../dom.ts';
import { getState, subscribe } from '../state.ts';
import type { PanelDefinition } from '../workspace.ts';

export const submissionsPanel: PanelDefinition = {
    id: 'submissions',
    title: 'Submissions',
    create(container) {
        const body = h('div', { className: 'body' });
        container.append(h('div', { className: 'panel' }, body));

        const render = () => {
            const { detail } = getState();
            if (!detail) return replace(body, h('div', { className: 'empty' }, 'loading…'));
            if (detail.answers.length === 0) return replace(body, h('div', { className: 'empty' }, 'nothing submitted yet.'));

            replace(
                body,
                h(
                    'table',
                    { className: 'results' },
                    h('thead', null, h('tr', null, h('th', null, 'when'), h('th', null, 'part'), h('th', null, 'answer'), h('th', null, 'result'))),
                    h(
                        'tbody',
                        null,
                        detail.answers.map((answer) =>
                            h(
                                'tr',
                                null,
                                h('td', { className: 'dim' }, formatDate(answer.created)),
                                h('td', null, `part ${answer.part}`),
                                h('td', null, h('span', { className: 'result-answer' }, answer.answer)),
                                h('td', { className: answer.result === 1 ? 'ok' : 'error' }, answer.result === 1 ? '✓ correct' : '✗ incorrect'),
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
