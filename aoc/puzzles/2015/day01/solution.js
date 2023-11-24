/**
 * .advent-of-code/scripts/2015/day1/solution.js
 * 
 * ~~ Not Quite Lisp ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    return input.split('').reduce((sum, char) => sum + ((char == '(') ? 1 : -1), 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    let floor = 0, first = -1;
    input.split('').forEach((char, index) => {
        floor += (char == '(') ? 1 : -1;
        if (floor < 0 && first == -1) first = index + 1;
    });
    return first;
}

export { part1, part2 };