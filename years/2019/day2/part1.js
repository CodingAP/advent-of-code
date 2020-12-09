const input = require('fs').readFileSync('./years/2019/day2/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let program = common.parseListToInt(input, ',');
    let programCounter = 0;

    program[1] = 12;
    program[2] = 2;

    while (true) {
        let op = program[programCounter];
        if (op == 1) {
            program[program[programCounter + 3]] = program[program[programCounter + 1]] + program[program[programCounter + 2]];
        } else if (op == 2) {
            program[program[programCounter + 3]] = program[program[programCounter + 1]] * program[program[programCounter + 2]];
        } else if (op == 99) {
            break;
        }
        programCounter += 4;
    }

    return program[0];
}