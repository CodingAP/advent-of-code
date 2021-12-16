const common = require('../../../scripts/common');

class Intcode {
    constructor() {
        this.program = [];
        this.programCounter = 0;
        this.halted = false;

        this.opcodes = {};

        this.opcodes[1] = (...args) => {
            this.program[this.program[this.programCounter + 3]] = this.program[this.program[this.programCounter + 1]] + this.program[this.program[this.programCounter + 2]];
            return 4;
        }

        this.opcodes[2] = (...args) => {
            this.program[this.program[this.programCounter + 3]] = this.program[this.program[this.programCounter + 1]] * this.program[this.program[this.programCounter + 2]];
            return 4;
        }

        this.opcodes[99] = (...args) => {
            this.halted = true;
            return 0;
        }
    }

    insertProgram(numbers) {
        this.program = numbers;
    }

    run() {
        while (!this.halted) {
            let offset = this.opcodes[this.program[this.programCounter]]();
            this.programCounter += offset;
        }
    }
}

let computer = new Intcode();
computer.insertProgram(common.parseListToInt(common.readInput(2, 2019), ','));
computer.program[1] = 12;
computer.program[2] = 2;
computer.run();
console.log(computer.program[0]);