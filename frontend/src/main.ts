/**
 * frontend/src/main.ts
 *
 * boots the app: settings, workspace, top bar, and url hash syncing
 */

import { onUnauthorized } from './api.ts';
import { currentAocYear, h } from './dom.ts';
import { createDashboard } from './dashboard.ts';
import { aocPanel } from './panels/aoc.ts';
import { codePanel } from './panels/code.ts';
import { inputPanel } from './panels/input.ts';
import { puzzlesPanel } from './panels/puzzles.ts';
import { readmePanel } from './panels/readme.ts';
import { runnerPanel } from './panels/runner.ts';
import { runsPanel } from './panels/runs.ts';
import { settingsPanel } from './panels/settings.ts';
import { submissionsPanel } from './panels/submissions.ts';
import { testsPanel } from './panels/tests.ts';
import { settings } from './settings.ts';
import { actions, getState, subscribe } from './state.ts';
import { applyTheme } from './themes.ts';
import { createTopbar } from './topbar.ts';
import type { PuzzleRef } from './types.ts';
import { Workspace } from './workspace.ts';

const FIRST_YEAR = 2015;

const parseHash = (): PuzzleRef | null => {
    const match = location.hash.match(/^#\/(\d{4})\/(\d{1,2})$/);
    if (!match) return null;
    const year = Number(match[1]), day = Number(match[2]);
    if (year < FIRST_YEAR || day < 1 || day > 25) return null;
    return { year, day };
};

const PARTICLE_GLYPHS: Record<string, string[]> = {
    aoc: ['*'],
    light: ['*', '❄'],
    nord: ['❄', '*'],
    dracula: ['*'],
    hacker: ['0', '1', '0', '1', 'ｱ', 'ｶ', 'ﾊ', 'ﾏ', 'ﾔ', 'ﾗ', '7', '3'],
    synthwave: ['✦', '✧', '·'],
    aero: [''], // bubbles are drawn with css
};

/**
 * the falling snow from the old site, now an overlay the themes restyle (bubbles rise in aero, glyphs rain in hacker)
 */
const renderSnowflakes = () => {
    const container = document.querySelector<HTMLElement>('#snowflakes');
    if (!container) return;
    const { snowflakes, theme } = settings.get();
    container.classList.toggle('hidden', !snowflakes);
    if (!snowflakes) return;
    if (container.dataset.theme === theme && container.childElementCount) return;
    container.dataset.theme = theme;
    container.replaceChildren();
    const glyphs = PARTICLE_GLYPHS[theme] ?? ['*'];
    const count = theme === 'aero' ? 28 : theme === 'hacker' ? 90 : 120;
    for (let i = 0; i < count; i++) {
        container.append(h('div', {
            className: `snowflake snowflake-${Math.floor(Math.random() * 4)}`,
            style: `left: ${Math.random() * 100}vw; animation-delay: ${Math.random() * -30}s; --size: ${0.5 + Math.random() * 1.2}`,
        }, glyphs[Math.floor(Math.random() * glyphs.length)]));
    }
};

type View = 'dashboard' | 'editor';

const parseRoute = (): { view: View; puzzle: PuzzleRef | null } => {
    const puzzle = parseHash();
    if (puzzle) return { view: 'editor', puzzle };
    if (location.hash === '#/editor') return { view: 'editor', puzzle: null };
    return { view: 'dashboard', puzzle: null };
};

const boot = async () => {
    const workspaceRoot = document.querySelector<HTMLElement>('#workspace')!;
    applyTheme(settings.get().theme);
    renderSnowflakes();
    settings.onChange((next, changed) => {
        if (changed.includes('theme')) workspace?.setDark(applyTheme(next.theme).dark);
        if (changed.includes('snowflakes') || changed.includes('theme')) renderSnowflakes();
    });

    const dashboardRoot = document.querySelector<HTMLElement>('#dashboard')!;
    const topbarRoot = document.querySelector<HTMLElement>('#topbar')!;

    let workspace: Workspace | null = null;
    let view: View | null = null;

    // the dockable editor needs room; phones get the dashboard and a pointer to a bigger screen
    const smallScreen = matchMedia('(max-width: 820px)');
    const notice = h(
        'div',
        { className: 'view mobile-notice hidden' },
        h('p', { className: 'header' }, 'the editor is built for a desktop or laptop screen'),
        h(
            'p',
            null,
            'the dashboard works here: browse the puzzles, check stars, and download inputs. open the editor on a bigger screen to edit and run code.',
        ),
        h(
            'p',
            null,
            h('a', { className: 'bracket', href: '#/' }, 'back to the dashboard'),
            ' ',
            h('button', {
                className: 'link',
                onClick: () => {
                    sessionStorage.setItem('aoc.editorAnyway', '1');
                    applyRoute();
                },
            }, 'open the editor anyway'),
        ),
    );
    workspaceRoot.before(notice);
    const editorBlocked = () => smallScreen.matches && !sessionStorage.getItem('aoc.editorAnyway');

    // the dock needs a visible container to measure, so it is created the first time the editor is shown
    const ensureWorkspace = () => {
        workspace ??= new Workspace(
            workspaceRoot,
            [aocPanel, puzzlesPanel, inputPanel, codePanel, runnerPanel, testsPanel, runsPanel, submissionsPanel, readmePanel, settingsPanel],
            [
                { id: 'aoc' },
                { id: 'puzzles', position: { referencePanel: 'aoc', direction: 'within' } },
                { id: 'input', position: { referencePanel: 'aoc', direction: 'within' } },
                { id: 'code', position: { referencePanel: 'aoc', direction: 'right' }, initialWidth: Math.round(workspaceRoot.clientWidth * 0.6) },
                { id: 'runner', position: { referencePanel: 'code', direction: 'below' }, initialHeight: Math.round(workspaceRoot.clientHeight * 0.35) },
                { id: 'tests', position: { referencePanel: 'runner', direction: 'within' } },
                { id: 'runs', position: { referencePanel: 'runner', direction: 'within' } },
                { id: 'submissions', position: { referencePanel: 'runner', direction: 'within' } },
                { id: 'readme', position: { referencePanel: 'runner', direction: 'within' } },
            ],
        );
        return workspace;
    };

    const dashboard = createDashboard(dashboardRoot, (year, day) => {
        location.hash = `#/${year}/${day}`;
    });

    createTopbar(topbarRoot, { getWorkspace: () => workspace });

    const showView = (next: View) => {
        const blocked = next === 'editor' && editorBlocked();
        if (view === next && notice.classList.contains('hidden') === !blocked) return;
        view = next;
        document.body.classList.toggle('view-dashboard', next === 'dashboard');
        document.body.classList.toggle('view-editor', next === 'editor');
        document.body.classList.toggle('view-notice', blocked);
        dashboardRoot.classList.toggle('hidden', next !== 'dashboard');
        notice.classList.toggle('hidden', !blocked);
        workspaceRoot.classList.toggle('hidden', next !== 'editor' || blocked);
        if (next === 'editor' && !blocked) ensureWorkspace();
        if (next === 'dashboard') dashboard.refresh();
    };

    const applyRoute = async () => {
        const route = parseRoute();
        if (route.view === 'dashboard') {
            showView('dashboard');
            return;
        }
        const target = route.puzzle ?? settings.get().lastPuzzle ?? { year: currentAocYear(), day: 1 };
        const first = view !== 'editor';
        showView('editor');
        if (editorBlocked()) return;
        await actions.selectPuzzle(target, { force: first && !getState().detail });
    };

    onUnauthorized(() => {
        if (view === 'editor') workspace?.open('settings');
    });

    // keep the hash and the active puzzle in sync both ways while in the editor
    subscribe(() => {
        if (view !== 'editor') return;
        const { year, day } = getState().puzzle;
        const hash = `#/${year}/${day}`;
        if (location.hash !== hash) history.replaceState(null, '', hash);
    }, ['puzzle']);

    globalThis.addEventListener('hashchange', () => applyRoute());
    smallScreen.addEventListener('change', () => applyRoute());

    globalThis.addEventListener('beforeunload', (event) => {
        if (getState().dirty) event.preventDefault();
    });

    await Promise.all([actions.loadYears(), applyRoute()]);
};

boot().catch((error) => {
    console.error(error);
    document.body.prepend(h('div', { className: 'error', style: 'padding: 20px' }, `failed to start: ${error instanceof Error ? error.message : error}`));
});
