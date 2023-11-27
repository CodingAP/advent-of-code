/**
 * advent-of-code/src/aoc.js
 * 
 * this handles the interactions between the advent of code manager and the website
 * 
 * by alex prosser
 * 11/23/2023
 */

/**
 * the results of the puzzle after it was processed
 * 
 * @typedef {Object} PuzzleRunResult
 * @property {boolean} error if an error occured before running the puzzle
 * @property {string?} message if error, the error message
 * @property {any?} part1 if no error, the result of part 1 of the puzzle
 * @property {any?} part2 if no error, the result of part 2 of the puzzle
 */

import { STEVE } from 'steve-template-engine';
import { parse } from 'node-html-parser';
import fs from 'node:fs/promises';
import path from 'node:path';
import 'dotenv/config';

/**
 * Options to be passed to 'fetch()' when called
 */
const FETCH_OPTIONS = {
    headers: {
        cookie: `session=${process.env.SESSION}`,
        'User-Agent': 'https://www.github.com/CodingAP/advent-of-code; discord: excellentap',
    }
};

/**
 * Base directory where all code is stored
 */
const baseDirectory = path.resolve('./aoc');

/**
 * checks if a file/directory exists
 * 
 * @param {string} path path to check
 * @returns {Promise<boolean>} whether or not something exists there
 */
