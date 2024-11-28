// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2021/day07/solution.ts
 *
 * ~~ The Treachery of Whales ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let crabs = input.split(',').map(num => parseInt(num));

    let leastFuel = Infinity;
    let max = crabs.reduce((a, b) => Math.max(a, b));
    for (let i = 1; i < max; i++) {
        let fuel = 0;
        for (let j = 0; j < crabs.length; j++) {
            fuel += Math.abs(crabs[j] - i);
        }
        leastFuel = Math.min(leastFuel, fuel)
    }
    
    return leastFuel;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let crabs = input.split(',').map(num => parseInt(num));

    let leastFuel = Infinity;
    let max = crabs.reduce((a, b) => Math.max(a, b));
    for (let i = 1; i < max; i++) {
        let fuel = 0;
        for (let j = 0; j < crabs.length; j++) {
            let distance = Math.abs(crabs[j] - i);
            for (let k = 1; k <= distance; k++) {
                fuel += k;
            }
        }
        leastFuel = Math.min(leastFuel, fuel);
    }

    return leastFuel;
};

export { part1, part2 };
