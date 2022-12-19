import process from 'process';
import fs from 'fs/promises';
import fetch from 'node-fetch';
import { fileURLToPath, URLSearchParams } from 'url';

const settings = JSON.parse((await fs.readFile('./settings.json')).toString());

const fetchDay = async (day, year) => {
    await generateDay(day, year);

    const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
        headers: {
            cookie: `session=${settings.tokens[settings.currentProfile]}`,
            'User-Agent': 'https://www.github.com/CodingAP/advent-of-code aoc-manager (Discord AP#1519)',
        }
    });

    const input = await response.text();
    await fs.writeFile(`./profiles/${settings.currentProfile}/${year}/day${day}/input.txt`, input);
}

const generateDay = async (day, year) => {
    const mainCode = await fs.readFile('./scripts/main_program.js');

    const directory = `./profiles/${settings.currentProfile}/${year}/day${day}`;
    let exists = false;
    try {
        const stats = await fs.stat(directory);
        exists = stats.isDirectory();
    } catch (error) { }

    if (!exists) await fs.mkdir(directory, { recursive: true });

    await fs.writeFile(directory + `/solution.js`, mainCode);
}

const generateREADME = async (day, year, inputmode = 'STRING_TRIMMED') => {
    let response = await fetch(`https://adventofcode.com/${year}/day/${day}`, {
        headers: {
            cookie: `session=${settings.tokens[settings.currentProfile]}`,
            'User-Agent': 'https://www.github.com/CodingAP/advent-of-code aoc-manager (Discord AP#1519)',
        }
    });
    let text = await response.text();
    let title = [...text.matchAll(/<h2>\s*.*<\/h2>/g)][0][0].split(': ')[1].split(' ---')[0];

    let results = await runDay(day, year, 'BOTH', inputmode);
    let readme = await fs.readFile('./scripts/day_readme.md');
    readme = readme.toString()
        .replace(/%year%/g, year)
        .replace(/%day%/g, day)
        .replace(/%title%/g, title)
        .replace(/%part1%/g, results.part1.answer)
        .replace(/%part2%/g, results.part2.answer);

    const directory = `./profiles/${settings.currentProfile}/${year}/day${day}`;
    let exists = false;
    try {
        const stats = await fs.stat(directory);
        exists = stats.isDirectory();
    } catch (error) { }

    if (!exists) await fs.mkdir(directory, { recursive: true });

    await fs.writeFile(directory + `/README.md`, readme);
}

const generateWriteUp = async (day, year) => {
    let response = await fetch(`https://adventofcode.com/${year}/day/${day}`, {
        headers: {
            cookie: `session=${settings.tokens[settings.currentProfile]}`,
            'User-Agent': 'https://www.github.com/CodingAP/advent-of-code aoc-manager (Discord AP#1519)',
        }
    });
    let text = await response.text();
    let title = [...text.matchAll(/<h2>\s*.*<\/h2>/g)][0][0].split(': ')[1].split(' ---')[0];

    let writeup = await fs.readFile('./scripts/writeup.md');
    writeup = writeup.toString()
        .replace(/%year%/g, year)
        .replace(/%day%/g, day)
        .replace(/%title%/g, title);

    const directory = `./writeups/${year}/`;
    let exists = false;
    try {
        const stats = await fs.stat(directory);
        exists = stats.isDirectory();
    } catch (error) { }

    if (!exists) await fs.mkdir(directory, { recursive: true });

    await fs.writeFile(directory + `/day${day}_writeup.md`, writeup);
}

