/**
 * puzzles/2017/day23/solution.ts
 *
 * ~~ Coprocessor Conflagration ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

/**
 * defines the mutatable program state that opcodes can access
 */
interface ProgramState {
    registers: { [key: string]: number },
    counter: number;
}

/**
 * parses an argument from a number or a register
 */
const parseArg = (state: ProgramState, arg: string): number => {
    let value: number;
    if (arg.match(/[a-z]/g)) value = state.registers[arg] || 0;
    else value = parseInt(arg);
    return value;
}

/**
 * defines all the instructions the languages can run
 */
const opcodes: { [key: string]: (state: ProgramState, args: string[]) => number } = {
    set: (state, args) => {
        state.registers[args[0]] = parseArg(state, args[1]);
        return 1;
    },
    sub: (state, args) => {
        state.registers[args[0]] -= parseArg(state, args[1]);
        return 1;
    },
    mul: (state, args) => {
        state.registers[args[0]] *= parseArg(state, args[1]);
        return 1;  
    },
    jnz: (state, args) => {
        if (parseArg(state, args[0]) != 0) return parseArg(state, args[1]);
        return 1;
    }
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const program: ProgramState = {
        registers: { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0 },
        counter: 0
    };

    const instructions = input.trim().split('\n');
    let count = 0;
    while (true) {
        const tokens = instructions[program.counter].split(' ');
        const jump = opcodes[tokens[0]](program, tokens.slice(1));
        if (tokens[0] === 'mul') count++;

        program.counter += jump;

        if (program.counter < 0 || program.counter >= instructions.length) break;
    }

    return count;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // the typical flow will not run fast enough
    // so manual decompilation must be done! decomp.txt has the analysis

    let count = 0;

    for (let i = 109300; i <= 126300; i += 17) {
        let isPrime = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) isPrime = false;
        }
        if (!isPrime) count++;
    }

    return count;
};

export { part1, part2 };
