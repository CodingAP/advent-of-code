// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2023/day13/solution.ts
 * 
 * ~~ Point of Incidence ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/12/2023
 */

/**
 * gets the reflections axes in the grid (should be at most one vertical or one horizontal)
 * 
 * @param {string[][]} grid 
 * @returns {{ vertical: number[], horizontal: number[] }}
 */
const getReflections = grid => {
    let reflections = { vertical: [], horizontal: [] };

    // check for vertical axis for reflection
    for (let x = 0; x < grid[0].length - 1; x++) {
        let reflection = true;
        let smallestSide = Math.min(x, grid[0].length - (x + 2));

        // keep going until one side is reached
        for (let col = 0; col <= smallestSide; col++) {
            for (let y = 0; y < grid.length; y++) {
                if (grid[y][x - col] != grid[y][x + col + 1]) reflection = false;
            }
        }

        if (reflection) reflections.vertical.push(x + 1);
    }

    // check for horizontal axis for reflection
    for (let y = 0; y < grid.length - 1; y++) {
        let reflection = true;
        let smallestSide = Math.min(y, grid.length - (y + 2));

        // keep going until one side is reached
        for (let row = 0; row <= smallestSide; row++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y - row][x] != grid[y + row + 1][x]) reflection = false;
            }
        }

        if (reflection) reflections.horizontal.push(y + 1);
    }

    return reflections;
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    // parse input and find all reflections of the grids given
    // sum up all axes with vertical + horizontal * 100
    return input.split(/\n\n/g).reduce((sum, grid) => {
        const { vertical, horizontal } = getReflections(grid.split(/\n/g).map(line => line.split('')));
        return sum +
            vertical.reduce((sum, num) => sum + num, 0) +
            100 * horizontal.reduce((sum, num) => sum + num, 0);
    }, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    return input.split(/\n\n/g).reduce((sum, grid) => {
        // find unmodifed reflections
        const original = grid.split(/\n/g).map(line => line.split(''));
        const reflections = getReflections(original);

        // go through all possible modifications
        // find one that produces a different reflection
        for (let y = 0; y < original.length; y++) {
            for (let x = 0; x < original[y].length; x++) {
                // flip one symbol and find reflections
                let newGrid = structuredClone(original);
                newGrid[y][x] = (newGrid[y][x] == '#') ? '.' : '#';
                const newReflections = getReflections(newGrid);

                // remove original reflections
                newReflections.vertical = newReflections.vertical.filter(element => !reflections.vertical.includes(element));
                newReflections.horizontal = newReflections.horizontal.filter(element => !reflections.horizontal.includes(element));

                // if any reflections still exist, add them to sum
                if (newReflections.vertical.length != 0 || newReflections.horizontal.length != 0) {
                    return sum +
                        newReflections.vertical.reduce((sum, num) => sum + num, 0) +
                        100 * newReflections.horizontal.reduce((sum, num) => sum + num, 0);
                }
            }
        }
    }, 0);
}

export { part1, part2 };