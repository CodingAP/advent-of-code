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
    const crabs = input.split(',').map(num => parseInt(num));

    // try all positions to see which one minimizes the fuel
    let leastFuel = Infinity;
    const maxPosition = Math.max(...crabs);
    for (let i = 1; i < maxPosition; i++) {
        let fuel = 0;
        for (let j = 0; j < crabs.length; j++) {
            const distance = Math.abs(crabs[j] - i);
            fuel += distance;
        }
        leastFuel = Math.min(leastFuel, fuel)
    }
    
    return leastFuel;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const crabs = input.split(',').map(num => parseInt(num));

    // try all positions to see which one minimizes the fuel
    let leastFuel = Infinity;
    const maxPosition = Math.max(...crabs);
    for (let i = 1; i < maxPosition; i++) {
        let fuel = 0;
        for (let j = 0; j < crabs.length; j++) {
            const distance = Math.abs(crabs[j] - i);
            // use n(n+1)/2 to quickly find fuel
            fuel += (distance) * (distance + 1) / 2;
        }
        leastFuel = Math.min(leastFuel, fuel);
    }

    return leastFuel;
};

export { part1, part2 };
