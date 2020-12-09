const input = require('fs').readFileSync('inputs/2020/1.in').toString().trim();

module.exports = {
    part1: () => {
        let numbers = input.split('\n').map(value => parseInt(value));

        for (let i = 0; i < numbers.length; i++) {
            for (let j = 0; j < numbers.length; j++) {
                if (i == j) continue;
                if (numbers[i] + numbers[j] == 2020) return numbers[i] * numbers[j];
            }
        }

        return 0;
    },
    part2: () => {
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
}