const runDay = async (day, year, part = 'BOTH', inputmode = 'STRING_TRIMMED') => {
    const directory = `./profiles/${settings.currentProfile}/${year}/day${day}`;
    const { part1, part2 } = await import(directory + '/solution.js');

    let input = await fs.readFile(directory + '/input.txt');

    switch (inputmode) {
        case 'STRING_TRIMMED':
            input = input.toString().trim();
            break;
        case 'STRING':
            input = input.toString();
            break;
        case 'BYTES':
            break;
    }
    let results = {};

    if (part == '1' || part == 'BOTH') {
        let start = process.hrtime();
        let answer = await part1(input);
        let time = process.hrtime(start)[1] / 1000000;

        results.part1 = { answer, time };
    }

    if (part == '2' || part == 'BOTH') {
        let start = process.hrtime();
        let answer = await part2(input);
        let time = process.hrtime(start)[1] / 1000000;

        results.part2 = { answer, time };
    }

    return results;
}

const submitDay = async (day, year, part = 'BOTH', inputmode = 'STRING_TRIMMED') => {
    const results = await runDay(day, year, part, inputmode);

    const response = await fetch(`https://adventofcode.com/${year}/day/${day}/answer`, {
        method: 'POST',
        headers: {
            cookie: `session=${token.SESSION_ID}`,
            'User-Agent': 'https://www.github.com/CodingAP/advent-of-code aoc-manager (Discord AP#1519)',
            'cache-control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            level: part,
            answer: results[`part${part}`].answer
        })
    });

    let outcome = { correct: false, error: false, message: '' };
    let text = await response.text();
    if (text.search('That\'s the right answer!')) { // Correct
        outcome.correct = true;
        outcome.message = '\x1b[32mThis is the right answer! Another golden star: \x1b[1m\x1b[33m*\x1b[32m!\x1b[0m';
    } else if (text.search('That\'s not the right answer') != -1) { // Incorrect
        outcome.correct = false;
        outcome.message = '\x1b[31mThis is not the right answer!\x1b[0m';
    } else if (text.search('You gave an answer too recently') != -1) { // Submitted it too fast 
        outcome.error = true;
        outcome.message = '\x1b[31mYou have answered too fast! Slow down and do not resubmit an answer.\x1b[0m'
    } else if (text.search('Did you already complete it?') != -1) { // Already finished
        outcome.error = true;
        outcome.message = '\x1b[46mIt seems like you have already submitted a correct answer for this puzzle.\x1b[0m'
    }
    return outcome;
}

const printHelpMessage = () => {
    console.log(
`Advent of Code Manager

Usage:
    node aoc [--f | --g | --m | --w] --d=<day> --y=<year>
    node aoc [--r | --s] --d=<day> --y=<year> --p=<part> --i=<inputmode> 
    node aoc [--h | --help]
            
Options:
    --d, --day          Day of the puzzle (defaults to current day if nothing is provided)
    --f, --fetcher      Gets the puzzle input and creates new solution folder for the day
    --g, --generate     Generates the solution folder without getting the input
    --h, --help         Shows the help message
    --i, --inputmode    Set's the inputs mode (string/bytes, trimmed/not trimmed, etc.). Defaults to trimmed string.
    --m, --readme       Generates a README for the day with information like results and writeup
    --p, --part         Part of the puzzle (defaults to both if nothing is provided)
    --r, --run          Run day's solution for testing
    --s, --submit       Submits the puzzle solutions to the website and gets a response
    --w, --writeup      Generates a write up file
    --y, --year         Year of the puzzle (defaults to current year if nothing is provided)
`
    );
}

