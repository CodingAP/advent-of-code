/**
 * backend/src/aoc-client.ts
 *
 * every request made to adventofcode.com lives here
 *
 * by alex prosser
 */

import { getSession } from './session.ts';

const headers = async () => ({
    'Content-Type': 'application/x-www-form-urlencoded',
    cookie: `session=${await getSession()}`,
    'User-Agent': 'https://www.github.com/CodingAP/advent-of-code; discord: excellentap',
});

const decodeEntities = (text: string): string =>
    text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&apos;/g, "'");

export interface PuzzlePage {
    title: string;
    html: string;
}

/**
 * downloads the day page and pulls the title out of it; null when the puzzle isn't available yet
 */
export const fetchPuzzlePage = async (year: number, day: number): Promise<PuzzlePage | null> => {
    const response = await fetch(`https://adventofcode.com/${year}/day/${day}`, { headers: await headers() });
    if (!response.ok) return null;

    const html = await response.text();
    const match = html.match(/<h2>--- Day \d+: (.+?) ---<\/h2>/);
    return match ? { title: decodeEntities(match[1]).trim(), html } : null;
};

/**
 * scrapes the puzzle title from the day page; null when the puzzle isn't available yet
 */
export const fetchTitle = async (year: number, day: number): Promise<string | null> => (await fetchPuzzlePage(year, day))?.title ?? null;

/** inputs and submissions are per user, so they need the session cookie */
const requireSession = async () => {
    if (!(await getSession())) {
        throw new Error('no adventofcode.com session cookie configured: set it in the settings panel or with `deno task cli session --token=...`');
    }
};

const explain = (
    status: number,
) => (status === 400 || status === 401 ? ' (your SESSION cookie is probably expired or wrong)' : status === 404 ? ' (puzzle not released yet)' : '');

/**
 * downloads the puzzle input for the logged in user
 */
export const fetchInput = async (year: number, day: number): Promise<string> => {
    await requireSession();
    const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, { headers: await headers() });
    if (!response.ok) {
        throw new Error(`could not fetch input for ${year} day ${day}: ${response.status} ${response.statusText}${explain(response.status)}`);
    }
    return await response.text();
};

export type SubmitOutcome = 'correct' | 'incorrect' | 'too-soon' | 'already-solved' | 'unknown';

/**
 * posts an answer and classifies the response page
 */
export const postAnswer = async (year: number, day: number, part: '1' | '2', answer: string): Promise<SubmitOutcome> => {
    await requireSession();
    const response = await fetch(`https://adventofcode.com/${year}/day/${day}/answer`, {
        method: 'POST',
        headers: await headers(),
        body: new URLSearchParams({ level: part, answer }),
    });

    if (!response.ok) {
        throw new Error(`submission failed: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    if (text.includes("That's the right answer")) return 'correct';
    if (text.includes("That's not the right answer")) return 'incorrect';
    if (text.includes('You gave an answer too recently')) return 'too-soon';
    if (text.includes("You don't seem to be solving the right level")) return 'already-solved';
    return 'unknown';
};
