/**
 * puzzles/2019/day21/solution.ts
 *
 * ~~ Springdroid Adventure ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/22/2024
 */

import IntcodeComputer from '../intcode.ts';

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const computer = new IntcodeComputer(input.trim().split(',').map(num => parseInt(num)));
    computer.inputs = 'NOT C J\nAND D J\nNOT A T\nOR T J\nWALK\n'.split('').map(character => character.charCodeAt(0));

    let row = '';
    while (!computer.halted) {
        const output = computer.runUntilOutput();
        if (output === undefined) break;
        
        if (output > 127) return output;
        if (output === 10) console.log(row);
        else row += String.fromCharCode(output);
    }
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const computer = new IntcodeComputer(input.trim().split(',').map(num => parseInt(num)));
    computer.inputs = 'NOT C J\nAND D J\nAND H J\nNOT B T\nAND D T\nOR T J\nNOT A T\nOR T J\nRUN\n'.split('').map(character => character.charCodeAt(0));

    let row = '';
    while (!computer.halted) {
        const output = computer.runUntilOutput();
        if (output === undefined) break;
        
        if (output > 127) return output;
        if (output === 10) console.log(row);
        else row += String.fromCharCode(output);
    }
};

export { part1, part2 };
