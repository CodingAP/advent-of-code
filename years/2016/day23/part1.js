const input = require('fs').readFileSync('./years/2016/day23/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let program = input.split('\n');
    let registers = { a: 7, b: 0, c: 0, d: 0 };
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
            if (value != 0) {
                let value = parseInt(args[1]);
                if (args[1].match(/[a-d]/g)) value = registers[args[1]];
                programCounter += value;
            }
            else programCounter++;
        },
        tgl: args => {
            let toggles = {
                cpy: 'jnz',
                inc: 'dec',
                dec: 'inc',
                jnz: 'cpy',
                tgl: 'inc'
            }

            let value = parseInt(args[0]);
            if (args[0].match(/[a-d]/g)) value = registers[args[0]];

            if (programCounter + value > 0 && programCounter + value < program.length) {
                let tokens = program[programCounter + value].split(' ');
                tokens[0] = toggles[tokens[0]];
                program[programCounter + value] = tokens.join(' ');
            }
            programCounter++;
        }
    }

    while (true) {
        let tokens = program[programCounter].split(' ');

        instructions[tokens[0]](tokens.slice(1));

        if (programCounter < 0 || programCounter >= program.length) break;
    }

    return registers.a;
}