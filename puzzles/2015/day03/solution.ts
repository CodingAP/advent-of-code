/**
 * puzzles/2015/day03/solution.ts
 * 
 * ~~ Perfectly Spherical Houses in a Vacuum ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

const DIRECTIONS: { [key: string]: { x: number, y: number } } = {
    '^': { x: 0, y: 1 },
    '>': { x: 1, y: 0 },
    'v': { x: 0, y: -1 },
    '<': { x: -1, y: 0 },
};

/**
 * code for part 1 of the advent of code puzzle
 */
const part1 = (input: string) => {
    let santa = { x: 0, y: 0 };
    let houses = new Set();

    for (let i = 0; i < input.length; i++) {
        santa.x += DIRECTIONS[input[i]].x;
        santa.y += DIRECTIONS[input[i]].y;

        houses.add(`${santa.x},${santa.y}`);
    }

    return houses.size;
}

/**
 * code for part 2 of the advent of code puzzle
 */
const part2 = (input: string) => {
    let santa = { x: 0, y: 0 }, robot = { x: 0, y: 0 };
    let houses = new Set();

    for (let i = 0; i < input.length; i++) {
        let current = (i % 2 == 0) ? santa : robot;
        
        current.x += DIRECTIONS[input[i]].x;
        current.y += DIRECTIONS[input[i]].y;

        houses.add(`${current.x},${current.y}`);
    }

    return houses.size;
}

export { part1, part2 };