const input = require('fs').readFileSync('./years/2015/day23/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let registers = { a: 1, b: 0 };
    let program = [];
    let programCounter = 0;

    let commands = {
        'hlf': (...args) => {
            registers[args[0]] /= 2;
            return 1;
        },
        'tpl': (...args) => {
            registers[args[0]] *= 3;
            return 1;
        },
        'inc': (...args) => {
            registers[args[0]]++;
            return 1;
        },
        'jmp': (...args) => {
            return parseInt(args[0]);
        },
        'jie': (...args) => {
            if (registers[args[0].replace(',', '')] % 2 == 0) return parseInt(args[1]);
            return 1;
        },
        'jio': (...args) => {
            if (registers[args[0].replace(',', '')] == 1) return parseInt(args[1]);
            return 1;
        }
    }

    let splitInput = input.split('\n');
    for (let i = 0; i < splitInput.length; i++) {
        program[i] = splitInput[i];
    }

    while (true) {
        let command = program[programCounter];
        if (command == null) break;
        let tokens = command.split(' ');
        let programOffset = commands[tokens[0]](tokens[1], tokens[2]);
        programCounter += programOffset;
    }

    return registers.b;
}