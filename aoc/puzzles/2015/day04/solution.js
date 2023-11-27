/**
 * aoc/puzzles/2015/day04/solution.js
 * 
 * ~~ The Ideal Stocking Stuffer ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

import { createHash } from 'node:crypto';

/**
 * Returns an MD5 hash for the given `content`.
 *
 * @param {string} content
 * @returns {string}
 */
const md5 = plaintext => createHash('md5').update(plaintext).digest('hex');

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    let i = 0;
    while (true) {
        if (md5(input + i).startsWith('00000')) return i;
        i++;
    }
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    let i = 0;
    while (true) {
        if (md5(input + i).startsWith('000000')) return i;
        i++;
    }
}

export { part1, part2 };