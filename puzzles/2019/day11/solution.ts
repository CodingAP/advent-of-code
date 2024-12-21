/**
 * puzzles/2019/day11/solution.ts
 *
 * ~~ Space Police ~~
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

const DIRECTIONS = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }];

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const computer = new IntcodeComputer();
    computer.loadProgram(input.trim().split(',').map(num => parseInt(num)));

    const robot = { x: 0, y: 0, direction: 0 };
    const panels: { [key: string]: number } = { [`${robot.x},${robot.y}`]: 0 };

    computer.input.push(panels[`${robot.x},${robot.y}`]);

    while (!computer.halted) {
        const color = computer.runUntilOutput();
        if (color === undefined) break;
        const direction = computer.runUntilOutput();
        if (direction === undefined) break;

        panels[`${robot.x},${robot.y}`] = color;
        robot.direction = (robot.direction + (direction === 0 ? 3 : 1)) % DIRECTIONS.length;
        robot.x += DIRECTIONS[robot.direction].x;
        robot.y += DIRECTIONS[robot.direction].y;

        if (panels[`${robot.x},${robot.y}`] === undefined) panels[`${robot.x},${robot.y}`] = 0;
        computer.input.push(panels[`${robot.x},${robot.y}`]);
    }

    return Object.values(panels).length;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const computer = new IntcodeComputer();
    computer.loadProgram(input.trim().split(',').map(num => parseInt(num)));

    const robot = { x: 0, y: 0, direction: 0 };
    const panels: { [key: string]: number } = { [`${robot.x},${robot.y}`]: 1 };

    computer.input.push(panels[`${robot.x},${robot.y}`]);

    while (!computer.halted) {
        const color = computer.runUntilOutput();
        if (color === undefined) break;
        const direction = computer.runUntilOutput();
        if (direction === undefined) break;

        panels[`${robot.x},${robot.y}`] = color;
        robot.direction = (robot.direction + (direction === 0 ? 3 : 1)) % DIRECTIONS.length;
        robot.x += DIRECTIONS[robot.direction].x;
        robot.y += DIRECTIONS[robot.direction].y;

        if (panels[`${robot.x},${robot.y}`] === undefined) panels[`${robot.x},${robot.y}`] = 0;
        computer.input.push(panels[`${robot.x},${robot.y}`]);
    }

    const coords = Object.keys(panels).map(position => position.split(',').map(num => parseInt(num)));
    const minX = Math.min(...coords.map(coord => coord[0]));
    const maxX = Math.max(...coords.map(coord => coord[0]));
    const minY = Math.min(...coords.map(coord => coord[1]));
    const maxY = Math.max(...coords.map(coord => coord[1]));

    for (let y = maxY; y >= minY; y--) {
        let row = '';
        for (let x = minX; x <= maxX; x++) {
            if (panels[`${x},${y}`] === 1) row += '#';
            else row += ' ';
        }
        console.log(row);
    }

    return 'HCZRUGAZ';
};

export { part1, part2 };
