/**
 * puzzles/2019/day23/solution.ts
 *
 * ~~ Category Six ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/23/2024
 */

import IntcodeComputer from '../intcode.ts';

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const program = input.trim().split(',').map(num => parseInt(num));
    const network = new Array(50).fill('').map((_, i) => {
        const computer = new IntcodeComputer([...program], true);
        computer.inputs.push(i);
        computer.runInstruction();
        return computer;
    });

    while (true) {
        for (let i = 0; i < network.length; i++) {
            network[i].runInstruction();
            if (network[i].outputs.length === 3) {
                const [address, x, y] = network[i].outputs;
                network[i].outputs = [];

                if (address === 255) return y;

                network[address].inputs.push(x, y);
            }   
        }
    }
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const program = input.trim().split(',').map(num => parseInt(num));
    const network = new Array(50).fill('').map((_, i) => {
        const computer = new IntcodeComputer([...program], true);
        computer.inputs.push(i);
        computer.runInstruction();
        return computer;
    });

    let nat: number[] = new Array(2).fill(-1);
    const previous = new Set<number>();

    let timeSinceLastOutput = 0;
    while (true) {
        timeSinceLastOutput++;
        for (let i = 0; i < network.length; i++) {
            network[i].runInstruction();
            if (network[i].outputs.length === 3) {
                const [address, x, y] = network[i].outputs;
                network[i].outputs = [];
                timeSinceLastOutput = 0;

                if (address === 255) nat = [x, y];
                else network[address].inputs.push(x, y);
            }   
        }

        // all the computers time out
        if (timeSinceLastOutput > 1000) {
            network[0].inputs.push(...nat);
            if (previous.has(nat[1])) return nat[1];
            previous.add(nat[1]);
            timeSinceLastOutput = 0;
        }
    }
};

export { part1, part2 };
