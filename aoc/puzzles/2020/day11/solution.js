/**
 * aoc/puzzles/2020/day11/solution.js
 * 
 * ~~ Seating System ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/10/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // parse input
    let grid = input.split(/\n/).map(line => line.split(''));

    // keep running the simulation until no changes happen
    while (true) {
        let newGrid = new Array(grid.length).fill(0).map(_ => new Array(grid[0].length));

        let modified = false;
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                // don't process floor
                if (grid[y][x] == '.') {
                    newGrid[y][x] = '.';
                    continue;
                }

                // count occupied seats around current seat
                let occupied = 0;
                for (let j = -1; j <= 1; j++) {
                    for (let i = -1; i <= 1; i++) {
                        if (i == 0 && j == 0) continue;
                        if (x + i < 0 || x + i >= grid[y].length || y + j < 0 || y + j >= grid.length) continue;

                        if (grid[y + j][x + i] == '#') occupied++;
                    }
                }

                // change state based on occupied count 
                if (grid[y][x] == 'L') newGrid[y][x] = (occupied == 0) ? '#' : 'L';
                else newGrid[y][x] = (occupied >= 4) ? 'L' : '#';

                // check for modified states
                if (!modified) modified = (grid[y][x] != newGrid[y][x]);
            }
        }

        grid = newGrid;
        if (!modified) break;
    }

    // count all occupied seats
    return grid.flatMap(row => row).filter(seat => seat == '#').length;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // parse input
    let grid = input.split(/\n/).map(line => line.split(''));

    // keep running the simulation until no changes happen
    while (true) {
        let newGrid = new Array(grid.length).fill(0).map(_ => new Array(grid[0].length));

        let modified = false;
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                // don't process floor
                if (grid[y][x] == '.') {
                    newGrid[y][x] = '.';
                    continue;
                }

                // count occupied seats around current seat with new method
                let occupied = 0;
                for (let j = -1; j <= 1; j++) {
                    for (let i = -1; i <= 1; i++) {
                        if (i == 0 && j == 0) continue;

                        let check = { x: x + i, y: y + j };
                        while (check.x >= 0 && check.x < grid[y].length && check.y >= 0 && check.y < grid.length) {
                            if (grid[check.y][check.x] != '.') {
                                occupied = occupied + ((grid[check.y][check.x] == '#') ? 1 : 0);
                                break;
                            }

                            check.x += i;
                            check.y += j;
                        }                        
                    }
                }

                // change state based on occupied count 
                if (grid[y][x] == 'L') newGrid[y][x] = (occupied == 0) ? '#' : 'L';
                else newGrid[y][x] = (occupied >= 5) ? 'L' : '#';

                // check for modified states
                if (!modified) modified = (grid[y][x] != newGrid[y][x]);
            }
        }

        grid = newGrid;
        if (!modified) break;
    }

    // count all occupied seats
    return grid.flatMap(row => row).filter(seat => seat == '#').length;
}

export { part1, part2 };