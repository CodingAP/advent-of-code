// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day5/solution.ts
 * 
 * ~~ How About a Nice Game of Chess? ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
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
    let password = '';
    let i = 0;
    while (password.length != 8) {
        let encrypted = md5(input + i);
        if (encrypted.startsWith('00000')) password += encrypted[5];
        i++;
    }
    return password;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let password = new Array(8).fill(null);
    let i = 0;
    while (password.filter(element => element != null).length != 8) {
        let encrypted = md5(input + i);
        if (encrypted.startsWith('00000')) {
            let position = parseInt(encrypted[5], 16);
            if (position >= 0 && position < 8 && password[position] == null) password[position] = encrypted[6];
        }
        i++;
    }
    return password.join('');
}

export { part1, part2 };