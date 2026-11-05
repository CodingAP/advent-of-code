/**
 * backend/src/bulk.ts
 *
 * one-at-a-time background job that downloads inputs (and puzzle text) for every released puzzle
 *
 * by alex prosser
 */

import { fetchInput } from './aoc-client.ts';
import { fetchDescription } from './description.ts';
import { getPuzzlePaths, getPuzzleStatus, releasedPuzzles } from './puzzles.ts';
import { ensureDir } from './fs.ts';

export interface BulkOptions {
    onlyMissing: boolean; // skip puzzles that already have the file
    inputs: boolean;
    descriptions: boolean;
}

export interface BulkStatus {
    running: boolean;
    total: number;
    done: number;
    downloaded: number;
    skipped: number;
    current: string | null;
    errors: string[];
    startedAt: string | null;
    finishedAt: string | null;
    options: BulkOptions | null;
}

/** small pause between requests so we don't hammer the site */
const DELAY_MS = 300;

let status: BulkStatus = {
    running: false,
    total: 0,
    done: 0,
    downloaded: 0,
    skipped: 0,
    current: null,
    errors: [],
    startedAt: null,
    finishedAt: null,
    options: null,
};

export const getBulkStatus = (): BulkStatus => ({ ...status, errors: [...status.errors] });

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const runJob = async (options: BulkOptions, onProgress?: (status: BulkStatus) => void) => {
    const puzzles = releasedPuzzles();
    status.total = puzzles.length;

    for (const { year, day } of puzzles) {
        status.current = `${year} day ${day}`;
        onProgress?.(getBulkStatus());
        try {
            const current = await getPuzzleStatus(year, day);
            let touched = false;

            if (options.inputs && (!options.onlyMissing || !current.hasInput)) {
                const paths = getPuzzlePaths(year, day);
                await ensureDir(paths.directory);
                await Deno.writeTextFile(paths.input, await fetchInput(year, day));
                touched = true;
                await sleep(DELAY_MS);
            }

            if (options.descriptions && (!options.onlyMissing || !current.hasDescription)) {
                await fetchDescription(year, day);
                touched = true;
                await sleep(DELAY_MS);
            }

            if (touched) status.downloaded++;
            else status.skipped++;
        } catch (error) {
            status.errors.push(`${year} day ${day}: ${error instanceof Error ? error.message : String(error)}`);
        }
        status.done++;
    }

    status.running = false;
    status.current = null;
    status.finishedAt = new Date().toISOString();
    onProgress?.(getBulkStatus());
};

/**
 * starts the download in the background; returns false when one is already running
 */
export const startBulkDownload = (options: Partial<BulkOptions> = {}, onProgress?: (status: BulkStatus) => void): boolean => {
    if (status.running) return false;

    const resolved: BulkOptions = { onlyMissing: true, inputs: true, descriptions: true, ...options };
    status = {
        running: true,
        total: 0,
        done: 0,
        downloaded: 0,
        skipped: 0,
        current: null,
        errors: [],
        startedAt: new Date().toISOString(),
        finishedAt: null,
        options: resolved,
    };

    runJob(resolved, onProgress).catch((error) => {
        status.errors.push(error instanceof Error ? error.message : String(error));
        status.running = false;
        status.finishedAt = new Date().toISOString();
    });
    return true;
};

/**
 * runs the download to completion (for the cli)
 */
export const bulkDownload = async (options: Partial<BulkOptions> = {}, onProgress?: (status: BulkStatus) => void): Promise<BulkStatus> => {
    if (!startBulkDownload(options, onProgress)) throw new Error('a bulk download is already running');
    while (status.running) await sleep(200);
    return getBulkStatus();
};
