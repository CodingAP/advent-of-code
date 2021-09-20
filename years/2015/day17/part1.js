const common = require('../../../scripts/common');
const input = common.readInput('./years/2015/day17/input.txt');

module.exports = () => {
    let possible = [];
    let allCombos = common.powerSet(common.parseListToInt(input));

    allCombos.forEach(value => {
        if (common.addAll(value) == 150) possible.push(value);
    });

    return possible.length;
}