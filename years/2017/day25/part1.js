const common = require('../../../scripts/common');
const input = common.readInput('./years/2017/day25/input.txt');

module.exports = () => {
    let index = 0;
    let memory = {};
    let currentState = 'a';

    let states = {
        a: value => {
            memory[index] = (value == 0) ? 1 : 0;
            index += (value == 0) ? 1 : -1;
            currentState = (value == 0) ? 'b' : 'f';
        },
        b: value => {
            memory[index] = 0;
            index += 1;
            currentState = (value == 0) ? 'c' : 'd';
        },
        c: value => {
            memory[index] = 1;
            index += (value == 0) ? -1 : 1;
            currentState = (value == 0) ? 'd' : 'e';
        },
        d: value => {
            memory[index] = 0;
            index += -1;
            currentState = (value == 0) ? 'e' : 'd';
        },
        e: value => {
            memory[index] = (value == 0) ? 0 : 1;
            index += 1;
            currentState = (value == 0) ? 'a' : 'c';
        },
        f: value => {
            memory[index] = 1;
            index += (value == 0) ? -1 : 1;
            currentState = 'a';
        },
    }

    for (let i = 0; i < 12994925; i++) {
        if (!memory[index]) memory[index] = 0;
        states[currentState](memory[index]);
    }

    let sum = 0;
    common.objectForEach(memory, (key, value) => {
        if (value == 1) sum++;
    });
    return sum;
}