/**
 * aoc/puzzles/2020/day10/solution.js
 * 
 * ~~ Adapter Array ~~
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
    // parse input and add starting and ending plug
    let plugs = input.split(/\n/g).map(num => parseInt(num)).sort((a, b) => a - b);
    plugs.push(plugs[plugs.length - 1] + 3);
    plugs.unshift(0);

    // count the differences between the sorted plugs
    let ones = 0;
    let threes = 0;
    for (let i = 0; i < plugs.length - 1; i++) {
        let diff = plugs[i + 1] - plugs[i];
        if (diff == 1) ones++;
        else threes++;
    }

    // multiply those differences
    return ones * threes;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // parse input and add starting and ending plug
    let plugs = input.split(/\n/g).map(num => parseInt(num)).sort((a, b) => a - b);
    plugs.push(plugs[plugs.length - 1] + 3);

    // find each group of increasing plugs (ex: 1, 2, 3; 6, 7, 8; 10, 11, 12)
    let groups = [];
    let currentGroup = [0];
    for (let i = 0; i < plugs.length; i++) {
        if (plugs[i] - currentGroup[currentGroup.length - 1] < 3) currentGroup.push(plugs[i]);
        else {
            groups.push(structuredClone(currentGroup));
            currentGroup = [plugs[i]];
        }
    }
    groups.push(structuredClone(currentGroup));

    // use the tribonacci numbers to find out how many ways to rearrange each group,
    // which can multiplied to find how all can be rearranged
    return groups.reduce((mul, group) => mul * [1, 1, 2, 4, 7][group.length - 1], 1);
}

export { part1, part2 };