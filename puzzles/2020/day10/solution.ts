// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day10/solution.ts
 *
 * ~~ Adapter Array ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let adapters = input.trim().split('\n').map(num => parseInt(num));
    adapters.push(0);
    adapters.sort((a, b) => a - b);
    adapters.push(adapters[adapters.length - 1] + 3);

    let diff1 = 0;
    let diff3 = 0;
    for (let i = 0; i < adapters.length - 1; i++) {
        let diff = adapters[i + 1] - adapters[i];
        if (diff == 1) diff1++;
        if (diff == 3) diff3++;
    }

    return diff1 * diff3;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let adapters = input.trim().split('\n').map(num => parseInt(num));
    adapters.push(0);
    adapters.sort((a, b) => a - b);
    adapters.push(adapters[adapters.length - 1] + 3);

    let previous = {};
    let branches = {};

    for (let i = 0; i < adapters.length; i++) {
        let possible = [];
        for (let j = 1; j <= 3; j++) {
            if (adapters.includes(adapters[i] + j)) {
                possible.push(adapters[i] + j);
            }
        }
        branches[adapters[i]] = possible;
    }

    let findPaths = number => {
        let paths = 0;
        if (previous[number]) return previous[number];
        if (number == adapters[adapters.length - 1]) return 1;
        for (let i = 0; i < branches[number].length; i++) {
            let sum = findPaths(branches[number][i]);
            paths += sum;
            previous[branches[number][i]] = sum;
        }
        return paths;
    }

    return findPaths(0);
};

export { part1, part2 };
