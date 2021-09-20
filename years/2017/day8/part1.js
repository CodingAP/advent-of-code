const common = require('../../../scripts/common');
const input = common.readInput('./years/2017/day8/input.txt');

module.exports = () => {
    let instructions = input.split('\n');
    let registers = {};
    for (let i = 0; i < instructions.length; i++) {
        let tokens = instructions[i].split(' ');
        if (!registers[tokens[0]]) registers[tokens[0]] = 0;
        if (!registers[tokens[4]]) registers[tokens[4]] = 0;
        if (eval(`${registers[tokens[4]]} ${tokens[5]} ${parseInt(tokens[6])}`)) registers[tokens[0]] += parseInt(tokens[2]) * ((tokens[1] == 'inc') ? 1 : -1);
    }

    let sorted = Object.fromEntries(Object.entries(registers).sort((a, b) => b[1] - a[1]));
    return registers[Object.keys(sorted)[0]];
}