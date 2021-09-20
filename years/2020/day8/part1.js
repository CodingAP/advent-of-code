const common = require('../../../scripts/common');
const input = common.readInput('./years/2020/day8/input.txt');

module.exports = () => {
    let previousPosition = [];
    let accumulator = 0, programCounter = 0;
    let program = input.split('\n');

    while (true) {
        let tokens = program[programCounter].split(' ');
        if (tokens[0] == 'acc') {
            accumulator += parseInt(tokens[1]);
            programCounter++;
        } else if (tokens[0] == 'jmp') {
            programCounter += parseInt(tokens[1]);
        } else if (tokens[0] == 'nop') {
            programCounter++;
        }

        if (previousPosition.includes(programCounter)) {
            break;
        } else {
            previousPosition.push(programCounter);
        }
    }

    return accumulator;
}