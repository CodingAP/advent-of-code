// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2021/day11/solution.ts
 *
 * ~~ Dumbo Octopus ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

const create2DArray = (width, height, fill) => {
    let array = new Array(height).fill('').map(_ => new Array(width));

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (typeof fill === 'function') array[y][x] = fill(x, y);
            else array[y][x] = fill;
        }
    }

    return array;
};

const forEach2DArray = (array, callback) => {
    for (let y = 0; y < array.length; y++) {
        for (let x = 0; x < array[y].length; x++) {
            callback(array[y][x], x, y);
        }
    }
};

const map2DArray = (array, callback) => {
    for (let y = 0; y < array.length; y++) {
        for (let x = 0; x < array[y].length; x++) {
            array[y][x] = callback(array[y][x], x, y);
        }
    }
};

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let rows = input.trim().split('\n');
    let grid = create2DArray(rows[0].length, rows.length, (x, y) => {
        return parseInt(rows[y][x]);
    });

    let flashes = 0;
    let doFlash = (x, y, grid) => {
        grid[y][x] = 'FLASHED';
        for (let j = -1; j <= 1; j++) {
            for (let k = -1; k <= 1; k++) {
                if (j == 0 && k == 0) continue;
                if ((y + j) < 0 || (y + j) >= rows.length || (x + k) < 0 || (x + k) >= rows[0].length) continue;
                if (grid[y + j][x + k] == 'FLASHED') continue;

                grid[y + j][x + k]++;
                if (grid[y + j][x + k] > 9) doFlash(x + k, y + j, grid);
            }
        }
    }

    for (let step = 0; step < 100; step++) {
        let newGrid = create2DArray(rows[0].length, rows.length, 0);

        forEach2DArray(grid, (value, x, y) => {
            newGrid[y][x] = value + 1;
        });

        forEach2DArray(newGrid, (value, x, y) => {
            if (value > 9) doFlash(x, y, newGrid);
        });

        map2DArray(newGrid, (value, x, y) => {
            if (value == 'FLASHED') {
                flashes++;
                return 0;
            }
            return value;
        });

        grid = newGrid;
    }

    return flashes;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let rows = input.trim().split('\n');
    let grid = create2DArray(rows[0].length, rows.length, (x, y) => {
        return parseInt(rows[y][x]);
    });

    let doFlash = (x, y, grid) => {
        grid[y][x] = 'FLASHED';
        for (let j = -1; j <= 1; j++) {
            for (let k = -1; k <= 1; k++) {
                if (j == 0 && k == 0) continue;
                if ((y + j) < 0 || (y + j) >= rows.length || (x + k) < 0 || (x + k) >= rows[0].length) continue;
                if (grid[y + j][x + k] == 'FLASHED') continue;

                grid[y + j][x + k]++;
                if (grid[y + j][x + k] > 9) doFlash(x + k, y + j, grid);
            }
        }
    }

    let step = 1;
    while (true) {
        let newGrid = create2DArray(rows[0].length, rows.length, 0);

        forEach2DArray(grid, (value, x, y) => {
            newGrid[y][x] = value + 1;
        });

        forEach2DArray(newGrid, (value, x, y) => {
            if (value > 9) doFlash(x, y, newGrid);
        });

        let allFlashed = true;
        map2DArray(newGrid, (value, x, y) => {
            if (value == 'FLASHED') return 0;
            allFlashed = false;
            return value;
        });

        if (allFlashed) return step;
        grid = newGrid;
        step++;
    }
};

export { part1, part2 };
