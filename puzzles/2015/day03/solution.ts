// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2015/day03/solution.ts
 * 
 * ~~ Perfectly Spherical Houses in a Vacuum ~~
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
    let santa = { x: 0, y: 0 };
    let houses = new Set();

    for (let i = 0; i < input.length; i++) {
        if (input[i] == '^') santa.y++;
        if (input[i] == '>') santa.x++;
        if (input[i] == 'v') santa.y--;
        if (input[i] == '<') santa.x--;

        houses.add(`${santa.x},${santa.y}`);
    }

    return houses.size;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let santa = { x: 0, y: 0 }, robot = { x: 0, y: 0 };
    let houses = new Set();

    for (let i = 0; i < input.length; i++) {
        let current = (i % 2 == 0) ? santa : robot;
        
        if (input[i] == '^') current.y++;
        if (input[i] == '>') current.x++;
        if (input[i] == 'v') current.y--;
        if (input[i] == '<') current.x--;

        houses.add(`${current.x},${current.y}`);
    }

    return houses.size;
}

export { part1, part2 };