/**
 * backend/src/description.ts
 *
 * scrapes the puzzle text from adventofcode.com and stores it as markdown next to the solution.
 * the file is gitignored: advent of code asks that puzzle text is not redistributed.
 *
 * by alex prosser
 */

import { fetchPuzzlePage } from './aoc-client.ts';
import { ensureDir } from './fs.ts';
import { elementChildren, type ElementNode, findElement, type HtmlNode, parseHtml, textOf } from './html.ts';
import { getPuzzlePaths } from './puzzles.ts';

export interface PuzzleDescription {
    markdown: string;
    parts: number; // 1 or 2 (part two only appears once part one is solved on the site)
    fetchedAt: string | null;
}

const BASE = 'https://adventofcode.com';

const collapse = (text: string) => text.replace(/\s+/g, ' ');

/** containers whose whitespace-only text children are just formatting */
const BLOCK_TAGS = new Set(['#root', 'html', 'body', 'main', 'article', 'section', 'div']);

/**
 * converts a node from the puzzle page to markdown
 */
const toMarkdown = (node: HtmlNode, inPre = false): string => {
    if (node.type === 'text') return inPre ? node.text : collapse(node.text);

    const isBlock = BLOCK_TAGS.has(node.tag);
    const children = (pre = inPre) =>
        node.children
            .filter((child) => !(isBlock && child.type === 'text' && child.text.trim() === ''))
            .map((child) => toMarkdown(child, pre))
            .join('');

    // inside a code block every element (em, span, a…) is just text; markdown has no markup there
    if (inPre && node.tag !== 'pre') return children(true);

    switch (node.tag) {
        case 'h2':
            return `## ${children().trim()}\n\n`;
        case 'p':
            return `${children().trim()}\n\n`;
        case 'pre':
            return `\`\`\`\n${children(true).replace(/\n$/, '')}\n\`\`\`\n\n`;
        case 'code': {
            if (inPre) return children(true);
            const text = children();
            return text.includes('`') ? `\`\` ${text} \`\`` : `\`${text}\``;
        }
        case 'em':
            return node.attributes.class === 'star' ? `**${children()}**` : `*${children()}*`;
        case 'strong':
        case 'b':
            return `**${children()}**`;
        case 'a': {
            const href = node.attributes.href ?? '';
            const url = href.startsWith('http') ? href : `${BASE}${href.startsWith('/') ? '' : '/'}${href}`;
            return `[${children()}](${url})`;
        }
        case 'ul':
        case 'ol':
            return elementChildren(node)
                .filter((child) => child.tag === 'li')
                .map((child, index) => `${node.tag === 'ol' ? `${index + 1}.` : '-'} ${toMarkdown(child).trim()}\n`)
                .join('') + '\n';
        case 'span': {
            const title = node.attributes.title;
            return title ? `${children()} (${collapse(title)})` : children();
        }
        case 'br':
            return '\n';
        case 'form':
        case 'script':
        case 'style':
            return '';
        default:
            return children();
    }
};

/**
 * turns the puzzle page html into markdown: every description article plus the "your puzzle answer was" lines between them
 */
export const puzzlePageToMarkdown = (html: string): { markdown: string; parts: number } => {
    const root = parseHtml(html);
    const main = findElement(root, (element) => element.tag === 'main') ?? findElement(root, (element) => element.tag === 'body') ?? root;

    let markdown = '';
    let parts = 0;
    for (const child of elementChildren(main as ElementNode)) {
        if (child.tag === 'article' && (child.attributes.class ?? '').includes('day-desc')) {
            parts++;
            markdown += toMarkdown(child);
        } else if (child.tag === 'p' && textOf(child).includes('Your puzzle answer was')) {
            markdown += toMarkdown(child);
        }
    }

    return { markdown: markdown.trim() + '\n', parts };
};

const header = (year: number, day: number, parts: number) =>
    `<!-- fetched ${new Date().toISOString()} from ${BASE}/${year}/day/${day} (${parts} part${parts === 1 ? '' : 's'}) -->\n\n`;

const parseDescription = (content: string): PuzzleDescription => {
    const meta = content.match(/^<!-- fetched (\S+) from \S+ \((\d) parts?\) -->\n*/);
    return {
        markdown: meta ? content.slice(meta[0].length) : content,
        parts: meta ? Number(meta[2]) : (content.includes('## --- Part Two ---') ? 2 : 1),
        fetchedAt: meta ? meta[1] : null,
    };
};

/**
 * writes puzzle.md from an already downloaded page; null when the page has no puzzle text
 */
export const storeDescriptionFromPage = async (year: number, day: number, html: string): Promise<PuzzleDescription | null> => {
    const { markdown, parts } = puzzlePageToMarkdown(html);
    if (parts === 0) return null;

    const paths = getPuzzlePaths(year, day);
    await ensureDir(paths.directory);
    const content = header(year, day, parts) + markdown;
    await Deno.writeTextFile(paths.description, content);
    return parseDescription(content);
};

/**
 * downloads the puzzle page and writes puzzle.md; returns null when the puzzle isn't published yet
 */
export const fetchDescription = async (year: number, day: number): Promise<PuzzleDescription | null> => {
    const page = await fetchPuzzlePage(year, day);
    if (!page) return null;
    return storeDescriptionFromPage(year, day, page.html);
};

/**
 * stored description, or null when it hasn't been fetched
 */
export const readDescription = async (year: number, day: number): Promise<PuzzleDescription | null> => {
    try {
        return parseDescription(await Deno.readTextFile(getPuzzlePaths(year, day).description));
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) return null;
        throw error;
    }
};
