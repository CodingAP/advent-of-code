const input = require('fs').readFileSync('./years/2017/day2/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
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