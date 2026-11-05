/**
 * frontend/src/markdown.ts
 *
 * renders the small markdown subset the backend produces for puzzle text (and that readmes use):
 * headings, paragraphs, fenced code, lists, tables, inline code, emphasis, links
 */

const escapeHtml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** ⟪…⟫ inside code is the scraper's way of keeping the site's highlighted characters */
const codeHtml = (text: string) => escapeHtml(text).replace(/⟪([^⟫]*)⟫/g, '<em class="star">$1</em>');

/** code with the highlight markers removed (for copying examples) */
export const plainCode = (text: string) => text.replace(/[⟪⟫]/g, '');

const inline = (text: string): string => {
    const codes: string[] = [];
    // protect code spans first so emphasis markers inside them are left alone
    let out = text.replace(/``\s?([\s\S]*?)\s?``|`([^`]+)`/g, (_match, a: string | undefined, b: string | undefined) => {
        codes.push(`<code>${codeHtml(a ?? b ?? '')}</code>`);
        return `@@CODE${codes.length - 1}@@`;
    });
    out = escapeHtml(out)
        .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_match, label: string, href: string) => `<a href="${href}" target="_blank" rel="noopener">${label}</a>`)
        .replace(/\*\*([^*]+)\*\*/g, '<em class="star">$1</em>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>');
    return out.replace(/@@CODE(\d+)@@/g, (_match, index: string) => codes[Number(index)]);
};

/**
 * markdown → html
 */
export const renderMarkdown = (markdown: string): string => {
    const lines = markdown.replace(/\r/g, '').split('\n');
    const html: string[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        if (line.trim() === '') {
            i++;
            continue;
        }

        if (line.startsWith('```')) {
            const code: string[] = [];
            i++;
            while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++]);
            i++;
            html.push(`<pre><code>${codeHtml(code.join('\n'))}</code></pre>`);
            continue;
        }

        const heading = line.match(/^(#{1,6})\s+(.*)$/);
        if (heading) {
            html.push(`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`);
            i++;
            continue;
        }

        if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
            const ordered = /^\s*\d+\./.test(line);
            const items: string[] = [];
            while (i < lines.length && (/^\s*[-*]\s+/.test(lines[i]) || /^\s*\d+\.\s+/.test(lines[i]))) {
                items.push(`<li>${inline(lines[i].replace(/^\s*([-*]|\d+\.)\s+/, ''))}</li>`);
                i++;
            }
            html.push(`<${ordered ? 'ol' : 'ul'}>${items.join('')}</${ordered ? 'ol' : 'ul'}>`);
            continue;
        }

        if (line.trim().startsWith('|')) {
            const rows: string[][] = [];
            while (i < lines.length && lines[i].trim().startsWith('|')) {
                const cells = lines[i].trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
                if (!cells.every((cell) => /^:?-+:?$/.test(cell))) rows.push(cells);
                i++;
            }
            const [head, ...body] = rows;
            html.push(
                `<table><thead><tr>${head.map((cell) => `<th>${inline(cell)}</th>`).join('')}</tr></thead><tbody>${
                    body.map((row) => `<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join('')}</tr>`).join('')
                }</tbody></table>`,
            );
            continue;
        }

        if (line.startsWith('<!--')) {
            while (i < lines.length && !lines[i].includes('-->')) i++;
            i++;
            continue;
        }

        const paragraph: string[] = [];
        while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('```') && !/^#{1,6}\s/.test(lines[i])) {
            paragraph.push(lines[i++]);
        }
        html.push(`<p>${inline(paragraph.join('\n'))}</p>`);
    }

    return html.join('\n');
};
