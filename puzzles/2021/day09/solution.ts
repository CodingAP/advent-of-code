// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2021/day09/solution.ts
 *
 * ~~ Smoke Basin ~~
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
    let rows = input.trim().split('\n');
    let grid = create2DArray(rows[0].length, rows.length, (x, y) => {
        return parseInt(rows[y][x]);
    });

    let sum = 0;
    forEach2DArray(grid, (value, x, y) => {
        if (y > 0 && grid[y - 1][x] <= value) return;
        if (y < rows.length - 1 && grid[y + 1][x] <= value) return;
        if (x > 0 && grid[y][x - 1] <= value) return;
        if (x < rows[0].length - 1 && grid[y][x + 1] <= value) return;
        
        sum += value + 1;
    })
    return sum;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let rows = input.trim().split('\n');
    let grid = create2DArray(rows[0].length, rows.length, (x, y) => {
        return parseInt(rows[y][x]);
    });

    let lowPoints = [];
    let areas = [];

    forEach2DArray(grid, (value, x, y) => {
        if (y > 0 && grid[y - 1][x] <= value) return;
        if (y < rows.length - 1 && grid[y + 1][x] <= value) return;
        if (x > 0 && grid[y][x - 1] <= value) return;
        if (x < rows[0].length - 1 && grid[y][x + 1] <= value) return;

        lowPoints.push({ x, y });
    });

    let fill = (x, y, points) => {
        points.push({ x, y });
        if (y > 0 && grid[y - 1][x] != 9 && points.findIndex(element => element.x == x && element.y == (y - 1)) == -1) fill(x, y - 1, points);
        if (y < rows.length - 1 && grid[y + 1][x] != 9 && points.findIndex(element => element.x == x && element.y == (y + 1)) == -1) fill(x, y + 1, points);
        if (x > 0 && grid[y][x - 1] != 9 && points.findIndex(element => element.x == (x - 1) && element.y == y) == -1) fill(x - 1, y, points);
        if (x < rows[0].length - 1 && grid[y][x + 1] != 9 && points.findIndex(element => element.x == (x + 1) && element.y == y) == -1) fill(x + 1, y, points);
        return points;
    }

    lowPoints.forEach(element => {
        let basin = fill(element.x, element.y, []);
        areas.push(basin);
    });

    areas.sort((a, b) => b.length - a.length);
    return areas[0].length * areas[1].length * areas[2].length;
};

export { part1, part2 };
