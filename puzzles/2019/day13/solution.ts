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
    inputs: number[];
    outputs: number[];
    relativeBase: number;
    waitingForInput: boolean;

    OPCODES: { [key: number]: (args: { value: number, mode: string }[]) => number };

    constructor(program: number[]) {
        this.program = program;
        this.counter = 0;
        this.halted = false;
        this.inputs = [];
        this.outputs = [];
        this.relativeBase = 0;
        this.waitingForInput = false;

        for (let i = 0; i < 10000; i++) {
            if (this.program[i] === null) this.program[i] = 0;
        }

        this.OPCODES = {
            1: args => { // ADD
                this.program[this.parseArg(args[2], true)] = this.parseArg(args[0]) + this.parseArg(args[1]);
                return 4;
            },
            2: args => { // MULT
                this.program[this.parseArg(args[2], true)] = this.parseArg(args[0]) * this.parseArg(args[1]);
                return 4;
            },
            3: args => { // INPUT
                const input = this.inputs.shift(); 
                if (input === undefined) this.waitingForInput = true;
                else this.program[this.parseArg(args[0], true)] = input;
                return (this.waitingForInput) ? 0 : 2;
            },
            4: args => { // OUTPUT
                this.outputs.push(this.parseArg(args[0]));
                return 2;
            },
            5: args => { // JUMP-IF-TRUE
                if (this.parseArg(args[0]) !== 0) {
                    this.counter = this.parseArg(args[1]);
                    return 0;
                }
                return 3;
            },
            6: args => { // JUMP-IF-FALSE
                if (this.parseArg(args[0]) === 0) {
                    this.counter = this.parseArg(args[1]);
                    return 0;
                }
                return 3;
            },
            7: args => { // LESS-THAN
                this.program[this.parseArg(args[2], true)] = (this.parseArg(args[0]) < this.parseArg(args[1])) ? 1 : 0;
                return 4;
            },
            8: args => { // EQUAL-TO
                this.program[this.parseArg(args[2], true)] = (this.parseArg(args[0]) === this.parseArg(args[1])) ? 1 : 0;
                return 4;
            },
            9: args => { // RELATIVE
                this.relativeBase += this.parseArg(args[0]);
                return 2;
            },
            99: _args => { // HALT
                this.halted = true;
                return 1;
            }
        };
    }

    parseArg(argument: { value: number, mode: string }, addressing = false) {
        if (argument.mode == 'POSITION') {
            if (addressing) return argument.value;
            return this.program[argument.value];
        }
        
        if (argument.mode == 'IMMEDIATE') return argument.value;
        
        if (argument.mode == 'RELATIVE') {
            if (addressing) return argument.value + this.relativeBase;
            return this.program[argument.value + this.relativeBase];
        }

        return -1;
    }

    parseOpcode(opcode: number) {
        return opcode.toString().padStart(5, '0').slice(0, 3).split('').reverse().map((digit, index) => {
            return {
                value: this.program[this.counter + index + 1],
                mode: ['POSITION', 'IMMEDIATE', 'RELATIVE'][parseInt(digit)]
            };
        });
    }

    runInstruction() {
        if (this.halted || this.waitingForInput) return;

        const opcode = this.program[this.counter];
        const args = this.parseOpcode(opcode);
        const forward = this.OPCODES[opcode % 100](args);
        this.counter += forward;
    }

    runUntilOutput() {
        while (this.outputs.length == 0 && !this.halted) this.runInstruction();
        if (this.halted || this.waitingForInput) return undefined;
        return this.outputs.shift();
    }

    runUntilInput() {
        while (!this.waitingForInput && !this.halted) this.runInstruction();
    }

    run() {
        while (!this.halted) this.runInstruction();
    }
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));

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
    const computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));
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
            computer.runUntilInput();
            computer.inputs.push(Math.sign(ball.x - paddle.x));
            computer.waitingForInput = false;
            computer.runInstruction();
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
            // console.log(row);
        }
    }

    return score;
};

export { part1, part2 };
