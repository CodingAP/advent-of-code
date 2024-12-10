/**
 * puzzles/2021/day11/solution.ts
 *
 * ~~ Dumbo Octopus ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * recursively flash the grid until everything settles
 */
const doFlash = (grid: number[][], x: number, y: number) => {
    const width = grid[0].length, height = grid.length;

    grid[y][x] = -1;
    for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
            if (i == 0 && j == 0) continue;
            if (x + i < 0 || x + i >= width || y + j < 0 || y + j >= height) continue;
            if (grid[y + j][x + i] === -1) continue;

            grid[y + j][x + i]++;
            if (grid[y + j][x + i] > 9) doFlash(grid, x + i, y + j);
        }
    }
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let grid = input.trim().split('\n').map(line => line.split('').map(num => parseInt(num)));
    const width = grid[0].length, height = grid.length;

    // run for 100 steps
    let flashes = 0;
    for (let step = 0; step < 100; step++) {
        const newGrid = structuredClone(grid);

        // add 1 to all values
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                newGrid[y][x]++;
            }   
        }
        
        // if this triggers a flash, do a flash until everything is settled
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (newGrid[y][x] > 9) doFlash(newGrid, x, y);
            }   
        }

        // count how many flashes happened during the previous steps
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (newGrid[y][x] === -1) {
                    flashes++;
                    newGrid[y][x] = 0;
                }
            }   
        }

        grid = newGrid;
    }

    return flashes;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let grid = input.trim().split('\n').map(line => line.split('').map(num => parseInt(num)));
    const width = grid[0].length, height = grid.length;

    // keeping running until all are flashed
    let step = 1;
    while (true) {
        const newGrid = structuredClone(grid);

        // add 1 to all values
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                newGrid[y][x]++;
            }   
        }
        
        // if this triggers a flash, do a flash until everything is settled
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (newGrid[y][x] > 9) doFlash(newGrid, x, y);
            }   
        }

        // check to see if all are flashed
        let allFlashed = true;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (newGrid[y][x] === -1) newGrid[y][x] = 0;
                else allFlashed = false;
            }   
        }

        grid = newGrid;

        if (allFlashed) return step;
        step++;
    }
};

export { part1, part2 };
