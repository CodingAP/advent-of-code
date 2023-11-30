/**
 * aoc/puzzles/2020/day05/solution.js
 * 
 * ~~ Binary Boarding ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/30/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // parse input
    return input.split(/\n/g).reduce((max, line) => {
        return Math.max(max, parseInt(line.replace(/[BR]/g, '1').replace(/[FL]/g, '0'), 2));
    }, -Infinity);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // parse input
    let ids = input.split(/\n/g).map(line => {
        return parseInt(line.replace(/[BR]/g, '1').replace(/[FL]/g, '0'), 2);
    });

    // grab max from part 1
    const maxID = await part1(input);

    // find missing id
    for (let i = 80; i <= maxID; i++) {
        if (!ids.includes(i)) return i;
    }

    return -1;
}

export { part1, part2 };