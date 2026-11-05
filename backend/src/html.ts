/**
 * backend/src/html.ts
 *
 * a deliberately small html parser: enough to walk the well formed markup adventofcode.com serves
 * without pulling in a dom library
 *
 * by alex prosser
 */

export interface TextNode {
    type: 'text';
    text: string;
}

export interface ElementNode {
    type: 'element';
    tag: string; // lower case
    attributes: Record<string, string>;
    children: HtmlNode[];
}

export type HtmlNode = TextNode | ElementNode;

const VOID_TAGS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const RAW_TEXT_TAGS = new Set(['script', 'style']);

const NAMED_ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

export const decodeEntities = (text: string): string =>
    text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
        if (entity[0] === '#') {
            const code = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
            return Number.isFinite(code) ? String.fromCodePoint(code) : match;
        }
        return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
    });

const parseAttributes = (source: string): Record<string, string> => {
    const attributes: Record<string, string> = {};
    const pattern = /([^\s=/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
    for (const match of source.matchAll(pattern)) {
        attributes[match[1].toLowerCase()] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? '');
    }
    return attributes;
};

/**
 * parses html into a tree; unknown or stray closing tags are ignored rather than thrown on
 */
export const parseHtml = (html: string): ElementNode => {
    const root: ElementNode = { type: 'element', tag: '#root', attributes: {}, children: [] };
    const stack: ElementNode[] = [root];
    const top = () => stack[stack.length - 1];

    let index = 0;
    while (index < html.length) {
        const open = html.indexOf('<', index);
        if (open === -1) {
            top().children.push({ type: 'text', text: decodeEntities(html.slice(index)) });
            break;
        }
        if (open > index) top().children.push({ type: 'text', text: decodeEntities(html.slice(index, open)) });

        if (html.startsWith('<!--', open)) {
            const end = html.indexOf('-->', open + 4);
            index = end === -1 ? html.length : end + 3;
            continue;
        }
        if (html.startsWith('<!', open) || html.startsWith('<?', open)) {
            const end = html.indexOf('>', open);
            index = end === -1 ? html.length : end + 1;
            continue;
        }

        const close = html.indexOf('>', open);
        if (close === -1) break;
        const raw = html.slice(open + 1, close).trim();
        index = close + 1;

        if (raw.startsWith('/')) {
            const tag = raw.slice(1).trim().toLowerCase();
            for (let depth = stack.length - 1; depth > 0; depth--) {
                if (stack[depth].tag === tag) {
                    stack.length = depth;
                    break;
                }
            }
            continue;
        }

        const selfClosing = raw.endsWith('/');
        const body = selfClosing ? raw.slice(0, -1) : raw;
        const space = body.search(/\s/);
        const tag = (space === -1 ? body : body.slice(0, space)).toLowerCase();
        const element: ElementNode = { type: 'element', tag, attributes: space === -1 ? {} : parseAttributes(body.slice(space)), children: [] };
        top().children.push(element);

        if (RAW_TEXT_TAGS.has(tag)) {
            const end = html.indexOf(`</${tag}`, index);
            const stop = end === -1 ? html.length : end;
            element.children.push({ type: 'text', text: html.slice(index, stop) });
            const closeEnd = html.indexOf('>', stop);
            index = closeEnd === -1 ? html.length : closeEnd + 1;
            continue;
        }

        if (!selfClosing && !VOID_TAGS.has(tag)) stack.push(element);
    }

    return root;
};

export const textOf = (node: HtmlNode): string => (node.type === 'text' ? node.text : node.children.map(textOf).join(''));

export const elementChildren = (node: ElementNode): ElementNode[] => node.children.filter((child): child is ElementNode => child.type === 'element');

/**
 * depth first search for the first element matching the predicate
 */
export const findElement = (node: HtmlNode, predicate: (element: ElementNode) => boolean): ElementNode | null => {
    if (node.type !== 'element') return null;
    if (node.tag !== '#root' && predicate(node)) return node;
    for (const child of node.children) {
        const found = findElement(child, predicate);
        if (found) return found;
    }
    return null;
};
