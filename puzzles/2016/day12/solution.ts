// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day12/solution.ts
 * 
 * ~~ Leonardo's Monorail ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
 */

let opcodes = {
    cpy: (registers, args) => {
        let num;
        if (args[0].match(/[abcd]/g)) num = registers[args[0]];
        else num = parseInt(args[0]);
        registers[args[1]] = num;
        return 1;
    },
    inc: (registers, args) => {
        registers[args[0]]++;
        return 1;
    },
    dec: (registers, args) => {
        registers[args[0]]--;
        return 1;
    },
    jnz: (registers, args) => {
        if (registers[args[0]] != 0) return parseInt(args[1]);
        return 1;
    }
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    let registers = { a: 0, b: 0, c: 0, d: 0 };
    let programCounter = 0;
    let program = input.split('\n').map(line => {
        let tokens = line.split(' ');
        return { instruction: tokens[0], args: tokens.slice(1) };
    });

    while (programCounter >= 0 && programCounter < program.length) {
        let instruction = program[programCounter];
        programCounter += opcodes[instruction.instruction](registers, instruction.args);
    }

    return registers.a;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let registers = { a: 0, b: 0, c: 1, d: 0 };
    let programCounter = 0;
    let program = input.split('\n').map(line => {
        let tokens = line.split(' ');
        return { instruction: tokens[0], args: tokens.slice(1) };
    });

    while (programCounter >= 0 && programCounter < program.length) {
        let instruction = program[programCounter];
        programCounter += opcodes[instruction.instruction](registers, instruction.args);
    }

    return registers.a;
}

export { part1, part2 };