const input = require('fs').readFileSync('./years/2019/day7/input.txt').toString().trim();
const common = require('../../../scripts/common');

class IntcodeComputer {
    constructor(program) {
        this.program = common.parseListToInt(program, ',');
        this.programCounter = 0;
        this.halted = false;

        this.modes = {
            '0': args => {
                return this.program[args];
            },
            '1': args => {
                return args;
            }
        }

        this.instructions = {
            '1': (rawArgs, treatedArgs) => {
                this.program[rawArgs[2]] = treatedArgs[0] + treatedArgs[1];
                return 4;
            },
            '2': (rawArgs, treatedArgs) => {
                this.program[rawArgs[2]] = treatedArgs[0] * treatedArgs[1];
                return 4;
            },
            '3': (rawArgs, treatedArgs) => {
                this.input(rawArgs[0]);
                return 2;
            },
            '4': (rawArgs, treatedArgs) => {
                this.output(treatedArgs[0]);
                return 2;
            },
            '5': (rawArgs, treatedArgs) => {
                if (treatedArgs[0] != 0) {
                    this.programCounter = treatedArgs[1];
                    return 0;
                }
                return 3;
            },
            '6': (rawArgs, treatedArgs) => {
                if (treatedArgs[0] == 0) {
                    this.programCounter = treatedArgs[1];
                    return 0;
                }
                return 3;
            },
            '7': (rawArgs, treatedArgs) => {
                this.program[rawArgs[2]] = (treatedArgs[0] < treatedArgs[1]) ? 1 : 0;
                return 4;
            },
            '8': (rawArgs, treatedArgs) => {
                this.program[rawArgs[2]] = (treatedArgs[0] == treatedArgs[1]) ? 1 : 0;
                return 4;
            },
            '99': (rawArgs, treatedArgs) => {
                this.halted = true;
                return 1;
            }
        }
    }

    runProgram() {
        while (!halted) {
            let opcode = this.program[this.programCounter] % 100;
            let rawArgs = [];
            let treatedArgs = [];
            for (let i = 1; i <= 3; i++) {
                rawArgs.push(this.program[this.programCounter + i]);
                treatedArgs.push(this.modes[parseInt(this.program[this.programCounter].toString().padStart(5, '0').charAt(3 - i))](this.program[this.programCounter + i]));
            }

            let offset = this.instructions[opcode](rawArgs, treatedArgs);
            this.programCounter += offset;
        }
    }

    output(value) {
        console.log(value);
    }

    input(address) {
        this.program[address] = 1;
    }
}

module.exports = () => {
    let highest = -Infinity;
    let firstPermutations = common.permutator([0, 1, 2, 3, 4]);
    let secondPermutations = common.permutator([5, 6, 7, 8, 9]);
    for (let i = 0; i < firstPermutations.length; i++) {
        let output = 0;
        for (let j = 0; j < firstPermutations[i].length; j++) {
            output = runProgram([firstPermutations[i][j], output]);
        }

    }
    return highest;
}