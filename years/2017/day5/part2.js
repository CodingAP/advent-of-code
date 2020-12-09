const input = require('fs').readFileSync('./years/2017/day5/input.txt').toString().trim();
const common = require('../../../common');

module.exports = () => {
    let memory = input.split('\n').map(value => parseInt(value));
    let programCounter = 0;
    let steps = 0;

    while (true) {
        let jump = memory[programCounter];
        if (jump >= 3) memory[programCounter]--;
        else memory[programCounter]++;
        programCounter += jump;
        steps++;

        if (programCounter < 0 || programCounter >= memory.length) return steps;
    }
}