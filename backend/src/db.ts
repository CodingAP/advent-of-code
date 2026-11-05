/**
 * backend/src/db.ts
 *
 * sqlite access for puzzle titles, submissions, and run history
 *
 * by alex prosser
 */

import { DatabaseSync } from 'node:sqlite';
import { dbPath } from './config.ts';

export interface PuzzleRow {
    puzzle_id: number;
    day: string;
    year: string;
    title: string;
    created: string;
}

export interface AnswerRow {
    answer_id: number;
    day: string;
    year: string;
    part: string;
    answer: string;
    result: number; // 1 = correct, 0 = incorrect
    created: string;
}

export interface RunRow {
    run_id: number;
    day: string;
    year: string;
    part: string;
    answer: string | null;
    time_ms: number | null;
    iterations: number;
    success: number;
    error: string | null;
    created: string;
}

/** title stored by older versions of the tool when scraping failed; treated as missing */
const MISSING_TITLE = 'no title available!';

let database: DatabaseSync | null = null;

/**
 * opens (once per process) the database and makes sure the schema exists
 */
export const getDatabase = (): DatabaseSync => {
    if (database) return database;

    database = new DatabaseSync(dbPath);
    database.exec(`
        create table if not exists puzzles (
            puzzle_id integer primary key autoincrement,
            day text not null,
            year text not null,
            title text not null,
            created text not null,
            unique(day, year)
        );

        create table if not exists puzzle_answers (
            answer_id integer primary key autoincrement,
            day text not null,
            year text not null,
            part text not null,
            answer text not null,
            result integer not null,
            created text not null
        );

        create table if not exists runs (
            run_id integer primary key autoincrement,
            day text not null,
            year text not null,
            part text not null,
            answer text,
            time_ms real,
            iterations integer not null,
            success integer not null,
            error text,
            created text not null
        );

        create index if not exists runs_puzzle on runs (year, day, created);
    `);

    return database;
};

const now = () => new Date().toISOString();

export const getStoredTitle = (year: number, day: number): string | null => {
    const row = getDatabase().prepare(`select title from puzzles where day = ? and year = ?`).get(String(day), String(year)) as
        | Pick<PuzzleRow, 'title'>
        | undefined;
    if (!row || row.title === MISSING_TITLE) return null;
    return row.title;
};

export const storeTitle = (year: number, day: number, title: string): void => {
    getDatabase().prepare(
        `insert into puzzles (day, year, title, created) values (?, ?, ?, ?)
         on conflict(day, year) do update set title = excluded.title`,
    ).run(String(day), String(year), title, now());
};

/** all stored titles for a year keyed by day */
export const getTitlesForYear = (year: number): Map<number, string> => {
    const rows = getDatabase().prepare(`select day, title from puzzles where year = ?`).all(String(year)) as Pick<PuzzleRow, 'day' | 'title'>[];
    return new Map(rows.filter((row) => row.title !== MISSING_TITLE).map((row) => [Number(row.day), row.title]));
};

/** stars earned for a puzzle: number of distinct parts with a correct submission */
export const getStars = (year: number, day: number): number => {
    const row = getDatabase().prepare(
        `select count(distinct part) as stars from puzzle_answers where day = ? and year = ? and result = 1 and part in ('1', '2')`,
    ).get(String(day), String(year)) as { stars: number };
    return row.stars;
};

/** stars per day for a year, keyed by day */
export const getStarsForYear = (year: number): Map<number, number> => {
    const rows = getDatabase().prepare(
        `select day, count(distinct part) as stars from puzzle_answers where year = ? and result = 1 and part in ('1', '2') group by day`,
    ).all(String(year)) as { day: string; stars: number }[];
    return new Map(rows.map((row) => [Number(row.day), row.stars]));
};

/** total stars per year */
export const getStarsByYear = (): Map<number, number> => {
    const rows = getDatabase().prepare(
        `select year, count(*) as stars from (
            select distinct year, day, part from puzzle_answers where result = 1 and part in ('1', '2')
        ) group by year`,
    ).all() as { year: string; stars: number }[];
    return new Map(rows.map((row) => [Number(row.year), row.stars]));
};

export const getAnswers = (year: number, day: number): AnswerRow[] => {
    return getDatabase().prepare(
        `select * from puzzle_answers where day = ? and year = ? order by created desc, answer_id desc`,
    ).all(String(day), String(year)) as unknown as AnswerRow[];
};

export const findAnswer = (year: number, day: number, part: string, answer: string): AnswerRow | null => {
    const row = getDatabase().prepare(
        `select * from puzzle_answers where day = ? and year = ? and part = ? and answer = ?`,
    ).get(String(day), String(year), part, answer) as AnswerRow | undefined;
    return row ?? null;
};

export const insertAnswer = (year: number, day: number, part: string, answer: string, correct: boolean): void => {
    getDatabase().prepare(
        `insert into puzzle_answers (day, year, part, answer, result, created) values (?, ?, ?, ?, ?, ?)`,
    ).run(String(day), String(year), part, answer, correct ? 1 : 0, now());
};

export interface NewRun {
    part: '1' | '2';
    answer: string | null;
    timeMs: number | null;
    iterations: number;
    success: boolean;
    error: string | null;
}

export const insertRun = (year: number, day: number, run: NewRun): void => {
    getDatabase().prepare(
        `insert into runs (day, year, part, answer, time_ms, iterations, success, error, created) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(String(day), String(year), run.part, run.answer, run.timeMs, run.iterations, run.success ? 1 : 0, run.error, now());
};

export const getRuns = (year: number, day: number, limit = 100): RunRow[] => {
    return getDatabase().prepare(
        `select * from runs where day = ? and year = ? order by created desc, run_id desc limit ?`,
    ).all(String(day), String(year), limit) as unknown as RunRow[];
};
