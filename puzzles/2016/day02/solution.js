/**
 * aoc/puzzles/2016/day02/solution.js
 * 
 * ~~ Bathroom Security ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 10/18/2024
 */

/**
 * map of directions to calculate the next position
 */
const DIRECTIONS = {
    U: { x: 0, y: -1 },
    R: { x: 1, y: 0 },
    D: { x: 0, y: 1 },
    L: { x: -1, y: 0 },
};

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    const KEYPAD = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
    ];

    let position = { x: 1, y: 1 };
    let password = '';
    input.split(/\n/g).forEach(line => {
        for (let i = 0; i < line.length; i++) {
            let nextX = position.x + DIRECTIONS[line[i]].x;
            let nextY = position.y + DIRECTIONS[line[i]].y;

            if (nextX >= 0 && nextX < KEYPAD[0].length && nextY >= 0 && nextY < KEYPAD.length) {
                position.x = nextX;
                position.y = nextY;
            }
        }

        password += KEYPAD[position.y][position.x];
    });
    return password;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    const KEYPAD = [
        ['X', 'X', '1', 'X', 'X'],
        ['X', '2', '3', '4', 'X'],
        ['5', '6', '7', '8', '9'],
        ['X', 'A', 'B', 'C', 'X'],
        ['X', 'X', 'D', 'X', 'X'],
    ];

    let position = { x: 2, y: 2 };
    let password = '';
    input.split(/\n/g).forEach(line => {
        for (let i = 0; i < line.length; i++) {
            let nextX = position.x + DIRECTIONS[line[i]].x;
            let nextY = position.y + DIRECTIONS[line[i]].y;

            if (nextX >= 0 && nextX < KEYPAD[0].length && nextY >= 0 && nextY < KEYPAD.length && KEYPAD[nextY][nextX] !== 'X') {
                position.x = nextX;
                position.y = nextY;
            }
        }

        password += KEYPAD[position.y][position.x];
    });
    return password;
}

export { part1, part2 };