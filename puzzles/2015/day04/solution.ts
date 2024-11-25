// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2015/day04/solution.ts
 * 
 * ~~ The Ideal Stocking Stuffer ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

import { crypto } from '@std/crypto';

/**
 * returns an md5 hash for the given string.
 *
 * @param {string} content - the string to hash.
 * @returns {string} the md5 hash of the input string in hexadecimal format.
 */
const md5 = (content) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = crypto.subtle.digestSync('md5', data);
    return Array.from(new Uint8Array(hashBuffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
};

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
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
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let i = 0;
    while (true) {
        if (md5(input + i).startsWith('000000')) return i;
        i++;
    }
}

export { part1, part2 };