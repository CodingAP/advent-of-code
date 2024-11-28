// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2021/day20/solution.ts
 *
 * ~~ Trench Map ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

const objectForEach = (object, callback) => {
    Object.entries(object).forEach(([key, value]) => callback(key, value));
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let [algorithm, image] = input.split('\n\n');

    let grid = {};
    image.split('\n').forEach((element, index) => {
        for (let i = 0; i < element.length; i++) {
            grid[`${i},${index}`] = (element[i] == '#') ? 1 : 0;
        }
    });

    for (let steps = 0; steps < 2; steps++) {
        let newGrid = {};

        objectForEach(grid, (coords, state) => {
            let [x, y] = coords.split(',').map(num => parseInt(num));
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    let neighborCoords = `${x + i},${y + j}`;
                    if (grid[neighborCoords] == null) grid[neighborCoords] = steps;
                }
            }
        });

        objectForEach(grid, (coords, state) => {
            let [x, y] = coords.split(',').map(num => parseInt(num));
            let binary = '';
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    let neighborCoords = `${x + i},${y + j}`;
                    if (grid[neighborCoords] == null) binary += steps;
                    else binary += grid[neighborCoords];
                }
            }

            newGrid[coords] = (algorithm[parseInt(binary, 2)] == '#') ? 1 : 0;
        });

        grid = newGrid;
    }

    let lights = 0;
    objectForEach(grid, (coords, state) => {
        if (state == 1) lights++;
    });

    return lights;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let [algorithm, image] = input.split('\n\n');

    let grid = {};
    image.split('\n').forEach((element, index) => {
        for (let i = 0; i < element.length; i++) {
            grid[`${i},${index}`] = (element[i] == '#') ? 1 : 0;
        }
    });

    for (let steps = 0; steps < 50; steps++) {
        let newGrid = {};

        objectForEach(grid, (coords, state) => {
            let [x, y] = coords.split(',').map(num => parseInt(num));
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    let neighborCoords = `${x + i},${y + j}`;
                    if (grid[neighborCoords] == null) grid[neighborCoords] = steps % 2;
                }
            }
        });

        objectForEach(grid, (coords, state) => {
            let [x, y] = coords.split(',').map(num => parseInt(num));
            let binary = '';
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    let neighborCoords = `${x + i},${y + j}`;
                    if (grid[neighborCoords] == null) binary += steps % 2;
                    else binary += grid[neighborCoords];
                }
            }

            newGrid[coords] = (algorithm[parseInt(binary, 2)] == '#') ? 1 : 0;
        });

        grid = newGrid;
    }

    let lights = 0;
    objectForEach(grid, (coords, state) => {
        if (state == 1) lights++;
    });

    return lights;
};

export { part1, part2 };
