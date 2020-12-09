const input = require('fs').readFileSync('./years/2020/day1/input.txt').toString().trim();
const common = require('../../../common');

module.exports = () => {
    let numbers = input.split('\n').map(value => parseInt(value));

    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            for (let k = 0; k < numbers.length; k++) {
                if (i == j || i == k || j == k) continue;
                if (numbers[i] + numbers[j] + numbers[k] == 2020) return numbers[i] * numbers[j] * numbers[k];
            }
        }
    }

    return 0;
}