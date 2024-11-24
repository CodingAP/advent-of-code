/**
 * aoc/puzzles/2015/day12/solution.js
 * 
 * ~~ JSAbacusFramework.io ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

/**
 * Add all numbers in an object recursively
 * 
 * @param {Object} obj Object to add ups
 * @param {boolean} checkForRed Checks to see string "red" to stop counting
 * @returns {number}
 */
const addAll = (obj, checkForRed) => {
    let sum = 0;

    if (obj instanceof Array) {
        for (let i = 0; i < obj.length; i++) {
            sum += addAll(obj[i], checkForRed);
        }
    } else if (typeof obj == 'object') {
        const values = Object.values(obj);
        for (let value of values) {
            if (value == 'red' && checkForRed) return 0;
            else sum += addAll(value, checkForRed);
        }
    } else if (typeof obj == 'number') {
        sum += obj;
    }

    return sum;
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    return addAll(JSON.parse(input), false);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    return addAll(JSON.parse(input), true);
}

export { part1, part2 };