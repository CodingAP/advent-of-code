/**
 * aoc/puzzles/2020/day08/solution.js
 * 
 * ~~ Handheld Halting ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/30/2023
 */

/**
 * Runs the program and sees if the program halts or runs forever, returning the accumulator
 * 
 * @param {{ name: string, arg: number }[]} program list of instructions, parsed 
 * @returns {{ accumulator: number, terminated: boolean }}
 */
const runProgram = program => {
    /**
     * instructions for the game console
     * 
     * @type {Record<string, (acc: number, args: number) => { accumulator: number, offset: number }>}
     */
    const instructions = {
        acc: (acc, arg) => {
            return { accumulator: acc + arg, offset: 1 };
        },
        jmp: (acc, arg) => {
            return { accumulator: acc, offset: arg };
        },
        nop: (acc, arg) => {
            return { accumulator: acc, offset: 1 };
        },
    };

    // run program while program counter is valid
    let programCounter = 0, previousProgramCounters = [0];
    let accumulator = 0;
    while (programCounter >= 0 && programCounter < program.length) {
        const instruction = program[programCounter];
        const results = instructions[instruction.name](accumulator, instruction.arg);

        accumulator = results.accumulator;
        programCounter += results.offset;

        if (previousProgramCounters.includes(programCounter)) return { accumulator, terminated: false };
        previousProgramCounters.push(programCounter);
    }

    return { accumulator, terminated: true };
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    const program = input.split(/\n/g).map((line) => {
        let [name, arg] = line.split(' ');
        return { name, arg: parseInt(arg) };
    });

    return runProgram(program).accumulator;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    const program = input.split(/\n/g).map((line) => {
        let [name, arg] = line.split(' ');
        return { name, arg: parseInt(arg) };
    });

    for (let i = 0; i < program.length; i++) {
        if (program[i].name == 'acc') continue;

        let newProgram = structuredClone(program);
        newProgram[i].name = (program[i].name == 'nop') ? 'jmp' : 'nop';

        let results = runProgram(newProgram);
        if (results.terminated) return results.accumulator;
    }

    return -1;
}

export { part1, part2 };