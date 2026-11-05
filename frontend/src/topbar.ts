/**
 * frontend/src/topbar.ts
 *
 * navigation, panel/layout menus, and status indicators
 */

import { aocUrl, clear, daysInYear, githubUrl, h, replace, stars } from './dom.ts';
import { actions, getState, subscribe } from './state.ts';
import type { Workspace } from './workspace.ts';

export interface TopbarOptions {
    getWorkspace: () => Workspace | null;
}

const FIRST_YEAR = 2015;

const closeMenus = () => document.querySelectorAll('.menu.open').forEach((menu) => menu.classList.remove('open'));

document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element) || !event.target.closest('.menu')) closeMenus();
});

const menu = (label: string, build: (dropdown: HTMLElement) => void): HTMLElement => {
    const dropdown = h('div', { className: 'dropdown' });
    const container = h(
        'div',
        { className: 'menu' },
        h('button', {
            className: 'link',
            onClick: (event: Event) => {
                event.stopPropagation();
                const open = container.classList.contains('open');
                closeMenus();
                if (!open) {
                    clear(dropdown);
                    build(dropdown);
                    container.classList.add('open');
                }
            },
        }, `${label} ▾`),
        dropdown,
    );
    return container;
};

const item = (label: string, onClick: () => void, options: { checked?: boolean; disabled?: boolean } = {}) =>
    h(
        'div',
        {
            className: `item${options.disabled ? ' disabled' : ''}`,
            onClick: (event: Event) => {
                event.stopPropagation();
                onClick();
            },
        },
        options.checked === undefined ? '  ' : options.checked ? '☑ ' : '☐ ',
        label,
    );

