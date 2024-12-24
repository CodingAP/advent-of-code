/**
 * puzzles/2019/day13/solution.ts
 *
 * ~~ Care Package ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/21/2024
 */

import IntcodeComputer from '../intcode.ts';

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));

    let blocks = 0;
    while (!computer.halted) {
        const x = computer.runUntilOutput();
        if (x === undefined) break;
        const y = computer.runUntilOutput();
        if (y === undefined) break;
        const tileID = computer.runUntilOutput();
        if (tileID === undefined) break;

        if (tileID === 2) blocks++;
    }
    return blocks;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)), 0);
    computer.program[0] = 2;

    // that's right we're gonna cheat
    // place wall where paddle is to never lose
    for (let i = 0; i < 38; i++) computer.program[1399 + i] = 1;
    
    let score = -1;

    while (!computer.halted) {
        const x = computer.runUntilOutput();
        if (x === undefined) break;
        const y = computer.runUntilOutput();
        if (y === undefined) break;
        const tileID = computer.runUntilOutput();
        if (tileID === undefined) break;

        if (x === -1 && y === 0) score = tileID;
    }

    return score;
};

export { part1, part2 };
