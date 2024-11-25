// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day7/solution.ts
 * 
 * ~~ Internet Protocol Version 7 ~~
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
    return input.split('\n').reduce((acc, line) => {
        let parts = line.split(/[\[\]]/g);
        let inSquare = false, outside = false;
        for (let j = 0; j < parts.length; j++) {
            let string = parts[j].match(/(\w)(\w)\2\1/);

            if (string && string[0].charAt(0) != string[0].charAt(1)) {
                if (j % 2 == 1) inSquare = true;
                else outside = true;
            }
        }
        if (outside && !inSquare) acc++;
        return acc;
    }, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    return input.split('\n').reduce((acc, line) => {
        let parts = line.split(/[\[\]]/g);
        let square = [], outside = [];
        for (let j = 0; j < parts.length; j++) {
            let strings = Array.from(parts[j].matchAll(/(?=((\w)(\w)\2))/g), iter => iter[1]);

            for (let k = 0; k < strings.length; k++) {
                if (strings[k].charAt(0) != strings[k].charAt(1)) {
                    if (j % 2 == 1) square.push(strings[k]);
                    else outside.push(strings[k]);
                }
            }
        }

        let matching = false;
        for (let j = 0; j < square.length; j++) {
            for (let k = 0; k < outside.length; k++) {
                if (square[j].charAt(0) == outside[k].charAt(1) && square[j].charAt(1) == outside[k].charAt(0)) matching = true;
            }
        }

        if (matching) acc++;
        return acc;
    }, 0);
}

export { part1, part2 };