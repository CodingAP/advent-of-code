/**
 * advent-of-code/src/site-generator.js
 * 
 * this handles the site generation side of things for the advent of code manager
 * 
 * by alex prosser
 * 11/23/2023
 */

import { STEVE, SiteGenerator, SingleRoute } from 'steve-template-engine';
import fs from 'node:fs/promises';
import path from 'node:path';
import 'dotenv/config';

/**
 * Base directory where all code is stored
 */
const baseDirectory = path.resolve('./aoc');

/**
 * Generates the website and loads all writeups/visualizations
 * 
 * @returns {Promise<void>}
 */
const generateSite = async () => {
    // load all puzzle titles
    const titles = JSON.parse(await fs.readFile(path.join(baseDirectory, 'src/titles.json'), { encoding: 'utf-8' }));

    STEVE.includeDirectory = path.join(baseDirectory, 'src/steve/includes');
    STEVE.addPlugin(new SiteGenerator({
        staticDirectory: path.join(baseDirectory, 'src/static'),
        outputDirectory: './',
        ignoredFiles: ['aoc', 'README.md'],
        showExtension: false
    }));

    STEVE.generate({
        root: new SingleRoute({
            render: path.join(baseDirectory, 'src/steve/main.steve'),
            data: { titles: titles, currentYear: 2023 },
            isFile: true
        })
    });
}

export { generateSite };