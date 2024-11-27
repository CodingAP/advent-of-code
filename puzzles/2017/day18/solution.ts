/**
 * puzzles/2017/day18/solution.ts
 *
 * ~~ Duet ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

/**
 * defines the mutatable program state that opcodes can access
 */
interface ProgramState {
    send: number | null;
    receive: number[];
    registers: { [key: string]: number };
    waiting: string | null;
    halted: boolean;
    counter: number;
};

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
const OPCODES: { [key: string]: (state: ProgramState, args: string[]) => number } = {
    snd: (state, args) => {
        state.send = parseArg(state, args[0]);
        return 1;
    },
    set: (state, args) => {
        state.registers[args[0]] = parseArg(state, args[1]);
        return 1;
    },
    add: (state, args) => {
        state.registers[args[0]] = (state.registers[args[0]] || 0) + parseArg(state, args[1]);
        return 1;
    },
    mul: (state, args) => {
        state.registers[args[0]] = (state.registers[args[0]] || 0) * parseArg(state, args[1]);
        return 1;
    },
    mod: (state, args) => {
        state.registers[args[0]] = (state.registers[args[0]] || 0) % parseArg(state, args[1]);
        return 1;
    },
    rcv: (state, args) => {
        state.waiting = args[0];
        return 1;
    },
    jgz: (state, args) => {
        if (parseArg(state, args[0]) > 0) return parseArg(state, args[1]);
        return 1;
    }
};

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {    
    const program: ProgramState = {
        send: null,
        receive: [],
        registers: { p: 0 },
        waiting: null,
        halted: false,
        counter: 0
    };

    const instructions = input.trim().split('\n');
    while (true) {
        const tokens = instructions[program.counter].split(' ');
        const jump = OPCODES[tokens[0]](program, tokens.slice(1));

        if (program.waiting !== null) return program.send;

        program.counter += jump;

        if (program.counter < 0 || program.counter >= instructions.length) break;
    }

    return -1;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const programA: ProgramState = {
        send: null,
        receive: [],
        registers: { p: 0 },
        waiting: null,
        halted: false,
        counter: 0
    };

    const programB: ProgramState = {
        send: null,
        receive: [],
        registers: { p: 1 },
        waiting: null,
        halted: false,
        counter: 0
    };

    const instructions = input.trim().split('\n');
    const programs = [programA, programB];
    let count = 0;
    while (true) {
        programs.forEach((program, i) => {
            if (program.halted) return;

            if (program.waiting !== null) {
                const value = program.receive.shift();
                if (value !== undefined) {
                    program.registers[program.waiting] = value;
                    program.waiting = null;
                }
            }

            if (program.waiting === null) {
                const tokens = instructions[program.counter].split(' ');
                const jump = OPCODES[tokens[0]](program, tokens.slice(1));

                program.counter += jump;

                if (program.counter < 0 || program.counter >= instructions.length) program.halted = true;
            }
        });

        if (programA.send !== null) {
            programB.receive.push(programA.send);
            programA.send = null;
        }

        if (programB.send !== null) {
            count++;
            programA.receive.push(programB.send);
            programB.send = null;
        }

        if (programA.halted && programB.halted) break;
        if (programA.waiting !== null && programA.receive.length === 0 && programB.waiting !== null && programB.receive.length === 0) break;
    }

    return count;
};

export { part1, part2 };
