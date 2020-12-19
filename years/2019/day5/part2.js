const input = require('fs').readFileSync('./years/2019/day5/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let program = common.parseListToInt(input, ',');
    let programCounter = 0;
    let halted = false;
    let intcodeOutput = 0;
    let intcodeInput = 5;

    let modes = {
        '0': args => {
            return program[args];
        },
        '1': args => {
            return args;
        }
    }

    let instructions = {
        '1': (rawArgs, treatedArgs) => {
            program[rawArgs[2]] = treatedArgs[0] + treatedArgs[1];
            return 4;
        },
        '2': (rawArgs, treatedArgs) => {
            program[rawArgs[2]] = treatedArgs[0] * treatedArgs[1];
            return 4;
        },
        '3': (rawArgs, treatedArgs) => {
            program[rawArgs[0]] = intcodeInput || parseInt(common.prompt('Intcode Computer request input: '));
            return 2;
        },
        '4': (rawArgs, treatedArgs) => {
            intcodeOutput = treatedArgs[0];
            return 2;
        },
        '5': (rawArgs, treatedArgs) => {
            if (treatedArgs[0] != 0) {
                programCounter = treatedArgs[1];
                return 0;
            }
            return 3;
        },
        '6': (rawArgs, treatedArgs) => {
            if (treatedArgs[0] == 0) {
                programCounter = treatedArgs[1];
                return 0;
            }
            return 3;
        },
        '7': (rawArgs, treatedArgs) => {
            program[rawArgs[2]] = (treatedArgs[0] < treatedArgs[1]) ? 1 : 0;
            return 4;
        },
        '8': (rawArgs, treatedArgs) => {
            program[rawArgs[2]] = (treatedArgs[0] == treatedArgs[1]) ? 1 : 0;
            return 4;
        },
        '99': (rawArgs, treatedArgs) => {
            halted = true;
            return 1;
        }
    }

    while (!halted) {
        let opcode = program[programCounter] % 100;
        let rawArgs = [];
        let treatedArgs = [];
        for (let i = 1; i <= 3; i++) {
            rawArgs.push(program[programCounter + i]);
            treatedArgs.push(modes[parseInt(program[programCounter].toString().padStart(5, '0').charAt(3 - i))](program[programCounter + i]));
        }

        let offset = instructions[opcode](rawArgs, treatedArgs);
        programCounter += offset;
    }

    return intcodeOutput;
}