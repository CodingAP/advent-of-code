const input = require('fs').readFileSync('./years/2016/day7/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let valid = 0;

    let addresses = input.split('\n');
    for (let i = 0; i < addresses.length; i++) {
        let parts = addresses[i].split(/[\[\]]/g);
        let inSquare = false, outside = false;
        for (let j = 0; j < parts.length; j++) {
            let string = parts[j].match(/(\w)(\w)\2\1/);

            if (string && string[0].charAt(0) != string[0].charAt(1)) {
                if (j % 2 == 1) inSquare = true;
                else outside = true;
            }
        }
        if (outside && !inSquare) valid++;
    }

    return valid;
}