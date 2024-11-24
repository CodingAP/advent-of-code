/**
 * aoc/aoc.ts
 *
 * this handles the interactions between the advent of code manager and the website
 *
 * by alex prosser
 * 11/22/2024
 */

import { DOMParser } from '@b-fuze/deno-dom';
import { STEVE } from '@codingap/steve';
import { Database } from '@db/sqlite';
import { ensureDir, exists } from '@std/fs';
import { join, resolve } from '@std/path';

/**
 * the results of the puzzle after it was processed
 */
interface PuzzleResult {
    error: boolean; // if result is an error
    message?: string; // message if it is an error
    part1?: number | string; // part 1 answer or message
    part2?: number | string; // part 2 answer or message
}

/**
 * the database entry of the puzzle's information
 */
interface PuzzleEntry {
    puzzle_id: number; // id of the entry
    day: string; // day of the puzzle
    year: string; // year of the puzzle
    title: string; // title of the puzzle
    created: string; // timestamp when puzzle was fetched
}

/**
 * the database entry of the puzzle's answer
 */
interface PuzzleAnswerEntry {
    answer_id: number; // id of the entry
    day: string; // day of the puzzle submitted
    year: string; // year of the puzzle submitted
    part: string; // part of the puzzle submitted
    answer: string; // answer of the puzzle submitted
    result: number; // if the answer is correct or not (0 or 1)
    created: string; // timestamp when answer was submitted
}

/**
 * options to be passed to 'fetch()' when called
 */
const FETCH_HEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded',
    cookie: `session=${Deno.env.get('SESSION')}`,
    'User-Agent': 'https://www.github.com/CodingAP/advent-of-code; discord: excellentap',
};

/**
 * base directory where all code is stored
 */
const baseDirectory = resolve('./');

/**
 * opens database and allows modification
 *
 * it is caller's responsibility to close it after
 *
 * @returns {Database} instance of database
 */
const getDatabase = () => {
    const database = new Database(join(baseDirectory, './aoc_data.db'));

    // create puzzles and puzzles_answers table
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
    `);

    return database;
};

/**
 * gets the puzzle title and store in the database.
 *
 * @param day day of the puzzle
 * @param year year of the puzzle
 */
const getTitle = async (
    day: string,
    year: string,
): Promise<string> => {
    // check database to see if title already is fetched
    const database = getDatabase();

    const row = database.prepare(
        `select title from puzzles where day = ? and year = ?`,
    ).get(day, year);

    if (row) {
        const title = (row as PuzzleEntry).title;
        if (title !== 'no title available!') return title;
    }

    // if no database entry, fetch website and scrape title
    const response = await fetch(
        `https://adventofcode.com/${year}/day/${day}`,
        { headers: FETCH_HEADERS },
    );

    const html = await response.text();
    const element = new DOMParser().parseFromString(html, 'text/html')
        .querySelector('h2');

    // if no title, return without storing
    if (!element) return 'no title available!';

    // store title in database
    const title = element.innerText.replace(/---/g, '').trim().split(': ')[1];

    database.exec(
        `insert into puzzles (day, year, title, created) values (?, ?, ?, ?)`,
        [day, year, title, new Date().toISOString()],
    );
    database.close();

    return title;
};

/**
 * fetches the input for the specified puzzle
 *
 * @param day day of the puzzle to be processed
 * @param year year of the puzzle to be processed
 * @returns input of the puzzle
 */
const fetchInput = async (day: string, year: string): Promise<string> => {
    // fetch input from website
    const response = await fetch(
        `https://adventofcode.com/${year}/day/${day}/input`,
        { headers: FETCH_HEADERS },
    );
    return await response.text();
};

/**
 * gets the path of the solution directory
 *
 * @param day day of the puzzle
 * @param year year of the puzzle
 * @returns path of the solution directory
 */
const getSolutionDirectory = (day: string, year: string) => {
    return join(
        baseDirectory,
        '../',
        'puzzles',
        year,
        `day${day.padStart(2, '0')}`,
    );
};

/**
 * generates the files necessary for the puzzle specified
 *
 * @param day day of the puzzle to be fetched
 * @param year year of the puzzle to be fetched
 */
