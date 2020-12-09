const input = require('fs').readFileSync('./years/2020/day9/input.txt').toString().trim();
const common = require('../../../common');

module.exports = () => {
    let numbers = common.parseListToInt(input);
    let preambleLength = 25;

    for (let i = preambleLength; i < numbers.length; i++) {
        let preamble = numbers.slice(i - preambleLength, i);
        let valid = false;
        for (let j = 0; j < preamble.length; j++) {
            for (let k = 0; k < preamble.length; k++) {
                if (j == k) continue;
                if (preamble[j] + preamble[k] == numbers[i]) valid = true;
            }
        }

        if (!valid) return numbers[i];
    }
}