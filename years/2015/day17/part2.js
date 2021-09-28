const common = require('../../../scripts/common');

module.exports = input => {
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