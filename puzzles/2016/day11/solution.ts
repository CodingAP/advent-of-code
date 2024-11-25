// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day11/solution.ts
 * 
 * ~~ Radioisotope Thermoelectric Generators ~~
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
    let items = input.split('\n').reduce((array, line) => {
        let items = line.split('contains ')[1].replace(/a /g, '').split(/ and |, /);
        if (items[0].includes('nothing')) items = [];
        array.push(items.length);
        return array;
    }, []);

    let steps = 0;
    for (let i = 0; i < items.length - 1; i++) {
        steps += 2 * (items[i] - 1) - 1;
        items[i + 1] += items[i];
        items[i] = 0;
    }

    return steps;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let items = input.split('\n').reduce((array, line) => {
        let items = line.split('contains ')[1].replace(/a /g, '').split(/ and |, /);
        if (items[0].includes('nothing')) items = [];
        array.push(items.length);
        return array;
    }, []);
    items[0] += 4; // for the added items

    let steps = 0;
    for (let i = 0; i < items.length - 1; i++) {
        steps += 2 * (items[i] - 1) - 1;
        items[i + 1] += items[i];
        items[i] = 0;
    }

    return steps;
}

export { part1, part2 };