/**
 * aoc/puzzles/2015/day23/solution.js
 * 
 * ~~ Opening the Turing Lock ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

/**
 * all the instructions for the computer 
 */
const instructions = {
    hlf: (registers, args) => {
        registers[args[0]] /= 2;
        return 1;
    },
    tpl: (registers, args) => {
        registers[args[0]] *= 3;
        return 1;
    },
    inc: (registers, args) => {
        registers[args[0]]++;
        return 1;
    },
    jmp: (registers, args) => {
        return parseInt(args[0])
    },
    jie: (registers, args) => {
        if (registers[args[0]] % 2 == 0) return parseInt(args[1])
        return 1;
    },
    jio: (registers, args) => {
        if (registers[args[0]] == 1) return parseInt(args[1])
        return 1;
    }
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    let registers = { a: 0, b: 0 };
    let program = input.split(/\n/g);
    let programCounter = 0;

    while (programCounter >= 0 && programCounter < program.length) {
        let [instruction, ...args] = program[programCounter].replace(/,/g, '').split(' ');
        programCounter += instructions[instruction](registers, args);
    }

    return registers.b;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    let registers = { a: 1, b: 0 };
    let program = input.split(/\n/g);
    let programCounter = 0;

    while (programCounter >= 0 && programCounter < program.length) {
        let [instruction, ...args] = program[programCounter].replace(/,/g, '').split(' ');
        programCounter += instructions[instruction](registers, args);
    }

    return registers.b;
}

export { part1, part2 };