/**
 * puzzles/2019/day17/solution.ts
 *
 * ~~ Care Package ~~
 * this is my solution for this advent of code puzzle
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

const DIRECTIONS = [{ x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }];

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const camera: { [key: string]: string } = {};
    const computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));
    
    let x = 0, y = 0;
    while (!computer.halted) {
        const output = computer.runUntilOutput();
        if (output === undefined) break;

        if (output === 10) {
            x = 0;
            y++;
        } else camera[`${x++},${y}`] = String.fromCharCode(output);
    }

    return Object.keys(camera).reduce((sum, position) => {
        const [x, y] = position.split(',').map(num => parseInt(num));
        if ([...DIRECTIONS, { x: 0, y: 0 }].every(direction => camera[`${x + direction.x},${y + direction.y}`] === '#')) sum += x * y;
        return sum;
    }, 0);
}

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const camera: { [key: string]: string } = {};
    const computer = new IntcodeComputer(input.trim().split(',').map(num => parseInt(num)));
    
    let x = 0, y = 0;
    while (!computer.halted) {
        const output = computer.runUntilOutput();
        if (output === undefined) break;

        if (output === 10) {
            x = 0;
            y++;
        } else camera[`${x++},${y}`] = String.fromCharCode(output);
    }

    let robot = { x: 0, y: 0, direction: 0 };
    Object.entries(camera).forEach(position => {
        if (position[1].match(/[\<\v\^\>]/g)) {
            const [x, y] = position[0].split(',').map(num => parseInt(num));
            robot = { x, y, direction: ['<', '^', '>', 'v'].indexOf(position[1]) }; 
        }
    });

    const directionList: (number | string)[] = [];
    let steps = 0;
    while (true) {
        const newPosition = { x: robot.x + DIRECTIONS[robot.direction].x, y: robot.y + DIRECTIONS[robot.direction].y };
        if (camera[`${newPosition.x},${newPosition.y}`] != '#') {
            const left = { x: robot.x + DIRECTIONS[(robot.direction + 3) % 4].x, y: robot.y + DIRECTIONS[(robot.direction + 3) % 4].y };
            const right = { x: robot.x + DIRECTIONS[(robot.direction + 1) % 4].x, y: robot.y + DIRECTIONS[(robot.direction + 1) % 4].y };
        
            if (camera[`${left.x},${left.y}`] == '#') {
                robot.direction = (robot.direction + 3) % 4;
                directionList.push(steps, 'L');
                steps = 0;
            }
            else if (camera[`${right.x},${right.y}`] == '#') {
                robot.direction = (robot.direction + 1) % 4;
                directionList.push(steps, 'R');
                steps = 0;
            }
            else break;
        } else {
            robot.x = newPosition.x;
            robot.y = newPosition.y;
            steps++;
        }
    }
    directionList.push(steps);

    // R 6 L 10 R 8 R 8 R 12 L 8 L 10 R 6 L 10 R 8 R 8 R 12 L 10 R 6 L 10 R 12 L 8 L 10 R 12 L 10 R 6 L 10 R 6 L 10 R 8 R 8 R 12 L 8 L 10 R 6 L 10 R 8 R 8 R 12 L 10 R 6 L 10
    // Which can be broke down to...
    // A,B,A,C,B,C,A,B,A,C
    // A: R,6,L,10,R,8,R,8
    // B: R,12,L,8,L,10
    // C: R,12,L,10,R,6,L,10

    const vacuum = new IntcodeComputer(input.trim().split(',').map(num => parseInt(num)));
    vacuum.program[0] = 2;
    vacuum.inputs = 'A,B,A,C,B,C,A,B,A,C\nR,6,L,10,R,8,R,8\nR,12,L,8,L,10\nR,12,L,10,R,6,L,10\nn\n'.split('').map(character => character.charCodeAt(0));
    vacuum.run();
    return vacuum.outputs.at(-1);
}

export { part1, part2 };