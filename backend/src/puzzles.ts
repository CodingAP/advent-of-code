/**
 * backend/src/puzzles.ts
 *
 * puzzle files on disk (solution, input, readme) plus the metadata that goes with them
 *
 * by alex prosser
 */

import { ensureDir, exists, join, readTextOrNull } from './fs.ts';
import { fetchInput, fetchPuzzlePage, fetchTitle } from './aoc-client.ts';
import { storeDescriptionFromPage } from './description.ts';
import { currentAocYear, daysInYear, FIRST_YEAR, puzzlesDir } from './config.ts';
import { getAnswers, getRuns, getStars, getStarsByYear, getStarsForYear, getStoredTitle, getTitlesForYear, storeTitle } from './db.ts';
import { solutionTemplate } from './templates.ts';

export const getSolutionDirectory = (year: number, day: number): string => join(puzzlesDir, String(year), `day${String(day).padStart(2, '0')}`);

export const getPuzzlePaths = (year: number, day: number) => {
    const directory = getSolutionDirectory(year, day);
    return {
        directory,
        solution: join(directory, 'solution.ts'),
        input: join(directory, 'input.txt'),
        readme: join(directory, 'README.md'),
        description: join(directory, 'puzzle.md'),
        examples: join(directory, 'examples.json'),
    };
};

/**
 * puzzle title from the database, scraping and storing it on first use
 */
export const getTitle = async (year: number, day: number): Promise<string | null> => {
    const stored = getStoredTitle(year, day);
    if (stored) return stored;

    const title = await fetchTitle(year, day);
    if (title) storeTitle(year, day, title);
    return title;
};

export interface PuzzleStatus {
    hasSolution: boolean;
    hasInput: boolean;
    hasReadme: boolean;
    hasDescription: boolean;
}

export const getPuzzleStatus = async (year: number, day: number): Promise<PuzzleStatus> => {
    const paths = getPuzzlePaths(year, day);
    const [hasSolution, hasInput, hasReadme, hasDescription] = await Promise.all([
        exists(paths.solution),
        exists(paths.input),
        exists(paths.readme),
        exists(paths.description),
    ]);
    return { hasSolution, hasInput, hasReadme, hasDescription };
};

/**
 * every puzzle published so far, oldest first
 */
export const releasedPuzzles = (now = new Date()): { year: number; day: number }[] => {
    const puzzles: { year: number; day: number }[] = [];
    for (let year = FIRST_YEAR; year <= currentAocYear(now); year++) {
        const inProgress = year === now.getFullYear() && now.getMonth() === 11;
        const last = inProgress ? Math.min(daysInYear(year), now.getDate()) : daysInYear(year);
        for (let day = 1; day <= last; day++) puzzles.push({ year, day });
    }
    return puzzles;
};

export class PuzzleNotGeneratedError extends Error {
    constructor(year: number, day: number) {
        super(`this puzzle hasn't been generated yet! run 'fetch --day=${day} --year=${year}' first!`);
        this.name = 'PuzzleNotGeneratedError';
    }
}

/**
 * creates the solution directory, writes a fresh solution.ts (never overwriting an existing one), downloads the input,
 * and stores the puzzle text as puzzle.md
 */
export const scaffoldPuzzle = async (
    year: number,
    day: number,
): Promise<{ title: string | null; createdSolution: boolean; inputError: string | null }> => {
    const paths = getPuzzlePaths(year, day);
    await ensureDir(paths.directory);

    const page = await fetchPuzzlePage(year, day);
    const title = page?.title ?? getStoredTitle(year, day);
    if (page) {
        storeTitle(year, day, page.title);
        await storeDescriptionFromPage(year, day, page.html);
    }

    let createdSolution = false;
    if (!(await exists(paths.solution))) {
        await Deno.writeTextFile(paths.solution, solutionTemplate(year, day, title ?? 'untitled'));
        createdSolution = true;
    }

    // the solution file is useful even when the input can't be downloaded (no session, puzzle not out yet)
    let inputError: string | null = null;
    try {
        await Deno.writeTextFile(paths.input, await fetchInput(year, day));
    } catch (error) {
        inputError = error instanceof Error ? error.message : String(error);
    }

    return { title, createdSolution, inputError };
};

/**
 * refreshes only the input file
 */
export const updateInput = async (year: number, day: number): Promise<void> => {
    const paths = getPuzzlePaths(year, day);
    await ensureDir(paths.directory);
    await Deno.writeTextFile(paths.input, await fetchInput(year, day));
};

export const readSolution = (year: number, day: number) => readTextOrNull(getPuzzlePaths(year, day).solution);
export const readInput = (year: number, day: number) => readTextOrNull(getPuzzlePaths(year, day).input);
export const readReadme = (year: number, day: number) => readTextOrNull(getPuzzlePaths(year, day).readme);

export const writeSolution = async (year: number, day: number, code: string): Promise<void> => {
    const paths = getPuzzlePaths(year, day);
    await ensureDir(paths.directory);
    await Deno.writeTextFile(paths.solution, code);
};

export const writeReadme = async (year: number, day: number, content: string): Promise<void> => {
    const paths = getPuzzlePaths(year, day);
    await ensureDir(paths.directory);
    await Deno.writeTextFile(paths.readme, content);
};

export interface YearSummary {
    year: number;
    days: number;
    stars: number;
}

export const listYears = (): YearSummary[] => {
    const stars = getStarsByYear();
    const years: YearSummary[] = [];
    for (let year = FIRST_YEAR; year <= currentAocYear(); year++) {
        years.push({ year, days: daysInYear(year), stars: stars.get(year) ?? 0 });
    }
    return years;
};

export interface DaySummary extends PuzzleStatus {
    day: number;
    title: string | null;
    stars: number;
}

/**
 * overview of a year using only local data (no network calls)
 */
export const listYear = async (year: number): Promise<DaySummary[]> => {
    const titles = getTitlesForYear(year);
    const stars = getStarsForYear(year);

    const days: DaySummary[] = [];
    for (let day = 1; day <= daysInYear(year); day++) {
        const status = await getPuzzleStatus(year, day);
        days.push({ day, title: titles.get(day) ?? null, stars: stars.get(day) ?? 0, ...status });
    }
    return days;
};

/**
 * everything the frontend needs to show a single puzzle
 */
export const getPuzzleDetail = async (year: number, day: number) => {
    const [title, status, readme] = await Promise.all([getTitle(year, day), getPuzzleStatus(year, day), readReadme(year, day)]);
    return {
        year,
        day,
        title,
        stars: getStars(year, day),
        ...status,
        readme,
        answers: getAnswers(year, day),
        runs: getRuns(year, day),
    };
};
