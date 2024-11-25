// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2015/day25/solution.ts
 * 
 * ~~ Let It Snow ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    const words = input.replace(/[,\.]/g, '').split(' ');
    const finalPosition = { x: parseInt(words[words.length - 1]), y: parseInt(words[words.length - 3]) };
    
    let currentPosition = { x: 1, y: 1 };
    let number = 20151125, diagonal = 1;
    while (!(finalPosition.x == currentPosition.x && finalPosition.y == currentPosition.y)) {
        if (currentPosition.y == 1) {
            diagonal++;
            currentPosition = { x: 1, y: diagonal }
        } else {
            currentPosition.x++;
            currentPosition.y--;
        }

        number = (number * 252533) % 33554393;
    }

    return number;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    return '2015 DONE!';
}

export { part1, part2 };