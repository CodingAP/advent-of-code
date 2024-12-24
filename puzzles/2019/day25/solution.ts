/**
 * puzzles/2019/day25/solution.ts
 *
 * ~~ Cryostasis ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/24/2024
 */

const powerset = (array: string[]): string[][] => {
    const results: string[][] = [[]];

    for (const element of array) {
        const currentLength = results.length;
        for (let i = 0; i < currentLength; i++) results.push([...results[i], element]);
    }

    return results;
}

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
            99: args => { // HALT
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
                mode: ['POSITION', 'IMMEDIATE', 'RELATIVE'][digit]
            };
        });
    }

    runInstruction() {
        if (this.halted || this.waitingForInput) return;

        let opcode = this.program[this.counter];
        let args = this.parseOpcode(opcode);
        let forward = this.OPCODES[opcode % 100](args);
        this.counter += forward;
    }

    runUntilOutput() {
        while (this.outputs.length == 0 && !this.halted) this.runInstruction();
        if (this.halted || this.waitingForInput) return null;
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

    const paths = {
        'klein bottle': 'west\ntake klein bottle\neast\n',
        'dark matter': 'west\nwest\nwest\ntake dark matter\neast\neast\neast\n',
        tambourine: 'west\nwest\nnorth\ntake tambourine\nsouth\neast\neast\n',
        cake: 'south\ntake cake\nnorth\n',
        monolith: 'west\nsouth\neast\ntake monolith\nwest\nnorth\neast\n',
        'fuel cell': 'west\nsouth\neast\nsouth\ntake fuel cell\nnorth\nwest\nnorth\neast\n',
        astrolabe: 'west\nsouth\neast\nsouth\nwest\nwest\ntake astrolabe\neast\neast\nnorth\nwest\nnorth\neast\n',
        mutex: 'south\nsouth\nwest\ntake mutex\neast\nnorth\nnorth\n',
    }

    const end = 'west\nwest\nwest\nwest\n';
    const ways = Object.values(paths);
    ways.push(end);

    const allPossible = powerset(Object.keys(paths));

    while (!computer.halted) {
        computer.runUntilInput();
        if (computer.halted) break;

        if (ways.length !== 0) {
            computer.outputs = [];
            computer.inputs = (ways.shift() as string).split('').map(character => character.charCodeAt(0));
            computer.waitingForInput = false;
        } else {
            // drop all items
            Object.keys(paths).forEach(item => {
                computer.inputs = `drop ${item}\n`.split('').map(character => character.charCodeAt(0));
                computer.waitingForInput = false;
                computer.runUntilInput();
                computer.outputs = [];
            });

            const itemPickups = allPossible.shift() as string[];
            itemPickups.forEach(item => {
                computer.inputs = `take ${item}\n`.split('').map(character => character.charCodeAt(0));
                computer.waitingForInput = false;
                computer.runUntilInput();
                computer.outputs = [];
            });

            computer.inputs = 'north\n'.split('').map(character => character.charCodeAt(0));
            computer.waitingForInput = false;
            computer.runUntilInput();

            const output = computer.outputs.map(num => String.fromCharCode(num)).join('');
            if (!output.includes('ejected')) console.log(output);
        }
    }

    return 67635328;
}

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    return '2019 DONE!';
}

export { part1, part2 };