/**
 * puzzles/2019/day19/solution.ts
 *
 * ~~ Tractor Beam ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/21/2024
 */

import IntcodeComputer from '../intcode.ts';

const runBeam = (x: number, y: number, program: number[]) => {
    const computer = new IntcodeComputer([...program]);

    computer.inputs = [x, y];
    computer.run();

    return (computer.outputs[0] === 1);
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const program = input.split(',').map(num => parseInt(num));
    let amount = 0;
    for (let y = 0; y < 50; y++) {
        for (let x = 0; x < 50; x++) {
            if (runBeam(x, y, program)) amount++;
        }
    }
    return amount;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const program = input.split(',').map(num => parseInt(num));
    const current = { x: 0, y: 0 };
    const SEARCH_SIZE = 100;

    while (!runBeam(current.x + (SEARCH_SIZE - 1), current.y, program)) {
        current.y++;
        while (!runBeam(current.x, current.y + (SEARCH_SIZE - 1), program)) current.x++;
    }
    return current.x * 10000 + current.y;
};

export { part1, part2 };
