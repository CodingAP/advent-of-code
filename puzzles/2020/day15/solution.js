/**
 * aoc/puzzles/2020/day15/solution.js
 * 
 * ~~ Rambunctious Recitation ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/24/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // allocate memory beforehand and put numbers from input in array
    let lastSpoken = new Array(2020);
    input.split(/,/g).forEach((num, index) => lastSpoken[num] = index + 1);

    // do 2020 turns of the rules to find the number said
    let lastNum = 0;
    for (let i = lastSpoken.filter(num => num).length + 1; i < lastSpoken.length; i++) {
        let newNum = 0;
        if (lastSpoken[lastNum] != null) newNum = i - lastSpoken[lastNum];

        lastSpoken[lastNum] = i;
        lastNum = newNum;
    }

    return lastNum;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // allocate memory beforehand and put numbers from input in array
    let lastSpoken = new Array(30000000);
    input.split(/,/g).forEach((num, index) => lastSpoken[num] = index + 1);

    // do 30000000 turns of the rules to find the number said
    let lastNum = 0;
    for (let i = lastSpoken.filter(num => num).length + 1; i < lastSpoken.length; i++) {
        let newNum = 0;
        if (lastSpoken[lastNum] != null) newNum = i - lastSpoken[lastNum];

        lastSpoken[lastNum] = i;
        lastNum = newNum;
    }

    return lastNum;
}

export { part1, part2 };