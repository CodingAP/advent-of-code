const common = require('../../../scripts/common');

module.exports = input => {
    let number = '';
    for (let i = 0; i < 10000; i++) {
        number += input;
    }
    let basePattern = [0, 1, 0, -1];

    for (let i = 0; i < 100; i++) {
        console.log(i);
        let newNumber = '';
        for (let n1 = 0; n1 < number.length; n1++) {
            let sum = 0;
            let pattern = [];
            let currentIndex = 0;

            for (let n2 = 0; n2 < number.length + 2; n2++) {
                pattern.push(basePattern[currentIndex % basePattern.length]);
                if (n2 % (n1 + 1) == 0 && n2 != 0) currentIndex++;
            }
            pattern.shift(); pattern.shift();

            for (let n2 = 0; n2 < number.length; n2++) {
                sum += parseInt(number[n2]) * pattern[n2];
            }
            newNumber += Math.abs(sum) % 10;
        }
        number = newNumber;
    }
    return number.slice(0, 8);
}