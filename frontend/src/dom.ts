/**
 * frontend/src/dom.ts
 *
 * tiny helpers for building dom nodes without a framework
 */

export type Child = Node | string | number | null | undefined | false | Child[];

type Props = Record<string, unknown> | null;

const append = (parent: Node, child: Child) => {
    if (child === null || child === undefined || child === false) return;
    if (Array.isArray(child)) {
        for (const nested of child) append(parent, nested);
        return;
    }
    parent.appendChild(child instanceof Node ? child : document.createTextNode(String(child)));
};

/**
 * creates an element: h('a', { href, className, onClick }, 'text', otherNode)
 */
export const h = <K extends keyof HTMLElementTagNameMap>(tag: K, props: Props = null, ...children: Child[]): HTMLElementTagNameMap[K] => {
    const element = document.createElement(tag);

    if (props) {
        for (const [key, value] of Object.entries(props)) {
            if (value === undefined || value === null || value === false) continue;
            if (key === 'className') {
                element.className = String(value);
            } else if (key === 'style' && typeof value === 'string') {
                element.setAttribute('style', value);
            } else if (key.startsWith('on') && typeof value === 'function') {
                element.addEventListener(key.slice(2).toLowerCase(), value as EventListener);
            } else if (key === 'dataset' && typeof value === 'object') {
                Object.assign(element.dataset, value);
            } else if (key in element && key !== 'list') {
                // deno-lint-ignore no-explicit-any
                (element as any)[key] = value;
            } else {
                element.setAttribute(key, String(value));
            }
        }
    }

    for (const child of children) append(element, child);
    return element;
};

export const clear = (element: Element) => {
    while (element.firstChild) element.removeChild(element.firstChild);
};

export const replace = (element: Element, ...children: Child[]) => {
    clear(element);
    for (const child of children) append(element, child);
};

export const pad = (day: number) => String(day).padStart(2, '0');

export const formatDate = (iso: string) => {
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? iso : date.toLocaleString();
};

export const formatMs = (ms: number | null | undefined) => (ms === null || ms === undefined ? 'n/a' : `${ms.toFixed(2)} ms`);

export const stars = (count: number) =>
    h(
        'span',
        null,
        h('span', { className: 'claimed-stars' }, '*'.repeat(count)),
        h('span', { className: 'unclaimed-stars' }, '*'.repeat(Math.max(0, 2 - count))),
    );

/** the latest advent of code year that has puzzles (december of the current year, otherwise last year) */
export const currentAocYear = (now = new Date()) => now.getFullYear() - (now.getMonth() + 1 === 12 ? 0 : 1);

/** advent of code shrank to twelve days from 2025 onward */
export const daysInYear = (year: number) => (year >= 2025 ? 12 : 25);

export const aocUrl = (year: number, day: number) => `https://adventofcode.com/${year}/day/${day}`;
export const githubUrl = (year: number, day: number) => `https://github.com/CodingAP/advent-of-code/tree/main/puzzles/${year}/day${pad(day)}`;
