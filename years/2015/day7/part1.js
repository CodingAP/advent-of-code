const input = require('fs').readFileSync('./years/2015/day7/input.txt').toString().trim();
const common = require('../../../common');

module.exports = () => {
    let registers = {};

    let operations = {
        set: parts => {
            registers[parts[2]] = parseInt(parts[0]);
        },
        and: parts => {
            let arg1 = 0, arg2 = 0;
            if (registers[parts[0]] == null) arg1 = registers[parts[0]];
            else registers[parts[0]]
            registers[parts[4]] = arg1 & arg2;
        },
        or: parts => {

        },
        not: parts => {

        },
        lshift: parts => {

        },
        rshift: parts => {

        }
    }

    let instructions = input.split('\n');
    for (let i = 0; i < instructions.length; i++) {
        let parts = instructions[i].split(' ');
    }
    return 0;
}