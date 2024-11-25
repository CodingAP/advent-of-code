// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day14/solution.ts
 * 
 * ~~ One-Time Pad ~~
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
    let keys = [];
    let previousHashes = [];

    let getHash = (index) => {
        if (previousHashes[index]) return previousHashes[index];
        previousHashes[index] = md5(input + index);
        return previousHashes[index];
    }

    let find5Digits = (starting, digit) => {
        let findThis = digit.padStart(5, digit);

        for (let i = 1; i <= 1000; i++) {
            let hash = getHash(starting + i);
            if (hash.search(findThis) != -1) return true;
        }

        return false;
    }

    let index = 0;
    while (true) {
        let hash = getHash(index);
        let stringIndex = hash.search(/(.)\1\1/);
        if (stringIndex != -1 && find5Digits(index, hash.charAt(stringIndex))) keys.push(index);

        if (keys.length == 64) break;
        index++;
    }

    return keys[keys.length - 1];
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let keys = [];
    let previousHashes = [];

    let getHash = index => {
        if (previousHashes[index]) return previousHashes[index];
        let firstHash = md5(input + index);
        for (let i = 0; i < 2016; i++) firstHash = md5(firstHash);
        previousHashes[index] = firstHash;
        return previousHashes[index];
    }

    let find5Digits = (starting, digit) => {
        let findThis = digit.padStart(5, digit);

        for (let i = 1; i <= 1000; i++) {
            let hash = getHash(starting + i);
            if (hash.search(findThis) != -1) return true;
        }

        return false;
    }

    let index = 0;
    while (true) {
        let hash = getHash(index);
        let stringIndex = hash.search(/(.)\1\1/);
        if (stringIndex != -1 && find5Digits(index, hash.charAt(stringIndex))) keys.push(index);

        if (keys.length == 64) break;
        index++;
    }

    return keys[keys.length - 1];
}

export { part1, part2 };