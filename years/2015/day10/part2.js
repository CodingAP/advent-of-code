const input = require('fs').readFileSync('./years/2015/day10/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let string = input;

    for (let i = 0; i < 50; i++) {
        let newString = '';
        let currentCount = 1;
        let currentNumber = string.charAt(0);
        for (let j = 1; j < string.length; j++) {
            if (currentNumber == string.charAt(j)) {
                currentCount++;
            } else {
                newString += currentCount + currentNumber;
                currentCount = 1;
                currentNumber = string.charAt(j);
            }
        }
        newString += currentCount + currentNumber;
        string = newString;
    }

    return string.length;
}