const input = require('fs').readFileSync('./years/2015/day4/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let i = 0;

    while (true) {
        let hash = common.md5(input + i);
        if (hash.startsWith('000000')) break;
        i++;
    }

    return i;
}