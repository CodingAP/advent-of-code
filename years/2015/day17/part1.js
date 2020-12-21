const input = require('fs').readFileSync('./years/2015/day17/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let possible = [];
    let allCombos = common.powerSet(common.parseListToInt(input));

    allCombos.forEach(value => {
        if (common.addAll(value) == 150) possible.push(value);
    });

    return possible.length;
}