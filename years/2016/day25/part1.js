const input = require('fs').readFileSync('./years/2016/day25/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let runAssembunny = inputA => {
        let program = input.split('\n');
        let registers = { a: inputA, b: 0, c: 0, d: 0 };
        let programCounter = 0;
        let output = [];

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
            out: args => {
                let value = parseInt(args[0]);
                if (args[0].match(/[a-d]/g)) value = registers[args[0]];

                output.push(value);
                programCounter++;
            }
        }

        while (true) {
            let tokens = program[programCounter].split(' ');

            instructions[tokens[0]](tokens.slice(1));

            if (programCounter < 0 || programCounter >= program.length) break;

            if (output.length >= 10) {
                let valid = true;
                for (let i = 0; i < output.length; i++) if (i % 2 != output[i]) valid = false;
                return valid;
            }
        }
    }

    let i = 0;
    while (true) {
        if (runAssembunny(i)) return i;
        i++;
    }
}