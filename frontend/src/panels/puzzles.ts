/**
 * frontend/src/panels/puzzles.ts
 *
 * the year/day grid as a panel inside the editor view
 */

import { h } from '../dom.ts';
import { createPuzzleGrid } from '../grid.ts';
import { actions } from '../state.ts';
import type { PanelDefinition } from '../workspace.ts';

export const puzzlesPanel: PanelDefinition = {
    id: 'puzzles',
    title: 'Puzzles',
    create(container) {
        const grid = createPuzzleGrid((year, day) => actions.selectPuzzle({ year, day }));
        container.append(h('div', { className: 'panel' }, h('div', { className: 'body' }, grid.element)));
        return { dispose: () => grid.dispose() };
    },
};
