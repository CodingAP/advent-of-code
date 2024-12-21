/**
 * puzzles/2019/day07/solution.ts
 *
 * ~~ Amplification Circuit ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/20/2024
 */

class IntcodeComputer {
    program: number[];
    counter: number;
    halted: boolean;

    input: number[];
    output: number[];

    OPCODES: { [key: number]: (computer: IntcodeComputer, argModes: string[], args: number[] ) => number };

    constructor() {
        this.program = [];
        this.counter = 0;
        this.halted = false;

        this.input = [];
        this.output = [];
        
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
        }
        return -1;
    }

    reset() {
        this.program = [];
        this.counter = 0;
        this.halted = false;

        this.input = [];
        this.output = [];
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
}

const permutation = (array: number[]): number[][] => {
    const results: number[][] = [];

    const helper = (arr: number[], temp: number[] = []) => {
        if (arr.length === 0) {
            results.push([...temp]);
            return;
        }

        for (let i = 0; i < arr.length; i++) {
            const current = arr[i];
            const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
            helper(remaining, [...temp, current]);
        }
    }

    helper(array);
    return results;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const program = input.trim().split(',').map(num => parseInt(num));
    const computer = new IntcodeComputer();

    return permutation([0, 1, 2, 3, 4]).reduce((max, settings) => {
        let output = 0;
        for (let i = 0; i < settings.length; i++) {
            computer.reset();
            computer.loadProgram([...program]);

            computer.input = [settings[i], output];
            computer.run();

            output = computer.output[0];
        }
        return Math.max(max, output);
    }, -Infinity);
}

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const program = input.trim().split(',').map(num => parseInt(num));

    const computers = new Array(5).fill('').map((_, index) => new IntcodeComputer());

    return permutation([5, 6, 7, 8, 9]).reduce((highest, settings) => {
        computers.forEach((computer, i) => {
            computer.reset();
            computer.loadProgram([...program]);

            computer.input = [settings[i]];
            computer.runInstruction();
        })

        let currentComputer = 0;
        computers[currentComputer].input.push(0);
        while (!computers.reduce((allHalted, computer) => (!computer.halted) ? false : allHalted, true)) {
            while (computers[currentComputer].output.length === 0 && !computers[currentComputer].halted) computers[currentComputer].runInstruction();

            if (computers[currentComputer].output.length > 0) {
                computers[(currentComputer + 1) % computers.length].input.push(computers[currentComputer].output[0]);
                computers[currentComputer].output = [];
            }

            currentComputer = (currentComputer + 1) % computers.length;
        }
        return Math.max(highest, computers[0].input[0]);
    }, -Infinity);
}

export { part1, part2 };