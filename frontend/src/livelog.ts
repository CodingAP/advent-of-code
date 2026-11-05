/**
 * frontend/src/livelog.ts
 *
 * a console pane that appends lines as they stream in, keeps the last few thousand, and follows the bottom
 */

import { h } from './dom.ts';

const MAX_LINES = 2000;

export interface LiveLog {
    element: HTMLElement;
    append(line: string): void;
    clear(): void;
    readonly lines: number;
}

export const createLiveLog = (): LiveLog => {
    const pre = h('pre', { className: 'live-log' });
    const wrapper = h('div', { className: 'live-log-wrapper' }, pre);
    let lines = 0;
    let follow = true;

    wrapper.addEventListener('scroll', () => {
        follow = wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight - 8;
    });

    return {
        element: wrapper,
        get lines() {
            return lines;
        },
        append(line) {
            lines++;
            pre.append(document.createTextNode((pre.childNodes.length ? '\n' : '') + line));
            while (pre.childNodes.length > MAX_LINES) pre.removeChild(pre.firstChild!);
            if (follow) wrapper.scrollTop = wrapper.scrollHeight;
        },
        clear() {
            pre.replaceChildren();
            lines = 0;
            follow = true;
        },
    };
};

/** the url to paste into chrome's address bar to debug the current run */
export const devtoolsUrl = (token: string, apiBase = ''): string => {
    const base = apiBase ? new URL(apiBase) : location;
    const secure = base.protocol === 'https:';
    return `devtools://devtools/bundled/js_app.html?${secure ? 'wss' : 'ws'}=${base.host}/api/debug/ws/${token}`;
};
