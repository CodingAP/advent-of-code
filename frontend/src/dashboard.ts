/**
 * frontend/src/dashboard.ts
 *
 * the full page hub: totals, the puzzle grid, and bulk download tools
 */

import { api } from './api.ts';
import { currentAocYear, h, replace } from './dom.ts';
import { createPuzzleGrid } from './grid.ts';
import { settings } from './settings.ts';
import { getState, subscribe } from './state.ts';
import type { BulkStatus } from './types.ts';

export const createDashboard = (root: HTMLElement, openEditor: (year: number, day: number) => void): { refresh(): void } => {
    const totals = h('p', { className: 'text-center totals' });
    const grid = createPuzzleGrid(openEditor, settings.get().lastPuzzle?.year ?? currentAocYear());

    // bulk download tool
    const onlyMissing = h('input', { type: 'checkbox', checked: true, id: 'bulk-missing' });
    const inputs = h('input', { type: 'checkbox', checked: true, id: 'bulk-inputs' });
    const descriptions = h('input', { type: 'checkbox', checked: true, id: 'bulk-descriptions' });
    const startButton = h('button', { className: 'link', onClick: () => start() }, 'download all inputs');
    const progress = h('div', { className: 'bulk-progress dim' });
    let poll: number | undefined;

    const renderProgress = (status: BulkStatus) => {
        startButton.disabled = status.running;
        const summary = status.total ? `${status.done}/${status.total}` : '';
        const errors = status.errors.length
            ? h(
                'details',
                null,
                h('summary', { className: 'error' }, `${status.errors.length} error${status.errors.length === 1 ? '' : 's'}`),
                h('pre', null, status.errors.join('\n')),
            )
            : null;
        if (status.running) {
            replace(progress, h('span', { className: 'spinner' }), ` downloading ${summary}${status.current ? ` · ${status.current}` : ''}`, errors);
        } else if (status.finishedAt) {
            replace(
                progress,
                h('span', { className: 'ok' }, '✓ '),
                `finished ${summary}: ${status.downloaded} downloaded, ${status.skipped} already present`,
                errors,
            );
        } else {
            replace(progress, 'downloads input.txt (and puzzle.md) for every released puzzle; nothing is committed to git.');
        }
    };

    const refreshStatus = async () => {
        try {
            const status = await api.bulkStatus();
            renderProgress(status);
            if (!status.running) {
                clearInterval(poll);
                poll = undefined;
                if (status.finishedAt) grid.refresh();
            }
        } catch (error) {
            replace(progress, h('span', { className: 'error' }, error instanceof Error ? error.message : String(error)));
            clearInterval(poll);
            poll = undefined;
        }
    };

    const start = async () => {
        startButton.disabled = true;
        try {
            renderProgress(await api.bulkStart({ onlyMissing: onlyMissing.checked, inputs: inputs.checked, descriptions: descriptions.checked }));
            poll = setInterval(refreshStatus, 1000);
        } catch (error) {
            replace(progress, h('span', { className: 'error' }, error instanceof Error ? error.message : String(error)));
            startButton.disabled = false;
        }
    };

    const renderTotals = () => {
        const { years } = getState();
        const earned = years.reduce((sum, entry) => sum + entry.stars, 0);
        const last = settings.get().lastPuzzle;
        replace(
            totals,
            'Total: ',
            h('span', { className: 'claimed-stars' }, `${earned}/${years.reduce((sum, entry) => sum + entry.days * 2, 0)}`),
            ' stars · ',
            h(
                'a',
                { className: 'bracket', href: last ? `#/${last.year}/${last.day}` : '#/editor' },
                last ? `open editor: ${last.year} day ${last.day}` : 'open editor',
            ),
        );
    };

    replace(
        root,
        h(
            'div',
            { className: 'dashboard' },
            h(
                'p',
                { className: 'header text-center dashboard-title' },
                h('span', { className: 'deco' }, '-- '),
                "CodingAP's Advent of Code Hub",
                h('span', { className: 'deco' }, ' --'),
            ),
            totals,
            grid.element,
            h(
                'div',
                { className: 'tools' },
                h('p', { className: 'header' }, 'tools'),
                h(
                    'div',
                    { className: 'toolbar' },
                    startButton,
                    h('label', { htmlFor: 'bulk-missing' }, onlyMissing, ' only missing'),
                    h('label', { htmlFor: 'bulk-inputs' }, inputs, ' inputs'),
                    h('label', { htmlFor: 'bulk-descriptions' }, descriptions, ' puzzle text'),
                ),
                progress,
            ),
        ),
    );

    subscribe(renderTotals, ['years', 'puzzle']);
    settings.onChange((_next, changed) => changed.includes('lastPuzzle') && renderTotals());
    renderTotals();
    refreshStatus();

    return {
        refresh: () => {
            grid.refresh();
            if (!poll) refreshStatus();
        },
    };
};
