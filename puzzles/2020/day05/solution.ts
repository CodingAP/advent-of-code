// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day05/solution.ts
 *
 * ~~ Binary Boarding ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let highestID = -Infinity;
    let ids = input.trim().split('\n');
    for (let i = 0; i < ids.length; i++) {
        let row = parseInt(ids[i].substring(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2);
        let column = parseInt(ids[i].substring(7, ids[i].length).replace(/L/g, '0').replace(/R/g, '1'), 2);
        let id = row * 8 + column;
        if (id > highestID) highestID = id;
    }
    return highestID;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let seats = new Array(128);
    for (let i = 0; i < seats.length; i++) {
        seats[i] = new Array(8);
        for (let j = 0; j < seats[i].length; j++) {
            seats[i][j] = false;
        }
    }

    let ids = input.trim().split('\n');
    for (let i = 0; i < ids.length; i++) {
        let row = parseInt(ids[i].substring(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2);
        let column = parseInt(ids[i].substring(7, ids[i].length).replace(/L/g, '0').replace(/R/g, '1'), 2);
        seats[row][column] = true;
    }

    for (let y = 0; y < seats.length; y++) {
        for (let x = 0; x < seats[y].length; x++) {
            if (!seats[y][x] && seats[y][x - 1] && seats[y][x + 1]) return y * 8 + x;
        }
    }
};

export { part1, part2 };
