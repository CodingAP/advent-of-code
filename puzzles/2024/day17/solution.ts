/**
 * puzzles/2024/day17/solution.ts
 *
 * ~~ Chronospatial Computer ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/17/2024
 */

interface ProgramState {
    registers: bigint[];
    counter: number;
    output: bigint[];
};

// constants to access the registers through letters
const A = 0, B = 1, C = 2;

// return the combo argument given the argument
const getArg = (state: ProgramState, arg: bigint): bigint => {
    if (arg <= 3n) return arg;
    if (arg === 4n) return state.registers[A];
    if (arg === 5n) return state.registers[B];
    if (arg === 6n) return state.registers[C];
    return 0n;
};

// a mapping of instructions given the name
const INSTRUCTIONS: { [key: string]: (state: ProgramState, arg: bigint) => boolean } = {
    adv: (state, arg) => {
        state.registers[A] = state.registers[A] >> getArg(state, arg);
        return false;
    },
    bxl: (state, arg) => {
        state.registers[B] = state.registers[B] ^ arg;
        return false;
    },
    bst: (state, arg) => {
        state.registers[B] = getArg(state, arg) & 7n;
        return false;
    },
    jnz: (state, arg) => {
        if (state.registers[A] !== 0n) state.counter = Number(arg);
        return (state.registers[A] !== 0n);
    },
    bxc: (state, arg) => {
        state.registers[B] = state.registers[B] ^ state.registers[C];
        return false;
    },
    out: (state, arg) => {
        state.output.push(getArg(state, arg) & 7n);
        return false;
    },
    bdv: (state, arg) => {
        state.registers[B] = state.registers[A] >> getArg(state, arg);
        return false;
    },
    cdv: (state, arg) => {
        state.registers[C] = state.registers[A] >> getArg(state, arg);
        return false;
    }
};

// a mapping between the name and the opcode number
const OPCODES: string[] = ['adv', 'bxl', 'bst', 'jnz', 'bxc', 'out', 'bdv', 'cdv'];

// runs the program given the inital A register
const runProgram = (a: bigint, instructions: bigint[]) => {
    const programState: ProgramState = {
        registers: [a, 0n, 0n],
        counter: 0,
        output: []
    }

    while (true) {
        const instruction = instructions[programState.counter];
        const arg = instructions[programState.counter + 1];
        const isJump = INSTRUCTIONS[OPCODES[Number(instruction)]](programState, arg);

        // only increment by 2 is no jump occurred
        programState.counter += isJump ? 0 : 2;

        if (programState.counter < 0 || programState.counter >= instructions.length) break;
    }

    return programState;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // get registers and instructions
    const parts = input.split('\n\n');
    const registers = parts[0].split('\n').map(line => BigInt(line.split(': ')[1]));
    const instructions = parts[1].split(': ')[1].split(',').map(num => BigInt(num));

    // return the output
    return runProgram(registers[0], instructions).output.join(',');
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const instructions = input.split('\n\n')[1].split(': ')[1].split(',').map(num => BigInt(num));

    // recursively search the a values until the right output comes out
    // uses the fact that the program only checks three bits
    // that means to tru all digits, we must use 8^i iterations to move to the next option
    // also everything must be a bigint because bitwise operations doesn't work on large numbers
    const searchA = (value: bigint, current: number): bigint => {
        if (current < 0) return value;

        for (let i = value << 3n; i < (value << 3n) + 8n; i++) {
            const { output } = runProgram(i, instructions);
            if (output[0] === instructions[current]) {
                const finalVal = searchA(i, current - 1);
                if (finalVal !== -1n) return finalVal;
            }
        }

        return -1n;
    };

    // start searching from the end
    return searchA(0n, instructions.length - 1);
};

export { part1, part2 };
