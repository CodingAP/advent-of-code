// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2021/day05/solution.ts
 *
 * ~~ Hydrothermal Venture ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let lines = [];
    input.trim().split('\n').forEach(element => {
        let [start, end] = element.split(' -> ');
        lines.push({
            start: { x: parseInt(start.split(',')[0]), y: parseInt(start.split(',')[1]) },
            end: { x: parseInt(end.split(',')[0]), y: parseInt(end.split(',')[1]) }
        });
    });

    let grid = {};
    lines.forEach(element => {
        if (element.start.x == element.end.x || element.start.y == element.end.y) {
            let startX = Math.min(element.start.x, element.end.x);
            let startY = Math.min(element.start.y, element.end.y);
            let endX = Math.max(element.start.x, element.end.x);
            let endY = Math.max(element.start.y, element.end.y);

            for (let y = startY; y <= endY; y++) {
                for (let x = startX; x <= endX; x++) {
                    if (!grid[`${x},${y}`]) grid[`${x},${y}`] = 0;
                    grid[`${x},${y}`]++;
                }
            }
        }
    });

    return Object.values(grid).filter(element => element >= 2).length;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let lines = [];
    input.trim().split('\n').forEach(element => {
        let [start, end] = element.split(' -> ');
        lines.push({
            start: { x: parseInt(start.split(',')[0]), y: parseInt(start.split(',')[1]) },
            end: { x: parseInt(end.split(',')[0]), y: parseInt(end.split(',')[1]) }
        });
    });

    let grid = {};
    lines.forEach(element => {
        let start = {}, end = {};
        if (element.start.x < element.end.x) {
            start = element.start;
            end = element.end;
        } else {
            start = element.end;
            end = element.start;
        }

        if (element.start.x == element.end.x || element.start.y == element.end.y) {
            let startX = Math.min(element.start.x, element.end.x);
            let startY = Math.min(element.start.y, element.end.y);
            let endX = Math.max(element.start.x, element.end.x);
            let endY = Math.max(element.start.y, element.end.y);

            for (let y = startY; y <= endY; y++) {
                for (let x = startX; x <= endX; x++) {
                    if (!grid[`${x},${y}`]) grid[`${x},${y}`] = 0;
                    grid[`${x},${y}`]++;
                }
            }
        } else {
            let movement = end.x - start.x;
            for (let i = 0; i <= movement; i++) {
                let x = start.x + i;
                let y = start.y + ((end.y > start.y) ? i : -i);
                if (!grid[`${x},${y}`]) grid[`${x},${y}`] = 0;
                grid[`${x},${y}`]++;
            }
        }
    });

    return Object.values(grid).filter(element => element >= 2).length;
};

export { part1, part2 };
