/**
 * aoc/puzzles/2020/day01/solution.js
 * 
 * ~~ Report Repair ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/29/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    const numbers = input.split(/\n/g).map(num => parseInt(num));

    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if (i == j) continue;

            if (numbers[i] + numbers[j] == 2020) return numbers[i] * numbers[j];
        }
    }
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    const numbers = input.split(/\n/g).map(num => parseInt(num));

    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            for (let k = 0; k < numbers.length; k++) {
                if (i == j && i == k) continue;

                if (numbers[i] + numbers[j] + numbers[k] == 2020) return numbers[i] * numbers[j] * numbers[k];
            }
        }
    }
}

export { part1, part2 };