const common = require('../../../scripts/common');

module.exports = input => {
    let lengths = common.parseListToInt(input, ',');
    let numbers = Array.from(Array(256).keys());
    let position = 0;
    let skipSize = 0;

    for (let i = 0; i < lengths.length; i++) {
        let subarray = [];
        for (let j = 0; j < lengths[i]; j++) {
            subarray.push(numbers[(position + j) % numbers.length]);
        }

        subarray.reverse();

        for (let j = 0; j < subarray.length; j++) {
            numbers[(position + j) % numbers.length] = subarray[j];
        }

        position += lengths[i] + skipSize;
        skipSize++;
    }

    return numbers[0] * numbers[1];
}