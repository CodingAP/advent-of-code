/**
 * aoc/puzzles/2016/day05/solution.js
 * 
 * ~~ How About a Nice Game of Chess? ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/6/2024
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
    let password = '';
    let i = 0;

    while (password.length != 8) {
        // generate md5 hash
        const hash = md5(input + i);
        if (hash.startsWith('00000')) password += hash[5];
        i++;
    }

    return password;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    let password = new Array(8).fill(-1);
    let i = 0;

    while (!password.every(num => num != -1)) {
        // generate md5 hash
        const hash = md5(input + i);
        if (hash.startsWith('00000')) {
            const position = parseInt(hash[5], 16);
            if (position >= 0 && position <= 7 && password[position] == -1) password[position] = hash[6];
        }
        i++;
    }

    return password.join('');
}

export { part1, part2 };