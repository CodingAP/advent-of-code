/**
 * puzzles/2019/day02/solution.ts
 *
 * ~~ 1202 Program Alarm ~~
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
    computer.program[1] = 12;
    computer.program[2] = 2;
    computer.run();

    return computer.program[0];
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            const computer = new IntcodeComputer(input.trim().split(',').map(num => parseInt(num)));

            computer.program[1] = noun;
            computer.program[2] = verb;
            
            computer.run();

            if (computer.program[0] === 19690720) return 100 * noun + verb;
        }
    }
};

export { part1, part2 };
