/**
 * puzzles/2021/day24/solution.ts
 *
 * ~~ Arithmetic Logic Unit ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

type Registers = { x: number, y: number, z: number, w: number };

interface ProgramState {
    registers: Registers;
    input: number[];
};

const getArg = (state: ProgramState, arg: string): number => {
    if (arg.match(/[xyzw]/) !== null) return state.registers[arg as keyof Registers];
    else return parseInt(arg);
};

const INSTRUCTIONS: { [key: string]: (state: ProgramState, args: string[]) => void } = {
    inp: (state, args) => state.registers[args[0] as keyof Registers] = state.input.shift() as number,
    add: (state, args) => state.registers[args[0] as keyof Registers] += getArg(state, args[1]),
    mul: (state, args) => state.registers[args[0] as keyof Registers] *= getArg(state, args[1]),
    div: (state, args) => state.registers[args[0] as keyof Registers] = Math.floor(state.registers[args[0] as keyof Registers] / getArg(state, args[1])),
    mod: (state, args) => state.registers[args[0] as keyof Registers] %= getArg(state, args[1]),
    eql: (state, args) => state.registers[args[0] as keyof Registers] = (state.registers[args[0] as keyof Registers] === getArg(state, args[1])) ? 1 : 0,
};

const runProgram = (program: string[], modelNumber: number) => {
    const state = {
        registers: { x: 0, y: 0, z: 0, w: 0 },
        input: modelNumber.toString().split('').map(num => parseInt(num))
    };

    for (let i = 0; i < program.length; i++) {
        const [instruction, ...args] = program[i].split(' ');
        INSTRUCTIONS[instruction](state, args);
        console.log(program[i])
        console.log(state);
    }

    return state.registers.z === 0;
} 

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const modelNumber = 39999698799429;
    if (runProgram(input.trim().split('\n'), modelNumber)) return modelNumber;
    return -1;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const modelNumber = 18116121134117;
    if (runProgram(input.trim().split('\n'), modelNumber)) return modelNumber;
    return -1;
};

export { part1, part2 };
