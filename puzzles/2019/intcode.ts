/**
 * puzzles/2019/intcode.ts
 *
 * this is my intcode computer implementation used in all the intcode puzzles
 *
 * by alex prosser
 * 12/24/2024
 */

class IntcodeComputer {
    program: number[];
    counter: number;
    halted: boolean;
    inputs: number[];
    outputs: number[];
    relativeBase: number;
    waitingForInput: boolean;
    fillInput: number | undefined;

    OPCODES: { [key: number]: (args: { value: number, mode: string }[]) => number };

    constructor(program: number[], fillInput?: number) {
        this.program = program;
        this.counter = 0;
        this.halted = false;
        this.inputs = [];
        this.outputs = [];
        this.relativeBase = 0;
        this.waitingForInput = false;
        this.fillInput = fillInput;

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
                if (input === undefined) {
                    if (this.fillInput !== undefined) this.program[this.parseArg(args[0], true)] = this.fillInput;
                    else this.waitingForInput = true;
                } else this.program[this.parseArg(args[0], true)] = input;
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

    copy() {
        const result = new IntcodeComputer(structuredClone(this.program));

        result.counter = this.counter;
        result.halted = this.halted;

        result.inputs = structuredClone(this.inputs);
        result.outputs = structuredClone(this.outputs);
        result.relativeBase = this.relativeBase;
        result.waitingForInput = this.waitingForInput;

        return result;
    }
}

export default IntcodeComputer;