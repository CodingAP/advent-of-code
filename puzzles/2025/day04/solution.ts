/**
 * puzzles/2025/day04/solution.ts
 *
 * ~~ Printing Department ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/5/2026
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const grid = input.split('\n').map(line => line.split(''));
    let accessible = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            let neighbors = 0;
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    if (i === 0 && j === 0) continue;
                    if (x + i < 0 || x + i >= grid[y].length || y + j < 0 || y + j >= grid.length) continue;

                    if (grid[y + j][x + i] === '@') neighbors++;
                }
            }

            if (grid[y][x] === '@' && neighbors < 4) accessible++;
        }
    }
    return accessible;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let grid = input.split('\n').map(line => line.split(''));
    let removed = 0;

    while (true) {
        const newGrid = structuredClone(grid);
        let checkForRemove = false;
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                let neighbors = 0;
                for (let j = -1; j <= 1; j++) {
                    for (let i = -1; i <= 1; i++) {
                        if (i === 0 && j === 0) continue;
                        if (x + i < 0 || x + i >= grid[y].length || y + j < 0 || y + j >= grid.length) continue;

                        if (grid[y + j][x + i] === '@') neighbors++;
                    }
                }

                if (grid[y][x] === '@' && neighbors < 4) {
                    newGrid[y][x] = '.';
                    removed++;
                    checkForRemove = true;
                }
            }
        }
        grid = newGrid;
        if (!checkForRemove) break;
    }

    return removed;
};

export { part1, part2 };
