// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2022/day6/solution.ts
 * 
 * ~~ Tuning Trouble ~~
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
    for (let i = 4; i < input.length; i++) {
        if (new Set(input.slice(i - 4, i).split('')).size == 4) return i;
    }
    return 0;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    for (let i = 14; i < input.length; i++) {
        if (new Set(input.slice(i - 14, i).split('')).size == 14) return i;
    }
}

export { part1, part2 };