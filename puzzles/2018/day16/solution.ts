/**
 * puzzles/2018/day16/solution.ts
 *
 * ~~ Chronal Classification ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/4/2024
 */

/**
 * set of instructions and the functions of the computer
 */
const INSTRUCTIONS: { [key: string]: (registers: number[], args: number[]) => void } = {
    addr: (registers, args) => {
        registers[args[2]] = registers[args[0]] + registers[args[1]];
    },
    addi: (registers, args) => {
        registers[args[2]] = registers[args[0]] + args[1];
    },
    mulr: (registers, args) => {
        registers[args[2]] = registers[args[0]] * registers[args[1]];
    },
    muli: (registers, args) => {
        registers[args[2]] = registers[args[0]] * args[1];
    },
    banr: (registers, args) => {
        registers[args[2]] = registers[args[0]] & registers[args[1]];
    },
    bani: (registers, args) => {
        registers[args[2]] = registers[args[0]] & args[1];
    },
    bonr: (registers, args) => {
        registers[args[2]] = registers[args[0]] | registers[args[1]];
    },
    boni: (registers, args) => {
        registers[args[2]] = registers[args[0]] | args[1];
    },
    setr: (registers, args) => {
        registers[args[2]] = registers[args[0]]
    },
    seti: (registers, args) => {
        registers[args[2]] = args[0];
    },
    gtir: (registers, args) => {
        registers[args[2]] = (args[0] > registers[args[1]]) ? 1 : 0;
    },
    gtri: (registers, args) => {
        registers[args[2]] = (registers[args[0]] > args[1]) ? 1 : 0;
    },
    gtrr: (registers, args) => {
        registers[args[2]] = (registers[args[0]] > registers[args[1]]) ? 1 : 0;
    },
    eqir: (registers, args) => {
        registers[args[2]] = (args[0] === registers[args[1]]) ? 1 : 0;
    },
    eqri: (registers, args) => {
        registers[args[2]] = (registers[args[0]] === args[1]) ? 1 : 0;
    },
    eqrr: (registers, args) => {
        registers[args[2]] = (registers[args[0]] === registers[args[1]]) ? 1 : 0;
    },
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const tests = input.trim().split('\n\n\n\n')[0].split('\n\n');

    // run all instructions on the before registers to see how many instructions
    // have the same after registers
    return tests.reduce((sum, test) => {
        const [before, instruction, after] = test.split('\n');
        const beforeRegisters: number[] = JSON.parse(before.split(/:\s+/g)[1]);
        const afterRegisters: number[] = JSON.parse(after.split(/:\s+/g)[1]);

        let same = 0;
        Object.values(INSTRUCTIONS).forEach(callback => {
            const registers = structuredClone(beforeRegisters);
            callback(registers, instruction.split(/\s/g).map(num => parseInt(num)).slice(1));
            if (registers.every((num, i) => num === afterRegisters[i])) same++;
        });

        return sum + (same >= 3 ? 1 : 0); 
    }, 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const [tests, program] = input.trim().split('\n\n\n\n');
    const instructions: string[] = new Array(16).fill('');

    // figure out which instruction is which number
    while (!instructions.every(line => line !== '')) {
        tests.split('\n\n').forEach(test => {
            const [before, instruction, after] = test.split('\n');
            const beforeRegisters: number[] = JSON.parse(before.split(/:\s+/g)[1]);
            const afterRegisters: number[] = JSON.parse(after.split(/:\s+/g)[1]);
            const opcodes = instruction.split(/\s/g).map(num => parseInt(num));
    
            let works: string[] = [];
            Object.entries(INSTRUCTIONS).forEach(([name, callback]) => {
                const registers = structuredClone(beforeRegisters);
                callback(registers, opcodes.slice(1));
                if (registers.every((num, i) => num === afterRegisters[i])) works.push(name);
            });
    
            // find all instructions that haven't been assigned yet
            works = works.filter(instruction => !instructions.includes(instruction));
            if (works.length === 1) instructions[opcodes[0]] = works[0];
        });
    }

    // run the program
    const registers = new Array(4).fill(0);
    const lines = program.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const opcodes = lines[i].split(/\s/g).map(num => parseInt(num));
        INSTRUCTIONS[instructions[opcodes[0]]](registers, opcodes.slice(1));
    }

    return registers[0];
};

export { part1, part2 };
