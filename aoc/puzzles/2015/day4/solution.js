/**
 * .advent-of-code/scripts/2015/day4/solution.js
 * 
 * ~~ The Ideal Stocking Stuffer ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/23/2023
 */

import crypto from 'crypto';

const common = {
    md5: input => crypto.createHash('md5').update(input).digest('hex')
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    let i = 0;

    while (true) {
        let hash = common.md5(input + i);
        if (hash.startsWith('00000')) break;
        i++;
    }

    return i;
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
        let hash = common.md5(input + i);
        if (hash.startsWith('000000')) break;
        i++;
    }

    return i;
}

export { part1, part2 };