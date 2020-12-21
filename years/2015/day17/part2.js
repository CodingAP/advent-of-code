const input = require('fs').readFileSync('./years/2015/day17/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let possible = [];
    let allCombos = common.powerSet(common.parseListToInt(input));

    allCombos.forEach(value => {
        if (common.addAll(value) == 150) possible.push(value);
    });

    let smallestPossible = [];
    let smallest = Infinity;
    possible.forEach(value => {
        if (value.length < smallest) {
            smallestPossible = [value];
            smallest = value.length;
        } else if (value.length == smallest) {
            smallestPossible.push(value);
        }
    })

    return smallestPossible.length;
}