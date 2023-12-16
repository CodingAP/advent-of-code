/**
 * aoc/puzzles/2023/day14/solution.js
 * 
 * ~~ Parabolic Reflector Dish ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/13/2023
 */

const directions = { NORTH: 0, EAST: 1, SOUTH: 2, WEST: 3 };

const slideGrid = (grid, direction) => {
    if (direction == directions.NORTH) {
        for (let x = 0; x < grid[0].length; x++) {
            for (let y = 0; y < grid.length; y++) {
                // try to move it up
                if (grid[y][x] == 'O') {
                    let current = y - 1;
                    while (current >= 0 && !grid[current][x].match(/[O#]/)) {
                        // swap
                        let temp = grid[current + 1][x];
                        grid[current + 1][x] = grid[current][x];
                        grid[current][x] = temp;

                        current--;
                    }
                }
            }
        }
    } else if (direction == directions.SOUTH) {
        for (let x = 0; x < grid[0].length; x++) {
            for (let y = grid.length - 1; y >= 0; y--) {
                // try to move it down
                if (grid[y][x] == 'O') {
                    let current = y + 1;
                    while (current < grid.length && !grid[current][x].match(/[O#]/)) {
                        // swap
                        let temp = grid[current - 1][x];
                        grid[current - 1][x] = grid[current][x];
                        grid[current][x] = temp;

                        current++;
                    }
                }
            }
        }
    } else if (direction == directions.WEST) {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                // try to move it right
                if (grid[y][x] == 'O') {
                    let current = x - 1;
                    while (current >= 0 && !grid[y][current].match(/[O#]/)) {
                        // swap
                        let temp = grid[y][current + 1];
                        grid[y][current + 1] = grid[y][current];
                        grid[y][current] = temp;

                        current--;
                    }
                }
            }
        }
    } else if (direction == directions.EAST) {
        for (let y = 0; y < grid.length; y++) {
            for (let x = grid[y].length - 1; x >= 0; x--) {
                // try to move it left
                if (grid[y][x] == 'O') {
                    let current = x + 1;
                    while (current < grid[y].length && !grid[y][current].match(/[O#]/)) {
                        // swap
                        let temp = grid[y][current - 1];
                        grid[y][current - 1] = grid[y][current];
                        grid[y][current] = temp;

                        current++;
                    }
                }
            }
        }
    }

    return grid;
}

const hash = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // parse input and slide
    const grid = slideGrid(input.split(/\n/g).map(line => line.split('')), directions.NORTH);
    
    let sum = 0;
    for (let y = grid.length - 1; y >= 0; y--) {
        sum += grid[y].filter(char => char == 'O').length * (grid.length - y); 
    }
    
    return sum;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // parse input
    let grid = input.split(/\n/g).map(line => line.split(''));
    let cycleTest = structuredClone(grid);

    let previousStates = {};
    let currentCycle = 0;
    while (true) {
        let current = hash(cycleTest.map(line => line.join('')).join(''));
        if (previousStates[current] != null) break;
        else previousStates[current] = currentCycle;

        cycleTest = slideGrid(cycleTest, directions.NORTH);
        cycleTest = slideGrid(cycleTest, directions.WEST);
        cycleTest = slideGrid(cycleTest, directions.SOUTH);
        cycleTest = slideGrid(cycleTest, directions.EAST);

        currentCycle++;
    }

    let cycleStart = previousStates[hash(cycleTest.map(line => line.join('')).join(''))];
    for (let i = 0; i < cycleStart + ((1000000000 - cycleStart) % (currentCycle - cycleStart)); i++) {
        grid = slideGrid(grid, directions.NORTH);
        grid = slideGrid(grid, directions.WEST);
        grid = slideGrid(grid, directions.SOUTH);
        grid = slideGrid(grid, directions.EAST);
    }

    let sum = 0;
    for (let y = grid.length - 1; y >= 0; y--) {
        sum += grid[y].filter(char => char == 'O').length * (grid.length - y);
    }

    return sum;
}

export { part1, part2 };