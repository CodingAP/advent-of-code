import fs from 'fs/promises';
import fetch from 'node-fetch';
import { runDay } from './aoc.js';

const generateWriteUp = async (day, year) => {
    let response = await fetch(`https://adventofcode.com/${year}/day/${day}`);
    let text = await response.text();

    let title = [...text.matchAll(/<h2>\s*.*<\/h2>/g)][0][0].split(': ')[1].split(' ---')[0];

    let writeup = await fs.readFile('./scripts/writeup.md');
    writeup = writeup.toString().replace(/%year%/g, year).replace(/%day%/g, day).replace(/%title%/g, title);

    const directory = `./writeups/${year}/`;
    let exists = false;
    try {
        const stats = await fs.stat(directory);
        exists = stats.isDirectory();
    } catch (error) { }

    if (!exists) await fs.mkdir(directory, { recursive: true });

    await fs.writeFile(directory + `/day${day}_writeup.md`, writeup);
}

const generateREADMEs = async (day, year) => {
    let response = await fetch(`https://adventofcode.com/${year}/day/${day}`);
    let text = await response.text();

    let title = [...text.matchAll(/<h2>\s*.*<\/h2>/g)][0][0].split(': ')[1].split(' ---')[0];

    let results = await runDay(day, year, 'BOTH');

    let readme = await fs.readFile('./scripts/day_readme.md');
    readme = readme.toString()
        .replace(/%year%/g, year)
        .replace(/%day%/g, day)
        .replace(/%title%/g, title)
        .replace(/%part1%/g, results.part1.answer)
        .replace(/%part2%/g, results.part2.answer);

    const directory = `./profiles/github/${year}/day${day}`;
    let exists = false;
    try {
        const stats = await fs.stat(directory);
        exists = stats.isDirectory();
    } catch (error) { }

    if (!exists) await fs.mkdir(directory, { recursive: true });

    await fs.writeFile(directory + `/README.md`, readme);
}

for (let day = 2; day <= 25; day++) await generateREADMEs(day, 2015);