// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2015/day10/solution.ts
 * 
 * ~~ Elves Look, Elves Say ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    let currentString = input;
    for (let gen = 0; gen < 40; gen++) {
        let newString = '';
        let currentNumber = currentString[0], count = 1;
        for (let i = 1; i < currentString.length; i++) {
            if (currentString[i] != currentNumber) {
                newString += count + currentNumber;
                currentNumber = currentString[i];
                count = 1;
            } else {
                count++;
            }
        }
        currentString = newString + count + currentNumber;
    }
    return currentString.length;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let currentString = input;
    for (let gen = 0; gen < 50; gen++) {
        let newString = '';
        let currentNumber = currentString[0], count = 1;
        for (let i = 1; i < currentString.length; i++) {
            if (currentString[i] != currentNumber) {
                newString += count + currentNumber;
                currentNumber = currentString[i];
                count = 1;
            } else {
                count++;
            }
        }
        currentString = newString + count + currentNumber;
    }
    return currentString.length;
}

export { part1, part2 };