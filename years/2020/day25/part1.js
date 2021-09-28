const common = require('../../../scripts/common');

module.exports = input => {
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