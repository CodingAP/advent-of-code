/**
 * frontend/src/grid.ts
 *
 * the year selector + 5x5 day grid from the original hub, shared by the dashboard and the puzzles panel
 */

import { api } from './api.ts';
import { aocUrl, clear, daysInYear, githubUrl, h, replace, stars } from './dom.ts';
import { getState, subscribe } from './state.ts';
import type { DaySummary } from './types.ts';

export interface PuzzleGrid {
    element: HTMLElement;
    show(year: number, force?: boolean): Promise<void>;
    /** reloads the year currently shown */
    refresh(): Promise<void>;
    dispose(): void;
}

export const createPuzzleGrid = (onSelect: (year: number, day: number) => void, initialYear = getState().puzzle.year): PuzzleGrid => {
    let shownYear = initialYear;
    const cache = new Map<number, DaySummary[]>();

    const yearRow = h('p', { className: 'year-selector-row' });
    const starCount = h('p', { className: 'star-count' });
    const grid = h('div', { className: 'day-grid' });
    const element = h('div', { className: 'puzzle-grid' }, yearRow, starCount, grid);

    const renderYears = () => {
        const years = getState().years;
        clear(yearRow);
        years.forEach((entry, index) => {
            if (index > 0) yearRow.append(' · ');
            yearRow.append(
                h('a', { className: `bracket year-selector${entry.year === shownYear ? ' current' : ''}`, onClick: () => show(entry.year) }, `${entry.year}`),
            );
        });
        const entry = years.find((item) => item.year === shownYear);
        replace(starCount, 'Stars: ', h('span', { className: 'claimed-stars' }, `${entry?.stars ?? 0}/${(entry?.days ?? daysInYear(shownYear)) * 2}`));
    };

    const renderGrid = (days: DaySummary[]) => {
        const active = getState().puzzle;
        clear(grid);
        grid.classList.toggle('days-12', days.length <= 12);
        for (const day of days) {
            const available = day.title !== null;
            const isActive = active.year === shownYear && active.day === day.day;
            const stop = (event: Event) => event.stopPropagation();
            grid.append(h(
                'div',
                { className: `day${isActive ? ' active' : ''}`, onClick: () => onSelect(shownYear, day.day) },
                h('a', {
                    className: `header title${available ? '' : ' disabled'}`,
                    href: aocUrl(shownYear, day.day),
                    target: '_blank',
                    rel: 'noopener',
                    onClick: stop,
                }, `Day ${day.day} - ${available ? day.title : 'Not Available'}`),
                stars(day.stars),
                h('br'),
                h('a', {
                    className: `bracket${day.hasSolution ? '' : ' disabled'}`,
                    href: githubUrl(shownYear, day.day),
                    target: '_blank',
                    rel: 'noopener',
                    onClick: stop,
                }, 'Source Code'),
                h(
                    'div',
                    { className: 'day-files dim' },
                    h('span', { title: day.hasInput ? 'input.txt downloaded' : 'no input.txt yet' }, day.hasInput ? 'input ✓' : 'input ·'),
                    ' ',
                    h('span', { title: day.hasDescription ? 'puzzle text downloaded' : 'no puzzle text yet' }, day.hasDescription ? 'text ✓' : 'text ·'),
                ),
            ));
        }
    };

    const show = async (year: number, force = false) => {
        shownYear = year;
        renderYears();
        if (!force && cache.has(year)) {
            renderGrid(cache.get(year)!);
            return;
        }
        if (!cache.has(year)) replace(grid, h('div', { className: 'empty' }, 'loading…'));
        try {
            const days = await api.year(year);
            cache.set(year, days);
            if (shownYear === year) renderGrid(days);
        } catch (error) {
            replace(grid, h('div', { className: 'empty error' }, error instanceof Error ? error.message : String(error)));
        }
    };

    const unsubscribes = [
        subscribe(renderYears, ['years']),
        // a detail refresh means something may have changed (fetch, stars) so reload that year
        subscribe(() => {
            const { puzzle } = getState();
            if (puzzle.year === shownYear) show(puzzle.year, true);
            else cache.delete(puzzle.year);
        }, ['detail']),
        subscribe(() => show(getState().puzzle.year), ['puzzle']),
    ];

    show(shownYear);

    return { element, show, refresh: () => show(shownYear, true), dispose: () => unsubscribes.forEach((fn) => fn()) };
};
