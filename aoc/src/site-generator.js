/**
 * advent-of-code/src/site-generator.js
 * 
 * this handles the site generation side of things for the advent of code manager
 * 
 * by alex prosser
 * 10/12/2024
 */

import { STEVE, SiteGenerator, SingleRoute, GeneratorRoute } from 'steve-template-engine';
import { marked } from 'marked';
import fs from 'node:fs/promises';
import path from 'node:path';
import 'dotenv/config';

import * as aoc from './aoc.js';

/**
 * base directory where all code is stored
 */
const baseDirectory = path.resolve('./aoc');

/**
 * the current year for advent of code
 */
const currentYear = 2023;

/**
 * whether or not the source is localhost or the actual website
 */
const DEBUG = false;

/**
 * generates a writeup for the puzzle specified
 * 
 * @param {string} day day of the puzzle to be writen up
 * @param {string} year year of the puzzle to be writen up
 * @returns {Promise<aoc.PuzzleRunResult>}
 */
const generateWriteup = async (day, year) => {
    // if directory doesn't exist, throw error
    let exists = await aoc.checkForExistance(path.join(baseDirectory, 'puzzles', year, `day${day.padStart(2, '0')}`));

    if (!exists) {
        return { error: true, message: `this puzzle hasn't been generated yet! run 'fetch --day=${day} --year=${year}' first!` };
    }

    // create year folder is it doesn't exist
    let yearExists = await aoc.checkForExistance(path.join(baseDirectory, 'writeups', year));
    if (!yearExists) {
        await fs.mkdir(path.join(baseDirectory, 'writeups', year), { recursive: true });
    }

    await fs.writeFile(path.join(baseDirectory, 'writeups', year, `day${day.padStart(2, '0')}.md`), 'Please write some content here!');

    return { error: false };
}

/**
 * generates a visualization for the puzzle specified
 * 
 * @param {string} day day of the puzzle to be writen up
 * @param {string} year year of the puzzle to be writen up
 * @returns {Promise<aoc.PuzzleRunResult>}
 */
const generateVisualization = async (day, year) => {
    // if directory doesn't exist, throw error
    let exists = await aoc.checkForExistance(path.join(baseDirectory, 'puzzles', year, `day${day.padStart(2, '0')}`));

    if (!exists) {
        return { error: true, message: `this puzzle hasn't been generated yet! run 'fetch --day=${day} --year=${year}' first!` };
    }

    // create the year folder if it doesn't exist
    let yearExists = await aoc.checkForExistance(path.join(baseDirectory, 'visualizations', year));
    if (!yearExists) {
        await fs.mkdir(path.join(baseDirectory, 'visualizations', year), { recursive: true });
    }

    await fs.writeFile(path.join(baseDirectory, 'visualizations', year, `day${day.padStart(2, '0')}.html`), STEVE.renderFile(path.join(baseDirectory, 'src/steve/visualization.steve'), { day, year }));

    return { error: false };
}

/**
 * generates the website and loads all writeups/visualizations
 * 
 * @returns {Promise<void>}
 */
const generateSite = async () => {
    // load all steve files
    STEVE.includeDirectory = path.join(baseDirectory, 'src/steve/includes');
    STEVE.addPlugin(new SiteGenerator({
        staticDirectory: path.join(baseDirectory, 'src/static'),
        outputDirectory: './',
        ignoredFiles: ['aoc', 'README.md'],
        showExtension: false
    }));

    // load all puzzles info
    const puzzles = JSON.parse(await fs.readFile(path.join(baseDirectory, 'src/puzzles.json'), { encoding: 'utf-8' }));

    // create writeups and visualization routes
    let writeups = [], visualizations = [];

    // find all puzzles/writeups/visualizations available
    const available = {};
    for (let year = 2015; year <= currentYear; year++) {
        available[year] = [];
        for (let day = 1; day <= 25; day++) {
            available[year][day - 1] = { puzzle: false, code: false, writeup: false, visualization: false };

            // check to see if puzzle exists
            if (puzzles[year][day - 1] != null) {
                available[year][day - 1].puzzle = true;
            }

            // check to see if source code exists
            if (await aoc.checkForExistance(path.join(baseDirectory, 'puzzles', year.toString(), `day${day.toString().padStart(2, '0')}`))) {
                available[year][day - 1].code = true;
            }

            // check to see if a writeup exists
            if (await aoc.checkForExistance(path.join(baseDirectory, 'writeups', year.toString(), `day${day.toString().padStart(2, '0')}.md`))) {
                available[year][day - 1].writeup = true;

                const content = await fs.readFile(path.join(baseDirectory, 'writeups', year.toString(), `day${day.toString().padStart(2, '0')}.md`), { encoding: 'utf-8' });
                writeups.push({ name: `${year}.day${day.toString().padStart(2, '0')}`, data: { day, year, title: puzzles[year][day - 1].title, content: marked.parse(content) } });
            }

            // check to see if a visualization exists
            if (await aoc.checkForExistance(path.join(baseDirectory, 'visualizations', year.toString(), `day${day.toString().padStart(2, '0')}.html`))) {
                available[year][day - 1].visualization = true;

                const content = await fs.readFile(path.join(baseDirectory, 'visualizations', year.toString(), `day${day.toString().padStart(2, '0')}.html`), { encoding: 'utf-8' });
                visualizations.push({ name: `${year}.day${day.toString().padStart(2, '0')}`, data: { content: STEVE.render(content, { debug: DEBUG }) } });
            }
        }
    }

    STEVE.generate({
        root: new SingleRoute({
            render: path.join(baseDirectory, 'src/steve/main.steve'),
            data: { puzzles: puzzles, available: available, currentYear: currentYear, debug: DEBUG },
            isFile: true
        }),
        writeups: new GeneratorRoute({
            render: path.join(baseDirectory, 'src/steve/writeup.steve'),
            data: { debug: DEBUG },
            isFile: true,
            generator: writeups
        }),
        visualizations: new GeneratorRoute({
            render: '<steve> return Steve.data.content; </steve>',
            data: { debug: DEBUG },
            isFile: false,
            generator: visualizations
        })
    });
}

export { generateVisualization, generateWriteup, generateSite };