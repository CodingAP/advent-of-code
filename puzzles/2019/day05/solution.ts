/**
 * puzzles/2019/day05/solution.ts
 *
 * ~~ Sunny with a Chance of Asteroids ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/20/2024
 */

import IntcodeComputer from '../intcode.ts';

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const computer = new IntcodeComputer(input.trim().split(',').map(num => parseInt(num)));
    computer.inputs = [1];
    computer.run();

    return computer.outputs.at(-1);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const computer = new IntcodeComputer(input.trim().split(',').map(num => parseInt(num)));
    computer.inputs = [5];
    computer.run();

    return computer.outputs.at(-1);
};

export { part1, part2 };
