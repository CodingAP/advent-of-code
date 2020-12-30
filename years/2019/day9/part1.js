const input = require('fs').readFileSync('./years/2019/day9/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let program = common.parseListToInt(input, ',');
    let programCounter = 0;
    let relativeBase = 0;
    let halted = false;
    let intcodeOutput = 0;
    let intcodeInput = null;

    for (let i = 0; i < 1000; i++) {
        if (!program[i]) program[i] = 0;
    }

    let modes = {
        '0': args => {
            return program[args];
        },
        '1': args => {
            return args;
        },
        '2': args => {
            return program[relativeBase + args];
        }
    }

    let instructions = {
        '1': (rawArgs, treatedArgs) => {
            program[(treatedArgs[2].mode == '1') ? rawArgs[2] : treatedArgs[2].value] = treatedArgs[0].value + treatedArgs[1].value;
            return 4;
        },
        '2': (rawArgs, treatedArgs) => {
            program[(treatedArgs[2].mode == '1') ? rawArgs[2] : treatedArgs[2].value] = treatedArgs[0].value * treatedArgs[1].value;
            return 4;
        },
        '3': (rawArgs, treatedArgs) => {
            program[(treatedArgs[0].mode == '1') ? rawArgs[0] : treatedArgs[0].value] = intcodeInput || parseInt(common.prompt('Intcode Computer request input: '));
            return 2;
        },
        '4': (rawArgs, treatedArgs) => {
            intcodeOutput = treatedArgs[0].value;
            return 2;
        },
        '5': (rawArgs, treatedArgs) => {
            if (treatedArgs[0].value != 0) {
                programCounter = treatedArgs[1].value;
                return 0;
            }
            return 3;
        },
        '6': (rawArgs, treatedArgs) => {
            if (treatedArgs[0].value == 0) {
                programCounter = treatedArgs[1].value;
                return 0;
            }
            return 3;
        },
        '7': (rawArgs, treatedArgs) => {
            program[(treatedArgs[2].mode == '1') ? rawArgs[2] : treatedArgs[2].value] = (treatedArgs[0].value < treatedArgs[1].value) ? 1 : 0;
            return 4;
        },
        '8': (rawArgs, treatedArgs) => {
            program[(treatedArgs[2].mode == '1') ? rawArgs[2] : treatedArgs[2].value] = (treatedArgs[0].value == treatedArgs[1].value) ? 1 : 0;
            return 4;
        },
        '9': (rawArgs, treatedArgs) => {
            relativeBase += treatedArgs[0].value;
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
            let number = parseInt(program[programCounter].toString().padStart(5, '0').charAt(3 - i));
            treatedArgs.push({ mode: number, value: modes[number](program[programCounter + i]) });
        }

        let offset = instructions[opcode](rawArgs, treatedArgs);
        programCounter += offset;
    }

    return intcodeOutput;
}