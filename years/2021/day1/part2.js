const common = require('../../../scripts/common');

module.exports = input => {
    let count = 0;
    let numbers = common.parseListToInt(input, '\n');
    let last = numbers[0] + numbers[1] + numbers[2];
    for (let i = 1; i < numbers.length - 1; i++) {
        let next = numbers[i - 1] + numbers[i] + numbers[i + 1];
        if (next > last) count++;
        last = next;
    }
    return count;
}