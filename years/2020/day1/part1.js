const input = require('fs').readFileSync('./years/2020/day1/input.txt').toString().trim();
const common = require('../../../common');

module.exports = () => {
    let numbers = input.split('\n').map(value => parseInt(value));

    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if (i == j) continue;
            if (numbers[i] + numbers[j] == 2020) return numbers[i] * numbers[j];
        }
    }

    return 0;
}