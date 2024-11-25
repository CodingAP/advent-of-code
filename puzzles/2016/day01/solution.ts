// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day1/solution.ts
 * 
 * ~~ No Time for a Taxicab ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    let direction = 0;
    let directions = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }];
    
    let position = input.split(', ').reduce((position, line) => {
        direction = (direction + ((line[0] == 'L') ? directions.length - 1 : 1)) % directions.length;

        position.x += directions[direction].x * parseInt(line.slice(1));
        position.y += directions[direction].y * parseInt(line.slice(1));
        return position;
    }, { x: 0, y: 0 });

    return Math.abs(position.x) + Math.abs(position.y);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let position = { x: 0, y: 0 };
    let direction = 0;
    let directions = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }];

    let previous = [];
    let moves = input.split(', ');
    for (let move of moves) {
        direction = (direction + ((move[0] == 'L') ? directions.length - 1 : 1)) % directions.length;

        for (let step = 0; step < parseInt(move.slice(1)); step++) {
            position.x += directions[direction].x;
            position.y += directions[direction].y;
        
            if (previous.includes(`${position.x},${position.y}`)) return Math.abs(position.x) + Math.abs(position.y);
            else previous.push(`${position.x},${position.y}`);
        }
    }
}

export { part1, part2 };