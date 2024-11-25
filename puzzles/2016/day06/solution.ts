// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day6/solution.ts
 * 
 * ~~ Signals and Noise ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    let codes = input.split('\n');

    let word = '';
    for (let i = 0; i < codes[0].length; i++) {
        let characters = {};
        for (let j = 0; j < codes.length; j++) {
            let character = codes[j][i];
            if (characters[character] == null) characters[character] = 0;
            characters[character]++;
        }

        let entries = Object.entries(characters);
        word += entries.reduce((highest, character) => {
            if (character[1] > highest[1]) return character;
            return highest;
        }, entries[0])[0];
    }
    return word;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let codes = input.split('\n');

    let word = '';
    for (let i = 0; i < codes[0].length; i++) {
        let characters = {};
        for (let j = 0; j < codes.length; j++) {
            let character = codes[j][i];
            if (characters[character] == null) characters[character] = 0;
            characters[character]++;
        }

        let entries = Object.entries(characters);
        word += entries.reduce((lowest, character) => {
            if (character[1] < lowest[1]) return character;
            return lowest;
        }, entries[0])[0];
    }
    return word;
}

export { part1, part2 };