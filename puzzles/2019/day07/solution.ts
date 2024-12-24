/**
 * puzzles/2019/day07/solution.ts
 *
 * ~~ Amplification Circuit ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/20/2024
 */

import IntcodeComputer from '../intcode.ts';

const permutation = (array: number[]): number[][] => {
    const results: number[][] = [];

    const helper = (arr: number[], temp: number[] = []) => {
        if (arr.length === 0) {
            results.push([...temp]);
            return;
        }

        for (let i = 0; i < arr.length; i++) {
            const current = arr[i];
            const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
            helper(remaining, [...temp, current]);
        }
    }

    helper(array);
    return results;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const program = input.trim().split(',').map(num => parseInt(num));
    
    return permutation([0, 1, 2, 3, 4]).reduce((max, settings) => {
        let output = 0;
        for (let i = 0; i < settings.length; i++) {
            const computer = new IntcodeComputer([...program]);

            computer.inputs = [settings[i], output];
            computer.run();

            output = computer.outputs[0];
        }
        return Math.max(max, output);
    }, -Infinity);
}

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const program = input.trim().split(',').map(num => parseInt(num));

    return permutation([5, 6, 7, 8, 9]).reduce((highest, settings) => {
        const computers = new Array(5).fill('').map((_, index) => {
            const computer = new IntcodeComputer([...program]);
            computer.inputs = [settings[index]];
            computer.runInstruction();
            return computer;
        });

        let currentComputer = 0;
        computers[currentComputer].inputs.push(0);
        while (!computers.reduce((allHalted, computer) => (!computer.halted) ? false : allHalted, true)) {
            while (computers[currentComputer].outputs.length === 0 && !computers[currentComputer].halted) computers[currentComputer].runInstruction();

            if (computers[currentComputer].outputs.length > 0) {
                computers[(currentComputer + 1) % computers.length].inputs.push(computers[currentComputer].outputs[0]);
                computers[currentComputer].outputs = [];
            }

            currentComputer = (currentComputer + 1) % computers.length;
        }
        return Math.max(highest, computers[0].inputs[0]);
    }, -Infinity);
}

export { part1, part2 };