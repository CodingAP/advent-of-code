const input = require('fs').readFileSync('./years/2019/day4/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let [min, max] = input.split('-').map(element => parseInt(element));

    let count = 0;
    for (let i = min; i <= max; i++) {
        let password = i.toString();
        let double = false, neverDecreasing = true;
        for (let i = 1; i < password.length; i++) {
            if (password[i] == password[i - 1]) {
                let next = password[i + 1] || '';
                let previous = password[i - 2] || '';
                if (password[i] != next && password[i] != previous) double = true;
            }
            if (parseInt(password[i]) < parseInt(password[i - 1])) neverDecreasing = false;
        }
        if (double && neverDecreasing) count++;
    }
    return count;
}