const fetchPuzzle = async (day: string, year: string): Promise<void> => {
    // create needed directories and files
    const solutionDirectory = getSolutionDirectory(day, year);
    await ensureDir(solutionDirectory);

    const title = await getTitle(day, year);

    // use STEVE to render solution
    const script = STEVE.renderFile(
        join(baseDirectory, 'templates/solution.ts'),
        { day, year, title: title },
    );

    // write files to solution directory
    const input = await fetchInput(day, year);
    await Deno.writeTextFile(join(solutionDirectory, 'input.txt'), input);
    await Deno.writeTextFile(join(solutionDirectory, 'solution.ts'), script);
};

/**
 * runs the specified puzzle and gives the results back out
 *
 * @param day day of the puzzle to be ran
 * @param year year of the puzzle to be ran
 * @param part which part(s) of the puzzle to be ran
 * @returns the result of the puzzle
 */
const runPuzzle = async (
    day: string,
    year: string,
    part: string,
): Promise<PuzzleResult> => {
    const solutionDirectory = getSolutionDirectory(day, year);
    const directoryExists = await exists(solutionDirectory);

    // if the directory doesn't exist, throw error
    if (!directoryExists) {
        return {
            error: true,
            message: `this puzzle hasn't been generated yet! run 'fetch --day=${day} --year=${year}' first!`,
        };
    }

    // run the needed parts with the input in the directory
    const { part1, part2 } = await import(
        join('file://', solutionDirectory, 'solution.ts')
    );
    const input = await Deno.readTextFile(join(solutionDirectory, 'input.txt'));

    const results = { part1: 'n/a', part2: 'n/a' };

    if (part === '1' || part === 'both') {
        results.part1 = part1(input.replace(/\r/g, '').trim());
    }

    if (part === '2' || part === 'both') {
        results.part2 = part2(input.replace(/\r/g, '').trim());
    }

    return { error: false, part1: results.part1, part2: results.part2 };
};

/**
 * runs the puzzles while timing them and reports all results to a readme file in the solution directory
 *
 * @param day day of the puzzle to be profiled
 * @param year year of the puzzle to be profiled
 * @param stars amount of stars obtained by puzzle
 * @param inputMode tells how to parse the input
 * @returns the result of the puzzle
 */
const profilePuzzle = async (
    day: string,
    year: string,
    iterations: string,
): Promise<PuzzleResult> => {
    const solutionDirectory = getSolutionDirectory(day, year);
    const directoryExists = await exists(solutionDirectory);

    // if the directory doesn't exist, throw error
    if (!directoryExists) {
        return {
            error: true,
            message: `this puzzle hasn't been generated yet! run 'fetch --day=${day} --year=${year}' first!`,
        };
    }

    // run the needed parts with the input in the directory
    const { part1, part2 } = await import(
        join('file://', solutionDirectory, 'solution.ts')
    );
    const input = await Deno.readTextFile(join(solutionDirectory, 'input.txt'));

    // time part 1
    let part1Result: string | number = 'n/a';
    let part2Result: string | number = 'n/a';
    let part1Time = 0,
        part2Time = 0;

    for (let i = 0; i < parseInt(iterations); i++) {
        const start = performance.now();
        part1Result = part1(input.replace(/\r/g, '').trim());
        const end = performance.now();

        part1Time += end - start;
    }

    // time part2
    for (let i = 0; i < parseInt(iterations); i++) {
        const start = performance.now();
        part2Result = part2(input.replace(/\r/g, '').trim());
        const end = performance.now();

        part2Time += end - start;
    }

    const title = await getTitle(day, year);

    const readme = STEVE.renderFile(
        join(baseDirectory, 'templates/README.md'),
        {
            day,
            year,
            title,
            part1: {
                result: part1Result,
                time: (part1Time / parseInt(iterations)).toFixed(2),
            },
            part2: {
                result: part2Result,
                time: (part2Time / parseInt(iterations)).toFixed(2),
            },
        },
    );

    await Deno.writeTextFile(join(solutionDirectory, 'README.md'), readme);

    return { error: false };
};

/**
 * submits the answer for a specific day, year, and part to the advent of code website
 *
 * @param day day of the puzzle
 * @param year year of the puzzle
 * @param part part of the puzzle
 * @param answer the answer to submit
 * @returns the result of the submission
 */