if ((process.argv[1] + '.js') === fileURLToPath(import.meta.url)) {
    const currentDay = new Date(new Date().toLocaleString("en-US", {
        timeZone: 'America/New_York'
    }));

    const options = {
        mode: 'HELP',
        day: currentDay.getDate(),
        year: currentDay.getFullYear(),
        part: 'BOTH',
        inputmode: 'STRING_TRIMMED',
        error: false
    }

    process.argv.slice(2).forEach(arg => {
        let tokens = arg.split('=');
        switch (tokens[0]) {
            case '--f':
            case '--fetcher':
                options.mode = 'FETCH';
                break;
            case '--g':
            case '--generate':
                options.mode = 'GENERATE';
                break;
            case '--h':
            case '--help':
                options.mode = 'HELP';
                break;
            case '--m':
            case '--readme':
                options.mode = 'README';
                break;
            case '--r':
            case '--run':
                options.mode = 'RUN';
                break;
            case '--s':
            case '--submit':
                options.mode = 'SUBMIT';
                break;
            case '--w':
            case '--writeup':
                options.mode = 'WRITEUP';
                break;
            case '--d':
            case '--day':
                if (isNaN(tokens[1]) || parseInt(tokens[1]) < 1 || parseInt(tokens[1]) > 25) {
                    console.log(`\x1b[31mERROR: day is not a valid value (expected 1-25; got ${tokens[1]})\x1b[0m`);
                    options.error = true;
                } else options.day = tokens[1];
                break;
            case '--i':
            case '--inputmode':
                if (tokens[1] != 'string_trimmed' && tokens[1] != 'string' && tokens[1] != 'bytes') {
                    console.log(`\x1b[31mERROR: inputmode is not a valid value (expected string_trimmed, string, or bytes; got ${tokens[1]})\x1b[0m`);
                    options.error = true;
                } else options.inputmode = tokens[1].toUpperCase();
                break;
            case '--p':
            case '--part':
                if (tokens[1] != '1' && tokens[1] != '2' && tokens[1] != 'both') {
                    console.log(`\x1b[31mERROR: part is not a valid value (expected 1, 2, or both; got ${tokens[1]})\x1b[0m`);
                    options.error = true;
                } else options.part = tokens[1].toUpperCase();
                break;
            case '--y':
            case '--year':
                if (isNaN(tokens[1]) || parseInt(tokens[1]) < 2015 || parseInt(tokens[1]) > 2022) {
                    console.log(`\x1b[31mERROR: year is not a valid value (expected 2015-2022; got ${tokens[1]})\x1b[0m`);
                    options.error = true;
                } else options.year = tokens[1];
                break;
        }
    });

    if (options.mode == 'SUBMIT' && options.part == 'BOTH' && !options.error) {
        console.log('\x1b[31mERROR: You can\'t submit both parts at the same time!\x1b[0m');
        options.error = true;
    }

    if (!options.error) {
        switch (options.mode) {
            case 'FETCH':
                await fetchDay(options.day, options.year);
                console.log(`\x1b[33mCreated solution.js and fetched the input for day ${options.day}, year ${options.year}!\x1b[0m`);
                break;
            case 'GENERATE':
                await generateDay(options.day, options.year);
                console.log(`\x1b[33mCreated solution.js for day ${options.day}, year ${options.year}!\x1b[0m`);
                break;
            case 'HELP':
                printHelpMessage();
                break;
            case 'README':
                await generateREADME(options.day, options.year, options.inputmode);
                console.log(`\x1b[33mCreated README.js for day ${options.day}, year ${options.year}!\x1b[0m`);
                break;
            case 'RUN':
                const results = await runDay(options.day, options.year, options.part, options.inputmode);
                console.log(`\x1b[32m~~~~~~~~~~~~~~~~\x1b[31m Advent of Code ${options.year}, Day ${options.day} \x1b[32m~~~~~~~~~~~~~~~~\x1b[0m`);
                if (options.part == '1' || options.part == 'BOTH') console.log(`\x1b[33mPart 1: \x1b[30m\x1b[47m${results.part1.answer}\x1b[0m\t\t(${results.part1.time} ms)`);
                if (options.part == '2' || options.part == 'BOTH') console.log(`\x1b[33mPart 2: \x1b[30m\x1b[47m${results.part2.answer}\x1b[0m\t\t(${results.part2.time} ms)`);
                break;
            case 'SUBMIT':
                const outcome = await submitDay(options.day, options.year, options.part, options.inputmode);
                console.log(outcome.message);
                break;
            case 'WRITEUP':
                await generateWriteUp(options.day, options.year);
                console.log(`\x1b[33mCreated a write up for day ${options.day}, year ${options.year}!\x1b[0m`);
                break;
        }
    }
}

export { fetchDay, generateDay, generateREADME, runDay, submitDay, generateWriteUp };