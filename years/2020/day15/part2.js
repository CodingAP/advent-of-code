const input = require('fs').readFileSync('./years/2020/day15/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let numbers = common.parseListToInt(input, ',');

    let hashMap = new Array(30000000);
    let last = numbers[numbers.length - 1];
    for (let i = 0; i < hashMap.length; i++) {
        if (numbers[i] != null) hashMap[numbers[i]] = i;
        else {
            let index = hashMap[last];

            if (i != 3) hashMap[last] = i - 1;

            if (index == null || i - index == 1) {
                last = 0;
            } else {
                last = i - index - 1;
            }
        }
    }
    return last;
}