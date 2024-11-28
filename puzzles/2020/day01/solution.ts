// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day01/solution.ts
 *
 * ~~ Report Repair ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let numbers = input.split('\n').map(value => parseInt(value));

    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if (i == j) continue;
            if (numbers[i] + numbers[j] == 2020) return numbers[i] * numbers[j];
        }
    }

    return 0;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let numbers = input.split('\n').map(value => parseInt(value));

    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            for (let k = 0; k < numbers.length; k++) {
                if (i == j || i == k || j == k) continue;
                if (numbers[i] + numbers[j] + numbers[k] == 2020) return numbers[i] * numbers[j] * numbers[k];
            }
        }
    }

    return 0;
};

export { part1, part2 };
