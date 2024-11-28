import { join, resolve } from '@std/path';
import { getTitle, profilePuzzle, runPuzzle, submitAnswer, updatePuzzle } from './aoc.ts';
import { STEVE } from '@codingap/steve';

const year = '2021';

const baseDirectory = resolve('../puzzles');

const getComment = async (day: string, year: string) => {
    const title = await getTitle(day, year);

    return `// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/${year}/day${day}/solution.ts
 * 
 * ~~ ${title} ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
 */
`;
};

const part1Comment = `/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {`;

const part2Comment = `/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {`;

for (let i = 20; i <= 21; i++) {
    const solutionDirectory = join(baseDirectory, year, `day${i.toString().padStart(2, '0')}`);
    console.log('day', i, year);

    // await Deno.remove(join(solutionDirectory, 'README.md'));
    // await Deno.remove(join(solutionDirectory, 'input.txt'));
    await Deno.remove(join(solutionDirectory, 'part1.js'));
    await Deno.remove(join(solutionDirectory, 'part2.js'));

    // await updatePuzzle(i.toString(), year);
    // const response = await runPuzzle(i.toString(), year, 'both');
    // console.log(response.part1);
    // console.log(response.part2);

    await profilePuzzle(i.toString(), year, '10');
    await submitAnswer(i.toString(), year, 'both', 'true');

    // let part1 = (await Deno.readTextFile(join(solutionDirectory, 'part1.js'))).replace(/\r/g, '').split('\n');
    // let script1 = '';
    // let inScript1 = false;
    // for (let i = 0; i < part1.length; i++) {
    //     if (part1[i] === '}') inScript1 = false;
    //     if (inScript1) script1 += part1[i] + '\n';
    //     if (part1[i].includes('module.exports = input => {')) inScript1 = true;
    // }

    // let part2 = (await Deno.readTextFile(join(solutionDirectory, 'part2.js'))).replace(/\r/g, '').split('\n');
    // let script2 = '';
    // let inScript2 = false;
    // for (let i = 0; i < part2.length; i++) {
    //     if (part2[i] === '}') inScript2 = false;
    //     if (inScript2) script2 += part2[i] + '\n';
    //     if (part2[i].includes('module.exports = input => {')) inScript2 = true;
    // }

    // const script = STEVE.renderFile('templates/solution_temp.ts', { day: i.toString(), year, part1: script1.trimEnd(), part2: script2.trimEnd(), title: await getTitle(i.toString(), year) });

    // let script = await Deno.readTextFile(join(solutionDirectory, 'solution.js'));
    // script = script.replace(/async /g, '');
    // script = script.replace(/const part1 = input => {/g, part1Comment);
    // script = script.replace(/const part2 = input => {/g, part2Comment);
    // const lines = script.replace(/\r/g, '').split('\n');
    // const commentLines = await getComment(i.toString(), year);

    // commentLines.split('\n').reverse().forEach(line => lines.unshift(line));

    // await Deno.writeTextFile(join(baseDirectory, year, `day${i.toString().padStart(2, '0')}`, 'solution.ts'), script);
    // await Deno.remove(join(baseDirectory, year, `day${i.toString().padStart(2, '0')}`, 'solution.js'))
}
