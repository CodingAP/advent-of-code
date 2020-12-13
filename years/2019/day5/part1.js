const input = require('fs').readFileSync('./years/2019/day5/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    return 0;
    let program = common.parseListToInt(input, ',');
    let programCounter = 0;
    let halted = false;
    let output = 0;

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
            program[rawArgs[0]] = parseInt(common.prompt('Intcode Computer request input: '));
            return 2;
        },
        '4': (rawArgs, treatedArgs) => {
            output = treatedArgs[0];
            return 2;
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

    return output;
}