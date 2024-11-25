// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2022/day9/solution.ts
 * 
 * ~~ Rope Bridge ~~
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
    let moves = input.split('\n').map(line => {
        let [direction, number] = line.split(' ');
        return { direction, number: parseInt(number) };
    });

    let head = { x: 0, y: 0 };
    let tail = { x: 0, y: 0 };
    let direction = {
        L: { x: -1, y:  0 },
        R: { x:  1, y:  0 },
        U: { x:  0, y: -1 },
        D: { x:  0, y:  1 }
    }

    let positions = new Set(['0,0']);

    moves.forEach(move => {
        for (let step = 0; step < move.number; step++) {
            head.x += direction[move.direction].x;
            head.y += direction[move.direction].y;

            let distX = head.x - tail.x;
            let distY = head.y - tail.y;

            if (Math.abs(distX) >= 2) {
                tail.x += Math.sign(distX);
                if (Math.abs(distY) != 0) tail.y += Math.sign(distY);
            } else if (Math.abs(distY) >= 2) {
                tail.y += Math.sign(distY);
                if (Math.abs(distX) != 0) tail.x += Math.sign(distX);
            }
            
            positions.add(`${tail.x},${tail.y}`);
        }
    })

    return positions.size;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let moves = input.split('\n').map(line => {
        let [direction, number] = line.split(' ');
        return { direction, number: parseInt(number) };
    });

    let body = new Array(10).fill(0).map(element => {
        return { x: 0, y: 0 };
    });

    let direction = {
        L: { x: -1, y:  0 },
        R: { x:  1, y:  0 },
        U: { x:  0, y: -1 },
        D: { x:  0, y:  1 }
    }

    let positions = new Set(['0,0']);

    moves.forEach(move => {
        for (let step = 0; step < move.number; step++) {
            body[0].x += direction[move.direction].x;
            body[0].y += direction[move.direction].y;

            for (let i = 1; i < body.length; i++) {
                let distX = body[i - 1].x - body[i].x;
                let distY = body[i - 1].y - body[i].y;

                if (Math.abs(distX) >= 2) {
                    body[i].x += Math.sign(distX);
                    if (Math.abs(distY) != 0) body[i].y += Math.sign(distY);
                } else if (Math.abs(distY) >= 2) {
                    body[i].y += Math.sign(distY);
                    if (Math.abs(distX) != 0) body[i].x += Math.sign(distX);
                }
            }

            positions.add(`${body[body.length - 1].x},${body[body.length - 1].y}`);
        }
    })

    return positions.size;
}

export { part1, part2 };