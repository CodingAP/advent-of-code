/**
 * aoc/puzzles/2015/day02/solution.js
 * 
 * ~~ I Was Told There Would Be No Math ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    return input.split(/\n/g).reduce((sum, dimensions) => {
        let [l, w, h] = dimensions.split(/x/g).map(num => parseInt(num)).sort((a, b) => a - b);
        let surfaceArea = 2 * l * w + 2 * w * h + 2 * h * l;
        let extra = l * w;
        return sum + surfaceArea + extra;
    }, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    return input.split(/\n/g).reduce((sum, dimensions) => {
        let [l, w, h] = dimensions.split(/x/g).map(num => parseInt(num)).sort((a, b) => a - b);
        let perimeter = 2 * l + 2 * w;
        let extra = l * w * h;
        return sum + perimeter + extra;
    }, 0);
}

export { part1, part2 };