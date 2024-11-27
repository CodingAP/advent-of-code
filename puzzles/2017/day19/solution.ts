// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2017/day19/solution.ts
 *
 * ~~ A Series of Tubes ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let rows = input.split('\n');
    let position = { x: rows[0].indexOf('|'), y: 0 };
    let directionVectors = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
    let direction = 2;
    
    let string = '';
    while (rows[position.y][position.x] != ' ') {
        position.x += directionVectors[direction].x;
        position.y += directionVectors[direction].y;

        if (rows[position.y][position.x] == '+') {
            let otherDirection = { x: position.x + directionVectors[(direction + 1) % directionVectors.length].x, y: position.y + directionVectors[(direction + 1) % directionVectors.length].y };
            if (otherDirection.x >= 0 && otherDirection.x < rows[position.y].length && otherDirection.y >= 0 && otherDirection.y < rows.length &&
                rows[otherDirection.y][otherDirection.x] != ' ') {
                direction = (direction + 1) % directionVectors.length;
            } else {
                direction--;
                if (direction < 0) direction = directionVectors.length - 1;
            }
        } else if (rows[position.y][position.x].match(/[A-Z]/g)) string += rows[position.y][position.x];
    }
    return string;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let rows = input.split('\n');
    let position = { x: rows[0].indexOf('|'), y: 0 };
    let directionVectors = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
    let direction = 2;

    let steps = 0;
    while (rows[position.y][position.x] != ' ') {
        position.x += directionVectors[direction].x;
        position.y += directionVectors[direction].y;
        steps++;

        if (rows[position.y][position.x] == '+') {
            let otherDirection = { x: position.x + directionVectors[(direction + 1) % directionVectors.length].x, y: position.y + directionVectors[(direction + 1) % directionVectors.length].y };
            if (otherDirection.x >= 0 && otherDirection.x < rows[position.y].length && otherDirection.y >= 0 && otherDirection.y < rows.length &&
                rows[otherDirection.y][otherDirection.x] != ' ') {
                direction = (direction + 1) % directionVectors.length;
            } else {
                direction--;
                if (direction < 0) direction = directionVectors.length - 1;
            }
        }
    }
    return steps;
};

export { part1, part2 };
