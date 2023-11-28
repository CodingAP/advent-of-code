/**
 * aoc/puzzles/2015/day18/solution.js
 * 
 * ~~ Like a GIF For Your Yard ~~
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
    // parse input
    const size = 100;
    let grid = input.split(/\n/g).map(line => line.split('').map(character => character == '#'));
    
    // run conways game of life 100 times
    for (let step = 0; step < 100; step++) {
        let newGrid = new Array(size).fill(0).map(_ => new Array(size).fill(false));
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                let neighbors = 0;
                for (let j = -1; j <= 1; j++) {
                    for (let i = -1; i <= 1; i++) {
                        if (i == 0 && j == 0) continue;

                        if (x + i >= 0 && x + i < size && y + j >= 0 && y + j < size) neighbors += (grid[y + j][x + i] ? 1 : 0);
                    }
                }

                if (grid[y][x]) newGrid[y][x] = (neighbors == 2 || neighbors == 3);
                else newGrid[y][x] = (neighbors == 3);
            }
        }
        grid = newGrid;
    }

    // count how many are on
    return grid.flat().filter(light => light).length;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // parse input
    const size = 100;
    let grid = input.split(/\n/g).map(line => line.split('').map(character => character == '#'));

    // run conways game of life 100 times
    for (let step = 0; step < 100; step++) {
        let newGrid = new Array(size).fill(0).map(_ => new Array(size).fill(false));
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                let neighbors = 0;
                for (let j = -1; j <= 1; j++) {
                    for (let i = -1; i <= 1; i++) {
                        if (i == 0 && j == 0) continue;

                        if (x + i >= 0 && x + i < size && y + j >= 0 && y + j < size) neighbors += (grid[y + j][x + i] ? 1 : 0);
                    }
                }

                if (grid[y][x]) newGrid[y][x] = (neighbors == 2 || neighbors == 3);
                else newGrid[y][x] = (neighbors == 3);
            }
        }
        grid = newGrid;

        // set corners to always on
        grid[0][0] = true;
        grid[0][size - 1] = true;
        grid[size - 1][0] = true;
        grid[size - 1][size - 1] = true;
    }

    // count how many are on
    return grid.flat().filter(light => light).length;
}

export { part1, part2 };