// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day13/solution.ts
 *
 * ~~ Shuttle Search ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let information = input.split('\n');
    let earliest = parseInt(information[0]);
    let busIDs = information[1].split(',').filter(value => value != 'x').map(value => parseInt(value));

    let smallest = Infinity;
    let smallestID = -1;
    for (let i = 0; i < busIDs.length; i++) {
        let amount = (Math.floor(earliest / busIDs[i]) + 1) * busIDs[i];
        if (amount < smallest) {
            smallest = amount;
            smallestID = busIDs[i];
        }
    }

    let minutesLate = smallest - earliest;
    return smallestID * minutesLate;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let information = input.split('\n');
    let busIDs = information[1].split(',').map(value => parseInt(value) || 0);

    let jump = 1;
    let timestamp = busIDs[0];
    while (true) {
        let valid = true;
        for (let i = 0; i < busIDs.length; i++) {
            if (busIDs[i] == 0) continue;
            if (((timestamp + i) % busIDs[i]) != 0) {
                valid = false;
                break;
            } else {
                jump *= busIDs[i];
            }
        }
        if (valid) return timestamp;
        timestamp += jump;
        jump = 1;
    }
};

export { part1, part2 };