const checkForExistance = async path => {
    try {
        await fs.stat(path);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * tries to get the puzzle title for the specified puzzle from titles.json
 * 
 * fetches and stores if no title is found
 * 
 * @param {string} day day of the puzzle to be processed
 * @param {string} year year of the puzzle to be processed
 * @returns {Promise<string>} title of the puzzle
 */
const getTitle = async (day, year) => {
    // check puzzles.json for title
    const puzzles = JSON.parse(await fs.readFile(path.join(baseDirectory, 'src/puzzles.json'), { encoding: 'utf-8' }));
    let puzzle = puzzles[year][parseInt(day) - 1];
    if (puzzle != null) {
        return puzzle.title;
    }

    // if no title, fetch it and add to puzzles.json
    const response = await fetch(`https://adventofcode.com/${year}/day/${day}`, FETCH_OPTIONS);
    const root = parse(await response.text());
    const title = root.querySelectorAll('h2')[0].innerText.replace(/-/g, '').trim().split(': ')[1];

    puzzles[year][parseInt(day) - 1].title = title;
    puzzles[year][parseInt(day) - 1].stars = 0;

    await fs.writeFile(path.join(baseDirectory, 'src/puzzles.json'), JSON.stringify(puzzles, null, 4));
    return title;
}

/**
 * Update the stars in puzzles.json
 * 
 * @param {string} day day of the puzzle to update
 * @param {string} year year of the puzzle to update
 * @param {string} starCount number of stars earned
 * @return {Promise<void>} nothing
 */
const updateStars = async (day, year, starCount) => {
    // check puzzles.json for title
    const puzzles = JSON.parse(await fs.readFile(path.join(baseDirectory, 'src/puzzles.json'), { encoding: 'utf-8' }));
    let puzzle = puzzles[year][parseInt(day) - 1];
    if (puzzle != null) {
        await getTitle(day, year);
    }

    puzzles[year][parseInt(day) - 1].stars = parseInt(starCount);
    await fs.writeFile(path.join(baseDirectory, 'src/puzzles.json'), JSON.stringify(puzzles, null, 4));
}

/**
 * Fetches the input for the specified puzzle
 * 
 * @param {string} day day of the puzzle to be processed
 * @param {string} year year of the puzzle to be processed
 * @returns {Promise<string>} input of the puzzle
 */
const fetchInput = async (day, year) => {
    const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, FETCH_OPTIONS);
    return await response.text();
}

/**
 * Generates the files necessary for the puzzle specified
 * 
 * @param {string} day day of the puzzle to be fetched
 * @param {string} year year of the puzzle to be fetched
 * @param {string} inputmode tells how to parse the input
 * @returns {Promise<void>} nothing
 */
const fetchPuzzle = async (day, year, inputmode) => {
    // read all sources
    const input = await fetchInput(day, year);
    const templateScript = await fs.readFile(path.join(baseDirectory, 'src/steve/template.steve'), { encoding: 'utf8' });
    const solutionDirectory = path.join(baseDirectory, 'puzzles', year, `day${day.padStart(2, '0')}`);
    const exists = await checkForExistance(solutionDirectory);

    // if directory doesn't exist, throw error
    if (!exists) {
        await fs.mkdir(solutionDirectory, { recursive: true });
    }

    // generate the template script
    const title = await getTitle(day, year);
    const script = STEVE.render(templateScript, { day, year, title, isString: inputmode != 'bytes' });

    // write the files necessary
    await fs.writeFile(path.join(solutionDirectory, 'input.txt'), input);
    await fs.writeFile(path.join(solutionDirectory, 'solution.js'), script);
}

/**
 * Runs the specified puzzle and gives the results back out. Throw error if puzzle directory doesn't exist
 * 
 * @param {string} day day of the puzzle to be ran
 * @param {string} year year of the puzzle to be ran
 * @param {string} inputmode tells how to parse the input
 * @param {string} part which part(s) of the puzzle to be ran
 * @returns {Promise<PuzzleRunResult>} the result of the puzzle
 */
const runPuzzle = async (day, year, inputmode, part) => {
    const solutionDirectory = path.join(baseDirectory, 'puzzles', year, `day${day.padStart(2, '0')}`);
    const exists = await checkForExistance(solutionDirectory);

    // if directory doesn't exist, throw error
    if (!exists) {
        return { error: true, message: `this puzzle hasn't been generated yet! run 'fetch --day=${day} --year=${year}' first!` };
    }

    // grab the code and input
    const { part1, part2 } = await import(path.join('file://', solutionDirectory, 'solution.js'));
    let input = await fs.readFile(path.join(solutionDirectory, 'input.txt'));

    // correctly set the input based off inputmode
    switch (inputmode) {
        case 'trimmed_string':
            input = input.toString().trim();
            break;
        case 'string':
            input = input.toString();
            break;
        case 'bytes':
            break;
    }

    // run the code based off which part to run
    let results = { part1: 'N/A', part2: 'N/A' };
    if (part == '1' || part == 'both') {
        results.part1 = await part1(input);
    }

    if (part == '2' || part == 'both') {
        results.part2 = await part2(input);
    }

    return { error: false, part1: results.part1, part2: results.part2 };
}

/**
 * Runs the puzzles while timing them and reports all results to a README file in the solution directory
 * 
 * @param {string} day day of the puzzle to be profiled
 * @param {string} year year of the puzzle to be profiled
 * @param {string} stars amount of stars obtained by puzzle
 * @param {string} inputmode tells how to parse the input
 * @returns {Promise<PuzzleRunResult>} the result of the puzzle
 */
const profilePuzzle = async (day, year, stars, inputmode) => {
    const solutionDirectory = path.join(baseDirectory, 'puzzles', year, `day${day.padStart(2, '0')}`);
    const exists = await checkForExistance(solutionDirectory);
    
    // if directory doesn't exist, throw error
    if (!exists) {
        return { error: true, message: `this puzzle hasn't been generated yet! run 'fetch --day=${day} --year=${year}' first!` };
    }

    // grab the code and input
    const { part1, part2 } = await import(path.join('file://', solutionDirectory, 'solution.js'));
    let input = await fs.readFile(path.join(solutionDirectory, 'input.txt'));

    // correctly set the input based off inputmode
    switch (inputmode) {
        case 'trimmed_string':
            input = input.toString().trim();
            break;
        case 'string':
            input = input.toString();
            break;
        case 'bytes':
            break;
    }

    // time part1
    const codeRunTimes = 10;
    let part1Result, part2Result;
    let part1Time = 0, part2Time = 0;
    for (let i = 0; i < codeRunTimes; i++) {
        let start = performance.now();
        part1Result = await part1(input);
        let end = performance.now();

        part1Time += end - start;
    }

    // time part2
    for (let i = 0; i < codeRunTimes; i++) {
        let start = performance.now();
        part2Result = await part2(input);
        let end = performance.now();

        part2Time += end - start;
    }

    // update the stars in puzzle.json
    await updateStars(day, year, stars);

    // generate the readme file
    const templateReadme = await fs.readFile(path.join(baseDirectory, 'src/steve/readme.steve'), { encoding: 'utf8' });
    const title = await getTitle(day, year);

    const readme = STEVE.render(templateReadme, {
        day, year, title,
        part1: {
            result: part1Result,
            time: (part1Time / codeRunTimes).toFixed(2)
        },
        part2: {
            result: part2Result,
            time: (part2Time / codeRunTimes).toFixed(2) 
        }
    });

    await fs.writeFile(path.join(solutionDirectory, 'readme.md'), readme);

    return { error: false };
}

export { checkForExistance, fetchPuzzle, runPuzzle, profilePuzzle };