/**
 * backend/src/config.ts
 *
 * paths and environment configuration shared by the cli, api server, and runner
 *
 * by alex prosser
 */

import { fromModule, join } from './fs.ts';

/** version reported by the cli banner and /api/health */
export const VERSION = '4.0.0';

/** repository root (this file lives in backend/src/) */
export const repoRoot = fromModule(import.meta.url, '../..');
export const backendDir = join(repoRoot, 'backend');
export const frontendDir = join(repoRoot, 'frontend');
/** puzzle directory, overridable so tests and alternate deployments can point elsewhere */
export const puzzlesDir = Deno.env.get('AOC_PUZZLES_DIR') ?? join(repoRoot, 'puzzles');

/** config file the subprocess runner uses so puzzle imports (e.g. @std/crypto) resolve */
export const rootConfigPath = join(repoRoot, 'deno.json');
export const runnerChildPath = join(backendDir, 'runner-child.ts');

/** sqlite database location, overridable for tests or alternate deployments */
export const dbPath = Deno.env.get('AOC_DB_PATH') ?? join(backendDir, 'aoc_data.db');

/** environment driven settings, read lazily so --env-file is always applied first */
export const env = {
    apiToken: () => Deno.env.get('API_TOKEN') || undefined,
    port: () => Number(Deno.env.get('PORT') ?? 8000),
    runTimeoutMs: () => Number(Deno.env.get('RUN_TIMEOUT_MS') ?? 120_000),
    /** v8 heap cap for a solution run; a runaway solution dies with an out-of-memory error instead of taking the machine down */
    runMaxMemoryMb: () => Number(Deno.env.get('RUN_MAX_MEMORY_MB') ?? 2048),
};

export const FIRST_YEAR = 2015;

/**
 * the latest advent of code year that has puzzles: december (or nov 30 for the countdown) of the current year, else last year
 */
export const currentAocYear = (now = new Date()): number => {
    const month = now.getMonth() + 1;
    let year = now.getFullYear();
    if (month !== 12) year--;
    if (month === 11 && now.getDate() === 30) year++;
    return year;
};

export const isValidYear = (year: number): boolean => Number.isInteger(year) && year >= FIRST_YEAR && year <= currentAocYear();
/** advent of code shrank to twelve days from 2025 onward */
export const daysInYear = (year: number): number => (year >= 2025 ? 12 : 25);

export const isValidDay = (year: number, day: number): boolean => Number.isInteger(day) && day >= 1 && day <= daysInYear(year);

export type Part = '1' | '2' | 'both';
export const isPart = (value: unknown): value is Part => value === '1' || value === '2' || value === 'both';
