// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day23/solution.ts
 * 
 * ~~ Safe Cracking ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
 */

let opcodes = {
    cpy: (cpu, args) => {
        let num;
        if (args[0].match(/[abcd]/g)) num = cpu.registers[args[0]];
        else num = parseInt(args[0]);

        cpu.registers[args[1]] = num;
        cpu.programCounter++;
    },
    inc: (cpu, args) => {
        cpu.registers[args[0]]++;
        cpu.programCounter++;
    },
    dec: (cpu, args) => {
        cpu.registers[args[0]]--;
        cpu.programCounter++;
    },
    jnz: (cpu, args) => {
        let arg0, arg1;
        if (args[0].match(/[abcd]/g)) arg0 = cpu.registers[args[0]];
        else arg0 = parseInt(args[0]);

        if (args[1].match(/[abcd]/g)) arg1 = cpu.registers[args[1]];
        else arg1 = parseInt(args[1]);

        if (arg0 != 0) cpu.programCounter += arg1;
        else cpu.programCounter++;
    },
    tgl: (cpu, args) => {
        let num;
        if (args[0].match(/[abcd]/g)) num = cpu.registers[args[0]];
        else num = parseInt(args[0]);

        let conversion = {
            cpy: 'jnz',
            inc: 'dec',
            dec: 'inc',
            jnz: 'cpy',
            tgl: 'inc'
        };

        let instruction = cpu.program[cpu.programCounter + num];
        if (instruction != null) instruction.op = conversion[instruction.op];
        cpu.programCounter++;
    }
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    let cpu = {
        registers: { a: 7, b: 0, c: 0, d: 0 },
        program: input.split('\n').map(line => {
            let tokens = line.split(' ');
            return { op: tokens[0], args: tokens.slice(1) };
        }),
        programCounter: 0
    };

    while (cpu.programCounter >= 0 && cpu.programCounter < cpu.program.length) {
        let instruction = cpu.program[cpu.programCounter];
        opcodes[instruction.op](cpu, instruction.args);
    }

    return cpu.registers.a;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    // After analyzing the code, all this does it return the factorial of input number and adds 7820 (85 * 92) to it
    // Just to save computation time, I'm just doing to solve that for 12
    let a = 12;
    let sum = 1;
    for (let i = 1; i <= a; i++) sum *= i;
    return sum + (85 * 92);
}

export { part1, part2 };