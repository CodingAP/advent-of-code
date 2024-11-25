// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day2/solution.ts
 * 
 * ~~ Bathroom Security ~~
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
    let keyPad = [
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9'
    ];

    let directions = {
        L: { x: -1, y: 0 },
        R: { x: 1, y: 0 },
        U: { x: 0, y: -1 },
        D: { x: 0, y: 1 }
    }

    return input.split('\n').reduce((string, line) => {
        let final = line.split('').reduce((position, direction) => {
            position.x = Math.min(Math.max(position.x + directions[direction].x, 0), Math.sqrt(keyPad.length) - 1);
            position.y = Math.min(Math.max(position.y + directions[direction].y, 0), Math.sqrt(keyPad.length) - 1);
            return position;
        }, { x: keyPad.indexOf('5') % Math.sqrt(keyPad.length), y: Math.floor(keyPad.indexOf('5') / Math.sqrt(keyPad.length)) })
        
        string += keyPad[final.y * Math.sqrt(keyPad.length) + final.x];
        return string;
    }, '');
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let keyPad = [
        ' ', ' ', '1', ' ', ' ',
        ' ', '2', '3', '4', ' ',
        '5', '6', '7', '8', '9',
        ' ', 'A', 'B', 'C', ' ',
        ' ', ' ', 'D', ' ', ' '
    ];

    let directions = {
        L: { x: -1, y: 0 },
        R: { x: 1, y: 0 },
        U: { x: 0, y: -1 },
        D: { x: 0, y: 1 }
    }

    return input.split('\n').reduce((string, line) => {
        let final = line.split('').reduce((position, direction) => {
            let newX = Math.min(Math.max(position.x + directions[direction].x, 0), Math.sqrt(keyPad.length) - 1);
            let newY = Math.min(Math.max(position.y + directions[direction].y, 0), Math.sqrt(keyPad.length) - 1);

            if (keyPad[newY * Math.sqrt(keyPad.length) + newX] != ' ') position = { x: newX, y: newY };
            return position;
        }, { x: keyPad.indexOf('5') % Math.sqrt(keyPad.length), y: Math.floor(keyPad.indexOf('5') / Math.sqrt(keyPad.length)) })

        string += keyPad[final.y * Math.sqrt(keyPad.length) + final.x];
        return string;
    }, '');
}

export { part1, part2 };