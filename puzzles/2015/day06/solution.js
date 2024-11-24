/**
 * aoc/puzzles/2015/day06/solution.js
 * 
 * ~~ Probably a Fire Hazard ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    let size = 1000;
    let grid = new Array(size * size).fill(false);

    input.split(/\n/g).forEach(instruction => {
        let tokens = instruction.split(' ');
        let [startX, startY] = tokens[(tokens[0] == 'toggle') ? 1 : 2].split(',').map(num => parseInt(num));
        let [endX, endY] = tokens[(tokens[0] == 'toggle') ? 3 : 4].split(',').map(num => parseInt(num));
        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                grid[y * size + x] = (tokens[0] == 'toggle') ? !grid[y * size + x] : (tokens[1] == 'on');
            }
        }
    });

    return grid.filter(space => space).length;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    let size = 1000;
    let grid = new Array(size * size).fill(0);

    input.split(/\n/g).forEach(instruction => {
        let tokens = instruction.split(' ');
        let [startX, startY] = tokens[(tokens[0] == 'toggle') ? 1 : 2].split(',').map(num => parseInt(num));
        let [endX, endY] = tokens[(tokens[0] == 'toggle') ? 3 : 4].split(',').map(num => parseInt(num));
        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                grid[y * size + x] += (tokens[0] == 'toggle') ? 2 : ((tokens[1] == 'on') ? 1 : -1);
                grid[y * size + x] = Math.max(0, grid[y * size + x]);
            }
        }
    });

    return grid.reduce((sum, space) => sum + space, 0);
}

export { part1, part2 };