/**
 * puzzles/2017/day11/solution.ts
 *
 * ~~ Hex Ed ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

const DIRECTION: { [key: string]: { x: number, y: number } } = {
    n: { x: 0, y: 2 },
    s: { x: 0, y: -2 },
    ne: { x: 1, y: 1 },
    nw: { x: -1, y: 1 },
    se: { x: 1, y: -1 },
    sw: { x: -1, y: -1 },
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const directions = input.trim().split(',');

    const position = { x: 0, y: 0 };
    for (let i = 0; i < directions.length; i++) {
        position.x += DIRECTION[directions[i]].x;
        position.y += DIRECTION[directions[i]].y;
    }

    return Math.max(Math.abs(position.x), Math.round(Math.abs(position.y / 2)));
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const directions = input.trim().split(',');

    const position = { x: 0, y: 0 };
    let max = -Infinity;
    for (let i = 0; i < directions.length; i++) {
        position.x += DIRECTION[directions[i]].x;
        position.y += DIRECTION[directions[i]].y;
        max = Math.max(max, Math.max(Math.abs(position.x), Math.round(Math.abs(position.y / 2))));
    }

    return max;
};

export { part1, part2 };
