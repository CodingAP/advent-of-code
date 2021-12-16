const common = require('../../../scripts/common');

class Intcode {
    constructor() {
        this.program = [];
        this.programCounter = 0;
        this.halted = false;

        this.opcodes = {};

        this.opcodes[1] = args => {
            this.program[args[2].actual] = args[0].value + args[1].value;
            return 4;
        }

        this.opcodes[2] = args => {
            this.program[args[2].actual] = args[0].value * args[1].value;
            return 4;
        }

        this.opcodes[3] = args => {
            this.program[args[0].actual] = this.onInput();
            return 2;
        }

        this.opcodes[4] = args => {
            this.onOutput(args[0].value);
            return 2;
        }

        this.opcodes[5] = args => {
            if (args[0].value != 0) {
                this.programCounter = args[1].value;
                return 0;
            }
            return 3;
        }

        this.opcodes[6] = args => {
            if (args[0].value == 0) {
                this.programCounter = args[1].value;
                return 0;
            }
            return 3;
        }

        this.opcodes[7] = args => {
            this.program[args[2].actual] = (args[0].value < args[1].value) ? 1 : 0;
            return 4;
        }

        this.opcodes[8] = args => {
            this.program[args[2].actual] = (args[0].value == args[1].value) ? 1 : 0;
            return 4;
        }

        this.opcodes[99] = args => {
            this.halted = true;
            return 0;
        }

        this.parameterModes = {};

        this.parameterModes[0] = value => {
            return this.program[value];
        }

        this.parameterModes[1] = value => {
            return value;
        }
    }

    onInput() {
        return 0;
    }

    onOutput(output) {
        console.log('Intcode: ' + output);
    }

    insertProgram(numbers) {
        this.program = numbers;
    }

    run() {
        while (!this.halted) {
            let args = [];

            let opcode = this.program[this.programCounter];
            for (let i = 0; i < 3; i++) {
                let parameterMode = Math.floor(opcode / Math.pow(10, i + 2)) % 10;
                args.push({
                    value: this.parameterModes[parameterMode](this.program[this.programCounter + i + 1]),
                    actual: this.program[this.programCounter + i + 1],
                    type: parameterMode
                });
            }

            let offset = this.opcodes[opcode % 100](args);
            this.programCounter += offset;
        }
    }
}

let computer = new Intcode();
computer.insertProgram(common.parseListToInt(common.readInput(5, 2019), ','));

computer.onInput = () => {
    return 5;
}

computer.run();