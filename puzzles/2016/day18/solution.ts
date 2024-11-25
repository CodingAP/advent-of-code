// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day18/solution.ts
 * 
 * ~~ Like a Rogue ~~
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
    let total = input.split('').filter(element => element == '.').length;
    let line = input;
    let isTrap = ['^^.', '.^^', '^..', '..^'];

    for (let row = 0; row < (40 - 1); row++) {
        let newRow = '';
        for (let i = 0; i < line.length; i++) {
            let trap = (line[i - 1] || '.') + line[i] + (line[i + 1] || '.');
            newRow += (isTrap.includes(trap)) ? '^' : '.';
        }
        line = newRow;
        total += line.split('').filter(element => element == '.').length;
    }
    return total;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let total = input.split('').filter(element => element == '.').length;
    let line = input;
    let isTrap = ['^^.', '.^^', '^..', '..^'];

    for (let row = 0; row < (400000 - 1); row++) {
        let newRow = '';
        for (let i = 0; i < line.length; i++) {
            let trap = (line[i - 1] || '.') + line[i] + (line[i + 1] || '.');
            newRow += (isTrap.includes(trap)) ? '^' : '.';
        }
        line = newRow;
        total += line.split('').filter(element => element == '.').length;
    }
    return total;
}

export { part1, part2 };