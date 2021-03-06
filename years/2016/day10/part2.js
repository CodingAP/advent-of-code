const input = require('fs').readFileSync('./years/2016/day10/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let instructions = input.split('\n');

    let bots = {};
    let output = [];

    let count = 0;
    while (count < 100) {
        for (let i = 0; i < instructions.length; i++) {
            let tokens = instructions[i].split(' ');
            if (tokens[0] == 'value') {
                if (!bots[tokens[5]]) bots[tokens[5]] = [];
                bots[tokens[5]].push(parseInt(tokens[1]));
                instructions[i] = 'pass';
            } else if (tokens[0] == 'bot') {
                if (bots[tokens[1]] && bots[tokens[1]].length == 2) {
                    let low = Math.min(bots[tokens[1]][0], bots[tokens[1]][1]);
                    let high = Math.max(bots[tokens[1]][0], bots[tokens[1]][1]);

                    if (tokens[5] == 'output') {
                        output[tokens[6]] = low;
                    } else if (tokens[5] == 'bot') {
                        if (!bots[tokens[6]]) bots[tokens[6]] = [];
                        bots[tokens[6]].push(low);
                    }

                    if (tokens[10] == 'output') {
                        output[tokens[11]] = high;
                    } else if (tokens[10] == 'bot') {
                        if (!bots[tokens[11]]) bots[tokens[11]] = [];
                        bots[tokens[11]].push(high);
                    }

                    bots[tokens[1]] = [];

                    instructions[i] = 'pass';
                }
            }
        }
        count++;
    }

    return (output[0] * output[1] * output[2]);
}