const submitAnswer = async (
    day: string,
    year: string,
    part: string,
    fake: string,
): Promise<PuzzleResult> => {
    /**
     * submits specific part and stores it to prevent accidental resubmits
     *
     * @param part which part to submit
     * @param answer the answer to submit
     * @returns message regarding the status of answer
     */
    const submitPart = async (part: string, answer: string) => {
        // check if answer is already submitted
        const database = getDatabase();

        const row = database.prepare(
            `select result from puzzle_answers where day = ? and year = ? and part = ? and answer = ?`,
        ).get(day, year, part, answer);

        if (row) {
            const result = (row as PuzzleAnswerEntry).result;
            if (result === 1) {
                return "🎉 resubmission successful: that's the right answer!";
            } else {
                return "❌ resubmission failed: that's not the right answer.";
            }
        }

        let message = 'n/a', isCorrect;
        if (fake === 'false') {
            // submits the answer with a post request
            const response = await fetch(
                `https://adventofcode.com/${year}/day/${day}/answer`,
                {
                    method: 'POST',
                    headers: FETCH_HEADERS,
                    body: new URLSearchParams({
                        level: part,
                        answer: answer,
                    }),
                },
            );

            // throw network errors if needed
            if (!response.ok) {
                throw new Error(`submission failed: ${response.statusText}`);
            }

            const responseText = await response.text();

            // parse the html text to find the result
            if (responseText.includes("That's the right answer")) {
                message = "🎉 submission successful: that's the right answer!";
                isCorrect = true;
            } else if (responseText.includes("That's not the right answer")) {
                message = "❌ submission failed: that's not the right answer.";
                isCorrect = false;
            } else if (
                responseText.includes('You gave an answer too recently')
            ) {
                message = '⏳ submission failed: you are submitting too quickly.';
            } else if (
                responseText.includes(
                    "You don't seem to be solving the right level",
                )
            ) {
                message = '❓ submission failed: already solved.';
            } else {
                console.log(responseText);
                message = '⚠️ submission failed: unknown response from server.';
            }
        } else {
            isCorrect = true;
            message = 'fake submission: this better be right!';
        }

        // if an answer isn't correct/incorrect, don't store in database
        if (isCorrect !== undefined) {
            database.exec(
                `insert into puzzle_answers (day, year, part, answer, result, created) values (?, ?, ?, ?, ?, ?)`,
                [day, year, part, answer, isCorrect, new Date().toISOString()],
            );
        }

        return message;
    };

    const solutionDirectory = getSolutionDirectory(day, year);
    const directoryExists = await exists(solutionDirectory);

    // run the needed parts with the input in the directory
    if (!directoryExists) {
        return {
            error: true,
            message: `this puzzle hasn't been generated yet! run 'fetch --day=${day} --year=${year}' first!`,
        };
    }

    // run the needed parts with the input in the directory
    const { part1, part2 } = await runPuzzle(day, year, part);

    let part1Message = 'n/a', part2Message = 'n/a';
    if (part === '1' && part1 !== undefined) {
        part1Message = await submitPart('1', part1.toString());
    }

    if (part === '2' && part2 !== undefined) {
        part2Message = await submitPart('2', part2.toString());
    }

    if (part === 'both' && part1 !== undefined && part2 !== undefined) {
        part1Message = await submitPart('1', part1.toString());
        if (fake === 'false') await new Promise((f) => setTimeout(f, 5000)); // there is a 5 second delay between submissions
        part2Message = await submitPart('2', part2.toString());
    }

    return { error: false, part1: part1Message, part2: part2Message };
};

/**
 * generates the inputs for the puzzle specified without touching the solution
 *
 * @param day day of the puzzle to be fetched
 * @param year year of the puzzle to be fetched
 */
const updatePuzzle = async (day: string, year: string): Promise<void> => {
    // create solution directory
    const solutionDirectory = getSolutionDirectory(day, year);
    await ensureDir(solutionDirectory);

    // write input to solution directory
    const input = await fetchInput(day, year);
    await Deno.writeTextFile(join(solutionDirectory, 'input.txt'), input);
};

if (import.meta.main) {
    for (let year = 2015; year <= 2023; year++) {
        for (let day = 1; day <= 25; day++) {
            console.log(year, day);
            await getTitle(day.toString(), year.toString());
        }
    }
}

export type { PuzzleAnswerEntry };
export { fetchPuzzle, getDatabase, getSolutionDirectory, getTitle, profilePuzzle, runPuzzle, submitAnswer, updatePuzzle };
