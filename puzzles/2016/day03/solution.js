/**
 * aoc/puzzles/2016/day03/solution.js
 * 
 * ~~ Squares With Three Sides ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/6/2024
 */

/**
 * parse string to list of numbers to be processed as triangles
 * @param {string} line line from input
 */
const parseNumbers = line => {
    return line.trim().replace(/\s+/g, ' ').split(' ').map(num => parseInt(num));
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    return input.replace(/\r/g, '').split('\n').reduce((sum, line) => {
        const triangle = parseNumbers(line).sort((a, b) => a - b);
        return sum + (triangle[0] + triangle[1] > triangle[2]);
    }, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    let sum = 0;
    const lines = input.replace(/\r/g, '').split('\n');

    for (let i = 0; i < lines.length; i += 3) {
        const row1 = parseNumbers(lines[i]);
        const row2 = parseNumbers(lines[i + 1]);
        const row3 = parseNumbers(lines[i + 2]);

        const triangle1 = [row1[0], row2[0], row3[0]].sort((a, b) => a - b);
        const triangle2 = [row1[1], row2[1], row3[1]].sort((a, b) => a - b);
        const triangle3 = [row1[2], row2[2], row3[2]].sort((a, b) => a - b);
        
        sum += (triangle1[0] + triangle1[1] > triangle1[2]);
        sum += (triangle2[0] + triangle2[1] > triangle2[2]);
        sum += (triangle3[0] + triangle3[1] > triangle3[2]);
    }
    return sum;
}

export { part1, part2 };