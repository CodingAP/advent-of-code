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

    let ones = 0;
    let threes = 0;
    for (let i = 0; i < plugs.length - 1; i++) {
        let diff = plugs[i + 1] - plugs[i];
        if (diff == 1) ones++;
        else threes++;
    }

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
    plugs.unshift(0);

    /**
     * counts all possible plug combinations
     * 
     * @param {number} starting plug we are counting from
     * @returns {number} 
     */
    const countConnections = starting => {
        let count = 1;
        for (let i = 1; i <= 3; i++) {
            if (plugs.includes(starting + i)) count += countConnections(starting + i);
        }
        console.log(starting, count);
        return count;
    }

    return countConnections(0);
}

export { part1, part2 };