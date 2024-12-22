/**
 * puzzles/2019/day15/solution.ts
 *
 * ~~ Oxygen System ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/21/2024
 */

class IntcodeComputer {
    program: number[];
    counter: number;
    halted: boolean;

    input: number[];
    output: number[];
    relative: number;

    OPCODES: { [key: number]: (computer: IntcodeComputer, argModes: string[], args: number[] ) => number };

    constructor() {
        this.program = [];
        this.counter = 0;
        this.halted = false;

        this.input = [];
        this.output = [];
        this.relative = 0;
        
        this.OPCODES = {
            1: (computer, argModes, args) => {
                computer.program[computer.getArg(argModes[2], args[2], true)] = computer.getArg(argModes[0], args[0], false) + computer.getArg(argModes[1], args[1], false); 
                return 4;
            },
            2: (computer, argModes, args) => {
                computer.program[computer.getArg(argModes[2], args[2], true)] = computer.getArg(argModes[0], args[0], false) * computer.getArg(argModes[1], args[1], false); 
                return 4;
            },
            3: (computer, argModes, args) => {
                computer.program[computer.getArg(argModes[0], args[0], true)] = computer.input.shift() as number; 
                return 2;
            },
            4: (computer, argModes, args) => {
                computer.output.push(computer.getArg(argModes[0], args[0], false));
                return 2;
            },
            5: (computer, argModes, args) => {
                if (computer.getArg(argModes[0], args[0], false) !== 0) {
                    computer.counter = computer.getArg(argModes[1], args[1], false);
                    return 0; 
                } 
                return 3;
            },
            6: (computer, argModes, args) => {
                if (computer.getArg(argModes[0], args[0], false) === 0) {
                    computer.counter = computer.getArg(argModes[1], args[1], false);
                    return 0; 
                } 
                return 3;
            },
            7: (computer, argModes, args) => {
                computer.program[computer.getArg(argModes[2], args[2], true)] = (computer.getArg(argModes[0], args[0], false) < computer.getArg(argModes[1], args[1], false)) ? 1 : 0; 
                return 4;
            },
            8: (computer, argModes, args) => {
                computer.program[computer.getArg(argModes[2], args[2], true)] = (computer.getArg(argModes[0], args[0], false) === computer.getArg(argModes[1], args[1], false)) ? 1 : 0;
                return 4;
            },
            9: (computer, argModes, args) => {
                computer.relative += computer.getArg(argModes[0], args[0], false); 
                return 2;
            },
            99: (computer, argModes, args) => {
                computer.halted = true;
                return 1;
            }
        }
    }

    getArg(mode: string, arg: number, input: boolean) {
        if (mode === '0') { // positional
            if (input) return arg;
            return this.program[arg]
        } else if (mode === '1') {
            return arg;
        } else if (mode === '2') {
            if (input) return arg + this.relative;
            return this.program[arg + this.relative];
        }
        return -1;
    }

    reset() {
        this.program = [];
        this.counter = 0;
        this.halted = false;

        this.input = [];
        this.output = [];
        this.relative = 0;
    }

    copy() {
        let result = new IntcodeComputer();

        result.program = structuredClone(this.program);
        result.counter = this.counter;
        result.halted = this.halted;

        result.input = structuredClone(this.input);
        result.output = structuredClone(this.output);
        result.relative = this.relative;

        return result;
    }

    loadProgram(input: number[]) {
        this.program = input;
    }

    run() {
        while (!this.halted) this.runInstruction();
    }

    runInstruction() {
        if (this.halted) return;

        const opcode = this.program[this.counter] % 100;
        const argModes = Math.floor(this.program[this.counter] / 100).toString().padStart(3, '0').split('').reverse();
        const args = this.program.slice(this.counter + 1, this.counter + 4);

        const jump = this.OPCODES[opcode](this, argModes, args);
        this.counter += jump;
    }

    runUntilOutput() {
        while (this.output.length === 0 && !this.halted) this.runInstruction();
        return this.output.shift();
    }
}

const DIRECTIONS: { [key: string]: { x: number, y: number }} = {
    1: { x: 0, y: 1 },
    2: { x: 0, y: -1 },
    3: { x: -1, y: 0 },
    4: { x: 1, y: 0 },
};

const generateMaze = (program: number[]) => {
    const starting = { x: 0, y: 0, computer: new IntcodeComputer(), steps: 0 };
    starting.computer.loadProgram(program);
    const queue = [starting];
    const visited = new Set<string>();

    const instructions = Object.keys(DIRECTIONS);
    const walls = new Set<string>();
    let oxygen = { x: 0, y: 0, steps: 0 };

    while (queue.length !== 0) {
        const current = queue.shift();
        if (current === undefined) break;

        for (const instruction of instructions) {
            const position = { x: current.x + DIRECTIONS[instruction].x, y: current.y + DIRECTIONS[instruction].y };
            if (visited.has(`${position.x},${position.y}`)) continue;

            const newComputer = current.computer.copy();

            newComputer.input.push(parseInt(instruction));
            const response = newComputer.runUntilOutput();
            if (response === undefined) continue;

            if (response === 0) {
                walls.add(`${position.x},${position.y}`);
            } else {
                queue.push({ ...position, computer: newComputer, steps: current.steps + 1 });
                visited.add(`${position.x},${position.y}`);
                if (response === 2) oxygen = { ...position, steps: current.steps + 1 };
            }
        }
    }

    return { walls, oxygen };
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const program = input.trim().split(',').map(num => parseInt(num));

    return generateMaze(program).oxygen.steps;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const program = input.trim().split(',').map(num => parseInt(num));

    const { walls, oxygen } = generateMaze(program);

    const queue = [{ x: oxygen.x, y: oxygen.y, steps: 0 }];
    const visited = new Set<string>();

    let max = -Infinity;
    while (queue.length !== 0) {
        const current = queue.shift();
        if (current === undefined) break;

        Object.values(DIRECTIONS).forEach(direction => {
            const position = { x: current.x + direction.x, y: current.y + direction.y };
            if (walls.has(`${position.x},${position.y}`) || visited.has(`${position.x},${position.y}`)) return;

            queue.push({ ...position, steps: current.steps + 1 });
            visited.add(`${position.x},${position.y}`);

            max = Math.max(max, current.steps + 1);
        });
    }

    return max;
};

export { part1, part2 };
