/**
 * puzzles/2019/day13/solution.ts
 *
 * ~~ Care Package ~~
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
    needsInput: boolean;

    OPCODES: { [key: number]: (computer: IntcodeComputer, argModes: string[], args: number[] ) => number };

    constructor() {
        this.program = [];
        this.counter = 0;
        this.halted = false;

        this.input = [];
        this.output = [];
        this.relative = 0;
        this.needsInput = false;
        
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
                if (input === undefined) {
                    computer.needsInput = true;
                    return 0;
                } else {
                    computer.program[computer.getArg(argModes[0], args[0], true)] = input;
                    computer.needsInput = false;
                    return 2;
                }
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
                console.log(computer.getArg(argModes[0], args[0], false));
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
            return this.program[arg];
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
        this.needsInput = false;
    }

    loadProgram(input: number[]) {
        for (let i = 0; i < input.length * 2; i++) {
            this.program[i] = (i < input.length) ? input[i] : 0; 
        }
        console.log(this.program);
    }

    run() {
        while (!this.halted) this.runInstruction();
    }

    runInstruction() {
        if (this.halted) return;

        const opcode = this.program[this.counter] % 100;
        const argModes = Math.floor(this.program[this.counter] / 100).toString().padStart(3, '0').split('').reverse();
        const args = this.program.slice(this.counter + 1, this.counter + 4);

        console.log(opcode, argModes, args);

        const jump = this.OPCODES[opcode](this, argModes, args);
        this.counter += jump;
    }

    runUntilOutput() {
        while (this.output.length === 0 && !this.halted) this.runInstruction();
        return this.output.shift();
    }

    runUntilInput(input: number) {
        while (!this.needsInput && !this.halted) this.runInstruction();
        this.input.push(input);
        this.runInstruction();
    }
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const computer = new IntcodeComputer();
    computer.loadProgram(input.split(',').map(num => parseInt(num)));

    let blocks = 0;
    while (!computer.halted) {
        const x = computer.runUntilOutput();
        if (x === undefined) break;
        const y = computer.runUntilOutput();
        if (y === undefined) break;
        const tileID = computer.runUntilOutput();
        if (tileID === undefined) break;

        if (tileID === 2) blocks++;
    }
    return blocks;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const computer = new IntcodeComputer();
    computer.loadProgram(input.split(',').map(num => parseInt(num)));
    computer.program[0] = 2;

    let ball = { x: -1, y: -1 }, paddle = { x: -1, y: -1 };
    let score = -1;

    const objects: { [key: string]: string } = {};

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    while (!computer.halted) {
        const x = computer.runUntilOutput();
        if (x === undefined) break;
        const y = computer.runUntilOutput();
        if (y === undefined) break;
        const tileID = computer.runUntilOutput();
        if (tileID === undefined) break;

        minX = Math.min(x, minX);
        maxX = Math.max(x, maxX);
        minY = Math.min(y, minY);
        maxY = Math.max(y, maxY);

        if (x === -1 && y === 0) score = tileID;
        else if (tileID === 0) objects[`${x},${y}`] = ' ';
        else if (tileID === 1) objects[`${x},${y}`] = '@';
        else if (tileID === 2) objects[`${x},${y}`] = '#';
        else if (tileID === 3) paddle = { x, y };
        else if (tileID === 4) ball = { x, y };

        if (score !== -1) {
            computer.runUntilInput(Math.sign(ball.x - paddle.x));
        }

        // print grid
        console.log(ball, paddle);
        console.log(score);
        for (let y = minY; y <= maxY; y++) {
            let row = '';
            for (let x = minX; x <= maxX; x++) {
                if (paddle.x === x && paddle.y === y) row += '=';
                else if (ball.x === x && ball.y === y) row += 'O';
                else if (objects[`${x},${y}`] !== undefined) row += objects[`${x},${y}`];
                else row += ' ';
            }
            console.log(row);
        }
    }

    return score;
};

export { part1, part2 };
