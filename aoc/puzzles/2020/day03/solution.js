/**
 * aoc/puzzles/2020/day03/solution.js
 * 
 * ~~ Toboggan Trajectory ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/30/2023
 */

/**
 * check how many trees we are colliding with given a velocity
 * 
 * @param {boolean[][]} trees grid of trees (tree = true, no tree = false) 
 * @param {{ x: number, y: number }} velocity how fast we are moving in each direction
 * @returns {number}
 */
const runTreeSimulation = (trees, velocity) => {
    let result = 0;
    let position = { x: 0, y: 0 };
    while (position.y < trees.length) {
        if (trees[position.y][position.x]) result++;

        position.x = (position.x + velocity.x) % trees[position.y].length;
        position.y += velocity.y;
    }
    return result;
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // parse input
    const trees = input.split(/\n/g).map(line => line.split('').map(character => character == '#'));
    
    return runTreeSimulation(trees, { x: 3, y: 1 });
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // parse input
    const trees = input.split(/\n/g).map(line => line.split('').map(character => character == '#'));

    // try all velocities and multiply the results together
    return [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 }, { x: 7, y: 1 }, { x: 1, y: 2 }].reduce((mul, vel) => {
        return mul * runTreeSimulation(trees, vel);
    }, 1);
}

export { part1, part2 };