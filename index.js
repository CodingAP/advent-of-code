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

for (let day = 1; day <= 25; day++) {
    let results = await runDay(day, 2015, 'BOTH');
    console.log(`Year 2015, Day ${day}: Part 1 - ${results.part1.answer} | Part 2 - ${results.part2.answer}`);
}
