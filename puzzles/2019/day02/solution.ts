/**
 * puzzles/2019/day02/solution.ts
 *
 * ~~ 1202 Program Alarm ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/20/2024
 */

class IntcodeComputer {
    program: number[];
    counter: number;
    OPCODES: { [key: number]: (computer: IntcodeComputer, args: number[] ) => number };
    halted: boolean;

    constructor() {
        this.program = [];
        this.counter = 0;
        this.halted = false;
        
        this.OPCODES = {
            1: (computer, args) => {
                computer.program[args[2]] = computer.program[args[0]] + computer.program[args[1]]; 
                return 4;
            },
            2: (computer, args) => {
                computer.program[args[2]] = computer.program[args[0]] * computer.program[args[1]]; 
                return 4;
            },
            99: (computer, args) => {
                computer.halted = true;
                return 1;
            }
        }
    }

    reset() {
        this.program = [];
        this.counter = 0;
        this.halted = false;
    }

    loadProgram(input: number[]) {
        this.program = input;
    }

    run() {
        while (!this.halted) {
            const opcode = this.program[this.counter];
            const jump = this.OPCODES[opcode](this, this.program.slice(this.counter + 1, this.counter + 4));
            this.counter += jump;
        }
    }
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const computer = new IntcodeComputer();
    computer.loadProgram(input.trim().split(',').map(num => parseInt(num)));
    computer.program[1] = 12;
    computer.program[2] = 2;
    computer.run();

    return computer.program[0];
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const computer = new IntcodeComputer();

    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            computer.reset();
            computer.loadProgram(input.trim().split(',').map(num => parseInt(num)));

            computer.program[1] = noun;
            computer.program[2] = verb;
            
            computer.run();

            if (computer.program[0] === 19690720) return 100 * noun + verb;
        }
    }
};

export { part1, part2 };
