/**
 * puzzles/2019/day23/solution.ts
 *
 * ~~ Category Six ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/23/2024
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
                const input = computer.input.shift();
                if (input === undefined) computer.program[computer.getArg(argModes[0], args[0], true)] = -1;
                else computer.program[computer.getArg(argModes[0], args[0], true)] = input;
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

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const program = input.trim().split(',').map(num => parseInt(num));
    const network = new Array(50).fill('').map((_, i) => {
        const computer = new IntcodeComputer();
        computer.loadProgram([...program]);
        computer.input.push(i);
        computer.runInstruction();
        return computer;
    });

    while (true) {
        for (let i = 0; i < network.length; i++) {
            network[i].runInstruction();
            if (network[i].output.length === 3) {
                const [address, x, y] = network[i].output;
                network[i].output = [];

                if (address === 255) return y;

                network[address].input.push(x, y);
            }   
        }
    }
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const program = input.trim().split(',').map(num => parseInt(num));
    const network = new Array(50).fill('').map((_, i) => {
        const computer = new IntcodeComputer();
        computer.loadProgram([...program]);
        computer.input.push(i);
        computer.runInstruction();
        return computer;
    });

    let nat: number[] = new Array(2).fill(-1);
    const previous = new Set<number>();

    let timeSinceLastOutput = 0;
    while (true) {
        timeSinceLastOutput++;
        for (let i = 0; i < network.length; i++) {
            network[i].runInstruction();
            if (network[i].output.length === 3) {
                const [address, x, y] = network[i].output;
                network[i].output = [];
                timeSinceLastOutput = 0;

                if (address === 255) nat = [x, y];
                else network[address].input.push(x, y);
            }   
        }

        // all the computers time out
        if (timeSinceLastOutput > 1000) {
            network[0].input.push(...nat);
            if (previous.has(nat[1])) return nat[1];
            previous.add(nat[1]);
            timeSinceLastOutput = 0;
        }
    }
};

export { part1, part2 };
