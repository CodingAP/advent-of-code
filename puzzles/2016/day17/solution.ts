// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day17/solution.ts
 * 
 * ~~ Two Steps Forward ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
 */

import { crypto } from '@std/crypto';

/**
 * returns an md5 hash for the given string.
 *
 * @param {string} content - the string to hash.
 * @returns {string} the md5 hash of the input string in hexadecimal format.
 */
const md5 = (content) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = crypto.subtle.digestSync('md5', data);
    return Array.from(new Uint8Array(hashBuffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
};

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    let finalPath = '';
    let queue = [{ path: [{ x: 0, y: 0 }], hash: input }];

    while (queue.length > 0 && finalPath == '') {
        let current = queue.shift();
        let position = current.path[current.path.length - 1];

        let directionMappings = { U: { x: 0, y: -1 }, D: { x: 0, y: 1 }, L: { x: -1, y: 0 }, R: { x: 1, y: 0 } };
        let directions = md5(current.hash).slice(0, 4).split('').map((letter, index) => {
            if (letter.match(/[bcdef]/g)) return ['U', 'D', 'L', 'R'][index];
            return null;
        });

        for (let direction of directions) {
            if (direction == null) continue;
            let newPosition = { x: position.x + directionMappings[direction].x, y: position.y + directionMappings[direction].y };
            if (newPosition.x == 3 && newPosition.y == 3) finalPath = (current.hash + direction).slice(input.length);

            if (newPosition.x < 0 || newPosition.x >= 4 ||
                newPosition.y < 0 || newPosition.y >= 4) {
                continue;
            }

            queue.push({ path: current.path.concat([newPosition]), hash: current.hash + direction });
        }
    }

    return finalPath;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let queue = [{ path: [{ x: 0, y: 0 }], hash: input }];
    let longest = -Infinity;

    while (queue.length > 0) {
        let current = queue.shift();
        let position = current.path[current.path.length - 1];

        let directionMappings = { U: { x: 0, y: -1 }, D: { x: 0, y: 1 }, L: { x: -1, y: 0 }, R: { x: 1, y: 0 } };
        let directions = md5(current.hash).slice(0, 4).split('').map((letter, index) => {
            if (letter.match(/[bcdef]/g)) return ['U', 'D', 'L', 'R'][index];
            return null;
        });

        for (let direction of directions) {
            if (direction == null) continue;
            let newPosition = { x: position.x + directionMappings[direction].x, y: position.y + directionMappings[direction].y };
            if (newPosition.x == 3 && newPosition.y == 3) longest = Math.max((current.hash + direction).length - input.length, longest); else {
                if (newPosition.x < 0 || newPosition.x >= 4 ||
                    newPosition.y < 0 || newPosition.y >= 4) {
                    continue;
                }

                queue.push({ path: current.path.concat([newPosition]), hash: current.hash + direction });
            }
        }
    }

    return longest;
}

export { part1, part2 };