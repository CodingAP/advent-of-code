const input = require('fs').readFileSync('./years/2016/day12/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let program = input.split('\n');
    let registers = { a: 0, b: 0, c: 0, d: 0 };
    let programCounter = 0;

    let instructions = {
        cpy: args => {
            let value = parseInt(args[0]);
            if (args[0].match(/[a-d]/g)) value = registers[args[0]];
            registers[args[1]] = value;
            programCounter++;
        },
        inc: args => {
            registers[args[0]] = registers[args[0]] + 1;
            programCounter++;
        },
        dec: args => {
            registers[args[0]] = registers[args[0]] - 1;
            programCounter++;
        },
        jnz: args => {
            let value = parseInt(args[0]);
            if (args[0].match(/[a-d]/g)) value = registers[args[0]];
            if (value != 0) programCounter += parseInt(args[1]);
            else programCounter++;
        }
    }

    while (true) {
        let tokens = program[programCounter].split(' ');

        instructions[tokens[0]](tokens.slice(1));

        if (programCounter < 0 || programCounter >= program.length) break;
    }

    return registers.a;
}