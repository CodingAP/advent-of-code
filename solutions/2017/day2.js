const input = require('fs').readFileSync('inputs/2017/2.in').toString().trim();

module.exports = {
    part1: () => {
        let checksum = 0;
        let rows = input.split('\n');
        for (let i = 0; i < rows.length; i++) {
            let numbers = rows[i].replace(/[\t]/g, ' ').split(' ');
            let largest = -Infinity, smallest = Infinity;
            for (let j = 0; j < numbers.length; j++) {
                largest = Math.max(largest, parseInt(numbers[j]));
                smallest = Math.min(smallest, parseInt(numbers[j]));
            }
            checksum += largest - smallest;
        }
        return checksum;
    },
    part2: () => {
        let checksum = 0;
        let rows = input.split('\n');
        for (let i = 0; i < rows.length; i++) {
            let numbers = rows[i].replace(/[\t]/g, ' ').split(' ');
            for (let j = 0; j < numbers.length; j++) {
                for (let k = 0; k < numbers.length; k++) {
                    if (j == k) continue;
                    if ((numbers[j] % numbers[k]) == 0) checksum += (numbers[j] / numbers[k]);
                }
            }
        }
        return checksum;
    }
}