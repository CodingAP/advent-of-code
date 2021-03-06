const input = require('fs').readFileSync('./years/2020/day25/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let keys = common.parseListToInt(input);
    let loopSizes = [];

    keys.forEach(value => {
        let loop = 1;
        let number = 1;
        while (true) {
            number = (number * 7) % 20201227;
            if (number == value) {
                loopSizes.push(loop);
                return;
            }
            loop++;
        }
    });
    
    let number = 1;
    for (let i = 0; i < loopSizes[1]; i++) {
        number = (number * keys[0]) % 20201227;
    }
    return number;
}