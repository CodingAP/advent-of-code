/**
 * frontend/src/panels/input.ts
 *
 * read only view of the puzzle input
 */

import { api } from '../api.ts';
import { h, replace } from '../dom.ts';
import { actions, getState, subscribe } from '../state.ts';
import type { PanelDefinition } from '../workspace.ts';

export const inputPanel: PanelDefinition = {
    id: 'input',
    title: 'Input',
    create(container) {
        const info = h('span', { className: 'dim' });
        const body = h('div', { className: 'body' });
        let text = '';
        let loadedFor = '';

        const copy = h('button', { className: 'link', onClick: () => navigator.clipboard.writeText(text) }, 'copy');
        const refresh = h('button', {
            className: 'link',
            title: 'download the input again',
            onClick: async () => {
                try {
                    await actions.fetchPuzzle(true);
                    loadedFor = '';
                    await load();
                } catch {
                    // error is shown in the top bar
                }
            },
        }, 're-download');

        container.append(h('div', { className: 'panel' }, h('div', { className: 'toolbar' }, copy, refresh, h('span', { className: 'spacer' }), info), body));

        const load = async () => {
            const { puzzle } = getState();
            const key = `${puzzle.year}/${puzzle.day}`;
            if (key === loadedFor) return;
            loadedFor = key;
            replace(body, h('div', { className: 'empty' }, 'loading…'));
            info.textContent = '';
            try {
                const input = await api.input(puzzle.year, puzzle.day);
                if (loadedFor !== key) return;
                if (input === null) {
                    text = '';
                    replace(body, h('div', { className: 'empty' }, 'no input.txt for this puzzle (fetch it from the code panel).'));
                    return;
                }
                text = input;
                const lines = input.replace(/\n$/, '').split('\n').length;
                info.textContent = `${lines} line${lines === 1 ? '' : 's'} · ${input.length} chars`;
                replace(body, h('pre', null, input));
            } catch (error) {
                loadedFor = '';
                replace(body, h('div', { className: 'empty error' }, error instanceof Error ? error.message : String(error)));
            }
        };

        const unsubscribes = [
            subscribe(load, ['puzzle']),
            subscribe(() => {
                // a fetch may have produced the input after the first load
                const { detail } = getState();
                if (detail?.hasInput && text === '') {
                    loadedFor = '';
                    load();
                }
            }, ['detail']),
        ];
        load();

        return { dispose: () => unsubscribes.forEach((fn) => fn()) };
    },
};
