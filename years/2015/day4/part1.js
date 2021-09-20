const common = require('../../../scripts/common');
const input = common.readInput('./years/2015/day4/input.txt');

module.exports = () => {
    let i = 0;

    while (true) {
        let hash = common.md5(input + i);
        if (hash.startsWith('00000')) break;
        i++;
    }

    return i;
}