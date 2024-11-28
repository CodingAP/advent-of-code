// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day03/solution.ts
 *
 * ~~ Toboggan Trajectory ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let position = { x: 0, y: 0 };
    let velocity = { x: 3, y: 1 };
    let trees = 0;

    let rows = input.split('\n');
    let grid = new Array(rows.length);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(rows[i].length);
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = (rows[i].charAt(j) == '#');
        }
    }

    while (position.y < grid.length) {
        if (grid[position.y][position.x]) trees++;

        position.x = (position.x + velocity.x) % grid[0].length;
        position.y += velocity.y;
    }

    return trees;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let velocities = [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 }, { x: 7, y: 1 }, { x: 1, y: 2 }];
    let sum = 1;

    let rows = input.split('\n');
    let grid = new Array(rows.length);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(rows[i].length);
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = (rows[i].charAt(j) == '#');
        }
    }

    for (let i = 0; i < velocities.length; i++) {
        let position = { x: 0, y: 0 };
        let trees = 0;

        while (position.y < grid.length) {
            if (grid[position.y][position.x]) trees++;

            position.x = (position.x + velocities[i].x) % grid[0].length;
            position.y += velocities[i].y;
        }

        sum *= trees;
    }

    return sum;
};

export { part1, part2 };
