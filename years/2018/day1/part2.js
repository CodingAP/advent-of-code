const common = require('../../../scripts/common');

module.exports = input => {
    let frequencies = common.parseListToInt(input);
    let frequency = 0;
    let previous = [];
    let index = 0;

    while (true) {
        frequency += frequencies[index++ % frequencies.length];

        if (previous.includes(frequency)) {
            return frequency;
        } else {
            previous.push(frequency);
        }
    }
}