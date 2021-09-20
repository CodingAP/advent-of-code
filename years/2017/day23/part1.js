const common = require('../../../scripts/common');
const input = common.readInput('./years/2017/day23/input.txt');

module.exports = () => {
    let program = input.split('\n');
    let registers = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0 };
    let programCounter = 0;
    let count = 0;

    let instructions = {
        set: args => {
            let value = null;
            if (args[1].match(/[a-z]/)) value = registers[args[1]];
            else value = parseInt(args[1]);

            registers[args[0]] = value;

            programCounter++;
        },
        sub: args => {
            let value = null;
            if (args[1].match(/[a-z]/)) value = registers[args[1]];
            else value = parseInt(args[1]);

            registers[args[0]] -= value;

            programCounter++;
        },
        mul: args => {
            let value = null;
            if (args[1].match(/[a-z]/)) value = registers[args[1]];
            else value = parseInt(args[1]);

            registers[args[0]] *= value;

            programCounter++;
            count++;
        },
        jnz: args => {
            let value1 = null;
            if (args[0].match(/[a-z]/)) value1 = registers[args[0]];
            else value1 = parseInt(args[0]);

            let value2 = null;
            if (args[1].match(/[a-z]/)) value2 = registers[args[1]];
            else value2 = parseInt(args[1]);

            if (value1 != 0) programCounter += value2;
            else programCounter++;
        }
    }

    while (true) {
        let tokens = program[programCounter].split(' ');

        instructions[tokens[0]](tokens.slice(1));

        if (programCounter < 0 || programCounter >= program.length) break;
    }

    return count;
}