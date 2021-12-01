const common = require('../../../scripts/common');

module.exports = input => {
    let count = 0;
    let numbers = common.parseListToInt(input, '\n');
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > numbers[i - 1]) count++;
    }
    return count;
}