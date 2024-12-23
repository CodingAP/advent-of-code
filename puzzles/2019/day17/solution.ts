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

const DIRECTIONS = [{ x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }];

const part1 = (input: string) => {
    const camera: { [key: string]: string } = {};
    const computer = new IntcodeComputer();
    computer.loadProgram(input.split(',').map(num => parseInt(num)));
    
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

const part2 = (input: string) => {
    const camera: { [key: string]: string } = {};
    const computer = new IntcodeComputer();
    computer.loadProgram(input.trim().split(',').map(num => parseInt(num)));
    
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

    const directionList = [];
    let steps = 0;
    while (true) {
        const newPosition = { x: robot.x + DIRECTIONS[robot.direction].x, y: robot.y + DIRECTIONS[robot.direction].y };
        if (camera[`${newPosition.x},${newPosition.y}`] != '#') {
            let left = { x: robot.x + DIRECTIONS[(robot.direction + 3) % 4].x, y: robot.y + DIRECTIONS[(robot.direction + 3) % 4].y };
            let right = { x: robot.x + DIRECTIONS[(robot.direction + 1) % 4].x, y: robot.y + DIRECTIONS[(robot.direction + 1) % 4].y };
        
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

    const vacuum = new IntcodeComputer();
    vacuum.loadProgram(input.trim().split(',').map(num => parseInt(num)))
    vacuum.program[0] = 2;
    vacuum.input = 'A,B,A,C,B,C,A,B,A,C\nR,6,L,10,R,8,R,8\nR,12,L,8,L,10\nR,12,L,10,R,6,L,10\nn\n'.split('').map(character => character.charCodeAt(0));
    vacuum.run();
    return vacuum.output.at(-1);
}

export { part1, part2 };