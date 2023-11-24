/**
 * .advent-of-code/scripts/2015/day1/solution.js
 * 
 * ~~ Not Quite Lisp ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/23/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    let floor = 0;
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) == '(') floor++;
        if (input.charAt(i) == ')') floor--;
    }
    return floor;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    let floor = 0;
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) == '(') floor++;
        if (input.charAt(i) == ')') floor--;
        if (floor < 0) return i + 1;
    }
    return -1;
}

export { part1, part2 };