/**
 * aoc/puzzles/2015/day17/solution.js
 * 
 * ~~ No Such Thing as Too Much ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

/**
 * gets all possible subsets of the array
 * 
 * @param {any[]} array array of elements
 * @returns {any[][]}
 */
const powerSet = (array) => {
    const subsets = [[]];

    for (const element of array) {
        const last = subsets.length - 1;
        for (let i = 0; i <= last; i++) {
            subsets.push([...subsets[i], element]);
        }
    }

    return subsets;
}


/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // find all combinations that add up to 150
    return powerSet(input.split(/\n/g).map(num => parseInt(num)))
        .filter(array => array.reduce((sum, num) => sum + num, 0) == 150)
        .length;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // find all combinations that add up to 150 and sort based on how many they use
    const allPossible = powerSet(input.split(/\n/g).map(num => parseInt(num)))
        .filter(array => array.reduce((sum, num) => sum + num, 0) == 150)
        .sort((a, b) => a.length - b.length);

    // find only the shortest possible
    return allPossible.filter(array => array.length == allPossible[0].length).length;
}

export { part1, part2 };