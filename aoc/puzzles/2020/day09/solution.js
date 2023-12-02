/**
 * aoc/puzzles/2020/day09/solution.js
 * 
 * ~~ Encoding Error ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/1/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // parse input
    const numbers = input.split(/\n/g).map(num => parseInt(num));

    // find first number that doesn't follow the rules given in the prose
    const preambleLength = 25;
    for (let i = preambleLength; i < numbers.length; i++) {
        let others = numbers.slice(i - preambleLength, i);
        let foundPair = false;
        for (let j = 0; j < preambleLength; j++) {
            if (others.indexOf(numbers[i] - others[j]) != -1 && others.indexOf(numbers[i] - others[j]) != j) foundPair = true;
        }
        if (!foundPair) return numbers[i];
    }
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // parse input
    const numbers = input.split(/\n/g).map(num => parseInt(num));
    const target = await part1(input);

    // find shortest continous range that add to part 1 answer and add smallest and largest of that range
    for (let size = 2; size < numbers.length; size++) {
        for (let i = size; i < numbers.length; i++) {
            let others = numbers.slice(i - size, i).sort((a, b) => a - b);
            if (others.reduce((sum, num) => sum + num, 0) == target) return others[0] + others[others.length - 1];
        }
    }
}

export { part1, part2 };