export const createTopbar = (root: HTMLElement, { getWorkspace }: TopbarOptions): void => {
    const yearSelect = h('select', { title: 'year' });
    const daySelect = h('select', { title: 'day' });
    const renderDays = (year: number) => {
        const count = getState().years.find((entry) => entry.year === year)?.days ?? daysInYear(year);
        if (daySelect.options.length === count) return;
        clear(daySelect);
        for (let day = 1; day <= count; day++) daySelect.append(h('option', { value: String(day) }, `day ${day}`));
    };
    renderDays(getState().puzzle.year);

    const title = h('span', { className: 'puzzle-title' });
    const status = h('span', { className: 'status' });

    const go = (year: number, day: number) => actions.selectPuzzle({ year, day });

    yearSelect.addEventListener('change', () => go(Number(yearSelect.value), Math.min(Number(daySelect.value), daysInYear(Number(yearSelect.value)))));
    daySelect.addEventListener('change', () => go(Number(yearSelect.value), Number(daySelect.value)));

    const step = (delta: number) => {
        const { year, day } = getState().puzzle;
        let nextDay = day + delta, nextYear = year;
        if (nextDay < 1) {
            nextYear--;
            nextDay = daysInYear(nextYear);
        }
        if (nextDay > daysInYear(year)) {
            nextYear++;
            nextDay = 1;
        }
        const years = getState().years.map((entry) => entry.year);
        const max = years.length ? Math.max(...years) : year;
        if (nextYear < FIRST_YEAR || nextYear > max) return;
        go(nextYear, nextDay);
    };

    const panelsMenu = menu('Panels', (dropdown) => {
        const workspace = getWorkspace();
        if (!workspace) return;
        for (const definition of workspace.panels) {
            dropdown.append(item(definition.title, () => {
                workspace.toggle(definition.id);
                closeMenus();
            }, { checked: workspace.isOpen(definition.id) }));
        }
    });

    const layoutMenu = menu('Layout', (dropdown) => {
        const workspace = getWorkspace();
        if (!workspace) return;
        dropdown.append(
            item('Reset to default', () => {
                workspace.reset();
                closeMenus();
            }),
            item(workspace.locked ? 'Unlock layout' : 'Lock layout', () => {
                workspace.setLocked(!workspace.locked);
                closeMenus();
            }, { checked: workspace.locked }),
            item('Save as preset…', () => {
                const name = prompt('preset name?');
                if (name) workspace.savePreset(name.trim());
                closeMenus();
            }),
        );

        const presets = workspace.presetNames();
        if (presets.length) {
            dropdown.append(h('div', { className: 'separator' }), h('div', { className: 'label' }, 'presets (shift-click to delete)'));
            for (const name of presets) {
                dropdown.append(h(
                    'div',
                    {
                        className: 'item',
                        onClick: (event: MouseEvent) => {
                            event.stopPropagation();
                            if (event.shiftKey) {
                                if (confirm(`delete preset '${name}'?`)) workspace.deletePreset(name);
                            } else {
                                workspace.loadPreset(name);
                            }
                            closeMenus();
                        },
                    },
                    '  ',
                    name,
                ));
            }
        }
    });

    replace(
        root,
        h(
            'a',
            { className: 'brand header', href: '#/', title: 'dashboard' },
            h('span', { className: 'deco' }, '-- '),
            "CodingAP's Advent of Code Hub",
            h('span', { className: 'deco' }, ' --'),
        ),
        h(
            'span',
            { className: 'views' },
            h('a', { className: 'bracket view-link view-link-dashboard', href: '#/' }, 'dashboard'),
            h('a', {
                className: 'bracket view-link view-link-editor',
                href: '#/editor',
            }, 'editor'),
        ),
        h(
            'span',
            { className: 'nav editor-only' },
            h('button', { className: 'link', title: 'previous day', onClick: () => step(-1) }, '<'),
            yearSelect,
            daySelect,
            h('button', {
                className: 'link',
                title: 'next day',
                onClick: () => step(1),
            }, '>'),
        ),
        title,
        status,
        h(
            'span',
            { className: 'editor-only menus' },
            panelsMenu,
            layoutMenu,
            h('button', { className: 'link', title: 'settings', onClick: () => getWorkspace()?.open('settings') }, '⚙'),
        ),
    );
    title.classList.add('editor-only');

    const renderYears = () => {
        const { years, puzzle } = getState();
        const list = years.length ? years.map((entry) => entry.year) : [puzzle.year];
        clear(yearSelect);
        for (const year of list) yearSelect.append(h('option', { value: String(year) }, String(year)));
        yearSelect.value = String(puzzle.year);
    };

    const renderPuzzle = () => {
        const { puzzle, detail, detailError } = getState();
        yearSelect.value = String(puzzle.year);
        renderDays(puzzle.year);
        daySelect.value = String(puzzle.day);

        const name = detail ? (detail.title ?? 'Not Available') : detailError ? 'error' : 'loading…';
        replace(
            title,
            h('a', { className: 'header', href: aocUrl(puzzle.year, puzzle.day), target: '_blank', rel: 'noopener' }, `Day ${puzzle.day} - ${name}`),
            ' ',
            stars(detail?.stars ?? 0),
            ' ',
            h('a', { className: 'dim bracket', href: githubUrl(puzzle.year, puzzle.day), target: '_blank', rel: 'noopener', title: 'source on github' }, 'gh'),
        );
    };

    const renderStatus = () => {
        const { dirty, running, lastError } = getState();
        replace(
            status,
            running ? h('span', { className: 'spinner', title: 'running' }) : null,
            dirty ? h('span', { className: 'dot', title: 'unsaved changes' }) : null,
            lastError
                ? h(
                    'button',
                    { className: 'link error', title: lastError, onClick: () => actions.clearError() },
                    `error: ${lastError.slice(0, 60)}${lastError.length > 60 ? '…' : ''}`,
                )
                : null,
        );
    };

    subscribe(renderYears, ['years']);
    subscribe(renderPuzzle, ['puzzle', 'detail', 'detailError']);
    subscribe(renderStatus, ['dirty', 'running', 'lastError']);
    renderYears();
    renderPuzzle();
    renderStatus();
};
