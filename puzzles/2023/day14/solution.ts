// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2023/day14/solution.ts
 * 
 * ~~ Parabolic Reflector Dish ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/13/2023
 */

/**
 * helper constants to give name to numbers and slide the rocks
 */
const directions = {
    EAST: 0,
    SOUTH: 1,
    WEST: 2,
    NORTH: 3,
    MOVEMENTS: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }]
};

/**
 * slides the grid towards the direction specified
 * 
 * mutates the grid given 
 * 
 * @param {string[][]} grid grid to slide
 * @param {number} direction direction to slide it in
 */
const slideGrid = (grid, direction) => {
    const rowPrimary = (direction == directions.NORTH || direction == directions.SOUTH);
    const reversed = (direction == directions.SOUTH || direction == directions.EAST);
    console.log(rowPrimary, reversed)
    for (let i = 0; i < (rowPrimary ? grid[0].length : grid.length); i++) {
        for (let j = (reversed ? ((rowPrimary ? grid.length : grid[0].length) - 1) : 0); (reversed ? (j >= 0) : (j < (rowPrimary ? grid.length : grid[0].length))); j += (reversed ? -1 : 1)) {
            // try to move it up
            console.log(i, j);
            if (grid[i][j] == 'O') {
                let current = { x: rowPrimary ? j : i, y: rowPrimary ? i : j };
                console.log(current);
                // while (current >= 0 && !grid[current][x].match(/[O#]/)) {
                //     // swap
                //     let temp = grid[current + 1][x];
                //     grid[current + 1][x] = grid[current][x];
                //     grid[current][x] = temp;

                //     current--;
                // }
            }
        }
    }
}

/**
 * hash a string to a number for hash maps
 * 
 * apparently, using Math.imul() on just integers is much faster than using normal multiplication
 * 
 * @param {string} str string to hash
 * @returns 
 */
const hash = str => {
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < str.length; i++) {
        h1 = Math.imul(h1 ^ str.charCodeAt(i), 2654435761);
        h2 = Math.imul(h2 ^ str.charCodeAt(i), 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    // parse input
    let grid = input.split(/\n/g).map(line => line.split(''));
    
    slideGrid(grid, directions.NORTH);
    
    // count all rocks depending on which row it is on
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
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
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

    // count all rocks depending on which row it is on
    let sum = 0;
    for (let y = grid.length - 1; y >= 0; y--) {
        sum += grid[y].filter(char => char == 'O').length * (grid.length - y);
    }

    return sum;
}

export { part1, part2 };