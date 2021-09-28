const common = require('../../../scripts/common');

module.exports = input => {
    let possible = [];
    let allCombos = common.powerSet(common.parseListToInt(input));

    allCombos.forEach(value => {
        if (common.addAll(value) == 150) possible.push(value);
    });

    return possible.length;
}