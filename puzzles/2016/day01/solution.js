/**
 * aoc/puzzles/2016/day01/solution.js
 * 
 * ~~ No Time for a Taxicab ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 10/18/2024
 */

/**
 * array of directions to calculate the next position
 */
const DIRECTIONS = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }];

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    let position = { x: 0, y: 0 };
    let direction = 0;
    input.split(/, /g).forEach(movement => {
        direction = (direction + ((movement[0] === 'L') ? 3 : 1)) % 4;
        position.x += DIRECTIONS[direction].x * parseInt(movement.slice(1));
        position.y += DIRECTIONS[direction].y * parseInt(movement.slice(1));
    });

    return Math.abs(position.x) + Math.abs(position.y);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    let allPositions = { '0,0': true };
    let position = { x: 0, y: 0 };
    let direction = 0;

    let distance = null;
    input.split(/, /g).forEach(movement => {
        direction = (direction + ((movement[0] === 'L') ? 3 : 1)) % 4;

        for (let i = 0; i < parseInt(movement.slice(1)); i++) {
            position.x += DIRECTIONS[direction].x;
            position.y += DIRECTIONS[direction].y;

            if (allPositions[`${position.x},${position.y}`] && distance === null) {
                distance = Math.abs(position.x) + Math.abs(position.y);
            }
    
            allPositions[`${position.x},${position.y}`] = true;
        }
    });

    return distance;
}

export { part1, part2 };