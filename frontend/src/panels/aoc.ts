/**
 * frontend/src/panels/aoc.ts
 *
 * the puzzle: by default the text scraped into puzzle.md (fast, offline, part two once fetched after solving part one),
 * or the live adventofcode.com page in an iframe (uses your own browser login)
 */

import { api } from '../api.ts';
import { aocUrl, formatDate, h, replace } from '../dom.ts';
import { renderMarkdown } from '../markdown.ts';
import { settings } from '../settings.ts';
import { actions, getState, subscribe } from '../state.ts';
import type { PanelDefinition } from '../workspace.ts';

export const aocPanel: PanelDefinition = {
    id: 'aoc',
    title: 'AoC',
    create(container) {
        let mode = settings.get().aocPanelMode;
        let loadedFor = '';
        let busy = false;

        const info = h('span', { className: 'dim' });
        const link = h('a', { className: 'bracket', target: '_blank', rel: 'noopener' }, 'open on aoc');
        const text = h('div', { className: 'body description' });
        const frame = h('iframe', { className: 'fill', title: 'advent of code puzzle', referrerPolicy: 'no-referrer' });
        const body = h('div', { className: 'body tight', style: 'display: flex; flex-direction: column' });

        const textButton = h('button', { className: 'link', title: 'puzzle text stored locally', onClick: () => setMode('text') }, 'text');
        const siteButton = h('button', { className: 'link', title: 'the live adventofcode.com page', onClick: () => setMode('website') }, 'website');
        const refreshButton = h('button', {
            className: 'link',
            title: 'download the puzzle text again (picks up part two once part one is solved)',
            onClick: () => fetchText(),
        }, 'refresh');
        const reloadButton = h('button', { className: 'link', onClick: () => frame.contentWindow?.location.reload() }, 'reload');

        const setInfo = (value: string, className = 'dim') => {
            info.textContent = value;
            info.className = `${className}${/^https?:/.test(value) ? ' path' : ''}`;
        };

        const renderText = (markdown: string, parts: number, fetchedAt: string | null) => {
            text.innerHTML = renderMarkdown(markdown);
            setInfo(`${parts === 2 ? 'both parts' : 'part one'}${fetchedAt ? ` · fetched ${formatDate(fetchedAt)}` : ''}`);
        };

        const fetchText = async () => {
            if (busy) return;
            busy = true;
            const { year, day } = getState().puzzle;
            setInfo('fetching…');
            try {
                const description = await api.refreshDescription(year, day);
                if (`${year}/${day}` === `${getState().puzzle.year}/${getState().puzzle.day}`) {
                    renderText(description.markdown, description.parts, description.fetchedAt);
                }
                await actions.refreshDetail();
            } catch (error) {
                setInfo(error instanceof Error ? error.message : String(error), 'error');
            } finally {
                busy = false;
            }
        };

        const loadText = async () => {
            const { year, day } = getState().puzzle;
            const key = `${year}/${day}`;
            if (key === loadedFor) return;
            loadedFor = key;
            replace(text, h('div', { className: 'empty' }, 'loading…'));
            setInfo('');
            try {
                const description = await api.description(year, day);
                if (loadedFor !== key) return;
                if (!description) {
                    setInfo('not fetched yet');
                    replace(
                        text,
                        h(
                            'div',
                            { className: 'empty' },
                            h('p', null, 'the puzzle text has not been downloaded for this day.'),
                            h('button', { className: 'link', onClick: () => fetchText() }, 'fetch puzzle text'),
                            ' ',
                            h('button', { className: 'link', onClick: () => setMode('website') }, 'show the website instead'),
                        ),
                    );
                    return;
                }
                renderText(description.markdown, description.parts, description.fetchedAt);
            } catch (error) {
                loadedFor = '';
                replace(text, h('div', { className: 'empty error' }, error instanceof Error ? error.message : String(error)));
            }
        };

        const render = () => {
            const { year, day } = getState().puzzle;
            const url = aocUrl(year, day);
            link.href = url;
            textButton.classList.toggle('current', mode === 'text');
            siteButton.classList.toggle('current', mode === 'website');
            refreshButton.style.display = mode === 'text' ? '' : 'none';
            reloadButton.style.display = mode === 'website' ? '' : 'none';
            if (mode === 'website') {
                if (frame.src !== url) frame.src = url;
                setInfo(url);
                replace(body, frame);
            } else {
                replace(body, text);
                loadText();
            }
        };

        const setMode = (next: 'text' | 'website') => {
            mode = next;
            settings.set({ aocPanelMode: next });
            render();
        };

        container.append(
            h(
                'div',
                { className: 'panel' },
                h(
                    'div',
                    { className: 'toolbar' },
                    h('span', { className: 'group' }, textButton, siteButton),
                    refreshButton,
                    reloadButton,
                    link,
                    h('span', { className: 'spacer' }),
                    info,
                ),
                body,
            ),
        );

        const unsubscribes = [
            subscribe(render, ['puzzle']),
            subscribe(() => {
                // a fetch/scaffold may have produced the file after the first load
                const { detail } = getState();
                if (mode === 'text' && detail?.hasDescription && text.querySelector('.empty')) {
                    loadedFor = '';
                    loadText();
                }
            }, ['detail']),
        ];
        render();

        return { dispose: () => unsubscribes.forEach((fn) => fn()) };
    },
};
