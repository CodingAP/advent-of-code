// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day11/solution.ts
 *
 * ~~ Seating System ~~
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

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let seats = input.split('\n');

    let grid = create2DArray(seats[0].length, seats.length, (x, y) => {
        if (seats[y].charAt(x) == 'L') {
            return false;
        }
        return null;
    });

    let previousGrid = null;
    while (true) {
        let newGrid = create2DArray(seats[0].length, seats.length, false);

        forEach2DArray(grid, (value, x, y) => {
            if (value == null) { newGrid[y][x] = null; return; }

            let neighbors = 0;
            for (let j = -1; j <= 1; j++) {
                for (let k = -1; k <= 1; k++) {
                    if (j == 0 && k == 0) continue;
                    if (y + j < 0 || y + j >= seats.length || x + k < 0 || x + k >= seats[0].length) continue;
                    if (grid[y + j][x + k]) neighbors++;
                }
            }

            newGrid[y][x] = (value) ? (neighbors < 4) : (neighbors == 0);
        });

        if (!previousGrid) {
            previousGrid = newGrid;
        } else {
            if (JSON.stringify(newGrid) === JSON.stringify(previousGrid)) {
                let occSeats = 0;
                forEach2DArray(newGrid, value => {
                    if (value) occSeats++;
                });
                return occSeats;
            }
            previousGrid = newGrid;
        }
        grid = newGrid;
    }
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let seats = input.split('\n');

    let grid = create2DArray(seats[0].length, seats.length, (x, y) => {
        if (seats[y].charAt(x) == 'L') {
            return false;
        } else if (seats[y].charAt(x) == '#') {
            return true;
        }
        return null;
    });

    let previousGrid = null;
    while (true) {
        let newGrid = create2DArray(seats[0].length, seats.length, false);

        forEach2DArray(grid, (value, x, y) => {
            if (value == null) { newGrid[y][x] = null; return; }

            let neighbors = 0;
            for (let j = -1; j <= 1; j++) {
                for (let k = -1; k <= 1; k++) {
                    if (j == 0 && k == 0) continue;
                    let lookingPosition = { x, y };
                    
                    while (true) {
                        lookingPosition.x += k;
                        lookingPosition.y += j;

                        if (lookingPosition.x < 0 || lookingPosition.x >= grid[0].length || lookingPosition.y < 0 || lookingPosition.y >= grid.length) break;

                        if (grid[lookingPosition.y][lookingPosition.x] != null) {
                            neighbors += (grid[lookingPosition.y][lookingPosition.x]) ? 1 : 0;
                            break;
                        }
                    } 
                }
            }

            if (value) {
                newGrid[y][x] = (neighbors < 5);
            } else {
                newGrid[y][x] = (neighbors == 0);
            }
        });

        if (!previousGrid) {
            previousGrid = newGrid;
        } else {
            if (JSON.stringify(newGrid) === JSON.stringify(previousGrid)) {
                let occSeats = 0;
                forEach2DArray(newGrid, value => {
                    if (value) occSeats++;
                });
                return occSeats;
            }
            previousGrid = newGrid;
        }
        grid = newGrid;
    }
};

export { part1, part2 };
