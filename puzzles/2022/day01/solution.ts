// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2022/day1/solution.ts
 * 
 * ~~ Calorie Counting ~~
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
    let calories = input.split('\n\n').reduce((max, element) => {
        let allCalories = element.split('\n').reduce((acc, num) => acc + parseInt(num), 0);
        return Math.max(max, allCalories);
    }, -Infinity);
    return calories;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let allElves = input.split('\n\n').map(element => {
        return element.split('\n').reduce((acc, num) => acc + parseInt(num), 0);
    }).sort((a, b) => b - a);

    return allElves[0] + allElves[1] + allElves[2];
}

export { part1, part2 };