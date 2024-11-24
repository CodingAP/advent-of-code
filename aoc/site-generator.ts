/**
 * aoc/site-generator.ts
 *
 * this handles the site generation side of things for the advent of code manager
 *
 * by alex prosser
 * 11/23/2024
 */

import { GeneratorRoute, SingleRoute, SiteGenerator, STEVE } from '@codingap/steve';
import { join, resolve } from '@std/path';
import { getDatabase, getSolutionDirectory, getTitle, PuzzleAnswerEntry } from './aoc.ts';
import { exists } from '@std/fs';
import { Renderer } from '@libs/markdown';
import highlighting from '@libs/markdown/plugins/highlighting';
import { unescape } from '@std/html';

/**
 * base directory where all code is stored
 */
const baseDirectory = resolve('./');

/**
 * the current year for advent of code
 */
const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
let currentYear = currentDate.getFullYear();
if (currentMonth != 12) currentYear--;

/**
 * gets the information needed for generation
 *
 * @param day day of the puzzle to get
 * @param year year of the puzzle to get
 * @returns needed info for generation or null if the puzzle doesn't exist
 */
const getPuzzleInfo = async (day: string, year: string): Promise<{ title: string; stars: number } | null> => {
    const title = await getTitle(day, year);

    if (title === 'no title available!') return null;

    const database = getDatabase();

    const rows = database.prepare(
        `select part from puzzle_answers where day = ? and year = ? and result = 1`,
    ).all(day, year);

    let stars = 0;
    if (rows.length != 0) {
        for (let i = 0; i < rows.length; i++) {
            if ((rows[i] as PuzzleAnswerEntry).part == '1') stars++;
            if ((rows[i] as PuzzleAnswerEntry).part == '2') stars++;
        }
    }

    database.close();

    return { title, stars };
};

/**
 * generates a visualization for the puzzle specified
 *
 * @param day day of the puzzle to be writen up
 * @param year year of the puzzle to be writen up
 * @returns if there was an error or not
 */
const generateVisualization = async (day: string, year: string): Promise<{ error: boolean; message?: string }> => {
    const solutionDirectory = getSolutionDirectory(day, year);
    const directoryExists = await exists(solutionDirectory);

    // run the needed parts with the input in the directory
    if (!directoryExists) {
        return {
            error: true,
            message: `this puzzle hasn't been generated yet! run 'fetch --day=${day} --year=${year}' first!`,
        };
    }

    const visualization = STEVE.renderFile(join(baseDirectory, 'templates/visualization.html'), { day, year });

    await Deno.writeTextFile(join(solutionDirectory, 'visualization.html'), visualization);

    return { error: false };
};

/**
 * generates the website and loads all writeups/visualizations
 *
 * @param debug tells whether it is localhost or not
 */
const generateSite = async (debug: boolean) => {
    // load all steve files
    STEVE.includeDirectory = join(baseDirectory, 'templates/includes');
    STEVE.addPlugin(
        new SiteGenerator({
            staticDirectory: join(baseDirectory, 'static'),
            outputDirectory: '../',
            ignoredFiles: ['aoc', 'puzzles', 'README.md'],
            showExtension: false,
        }),
    );

    // create puzzles, writeups, and visualizations
    const puzzles: { [key: number]: ({ title: string; stars: number } | null)[] } = {};
    const writeups = [], visualizations = [];

    // find all puzzles/writeups/visualizations available
    const available: { [key: number]: { puzzle: boolean; code: boolean; writeup: boolean; visualization: boolean }[] } = {};
    for (let year = 2015; year <= currentYear; year++) {
        available[year] = [];
        puzzles[year] = [];
        for (let day = 1; day <= 25; day++) {
            available[year][day - 1] = { puzzle: false, code: false, writeup: false, visualization: false };
            puzzles[year][day - 1] = await getPuzzleInfo(day.toString(), year.toString());
            const solutionDirectory = getSolutionDirectory(day.toString(), year.toString());

            // check to see if puzzle exists
            if (puzzles[year][day - 1] !== null) {
                available[year][day - 1].puzzle = true;

                // check to see if source code exists
                if (await exists(solutionDirectory)) {
                    available[year][day - 1].code = true;

                    // check to see if a writeup exists
                    if (await exists(join(solutionDirectory, 'README.md'))) {
                        const content = (await Deno.readTextFile(join(solutionDirectory, 'README.md'))).split('%%%');
                        if (content[1] !== undefined) {
                            available[year][day - 1].writeup = true;

                            const customRenderer = new Renderer({ plugins: [highlighting] });
                            const rendered = unescape(
                                await customRenderer.render(content[1]),
                            );
                            writeups.push({
                                name: `${year}.day${day.toString().padStart(2, '0')}`,
                                data: { day, year, title: puzzles[year][day - 1]?.title, content: rendered },
                            });
                        }
                    }

                    // check to see if a visualization exists
                    if (await exists(join(solutionDirectory, 'visualization.html'))) {
                        available[year][day - 1].visualization = true;

                        const content = await Deno.readTextFile(join(solutionDirectory, 'visualization.html'));
                        visualizations.push({
                            name: `${year}.day${day.toString().padStart(2, '0')}`,
                            data: { content: STEVE.render(content, { debug: debug }) },
                        });
                    }
                }
            }
        }
    }

    STEVE.generate({
        root: new SingleRoute({
            render: join(baseDirectory, 'templates/main.html'),
            data: { puzzles, available, currentYear, debug },
            isFile: true,
        }),
        writeups: new GeneratorRoute({
            render: join(baseDirectory, 'templates/writeup.html'),
            data: { debug },
            isFile: true,
            generator: writeups,
        }),
        visualizations: new GeneratorRoute({
            render: '<steve> return steve.data.content; </steve>',
            data: { debug },
            isFile: false,
            generator: visualizations,
        }),
    });
};

// if ran off the command line, generate the website based off the debug flag
if (import.meta.main) {
    const DEBUG = Deno.args[0] === 'debug';

    generateSite(DEBUG).then(() => {
        console.log('generated site!');
    });
}

export { generateSite, generateVisualization };
