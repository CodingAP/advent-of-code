const common = require('../../../scripts/common');

module.exports = input => {
    let crabs = common.parseListToInt(input, ',');

    let leastFuel = Infinity;
    let max = crabs.reduce((a, b) => Math.max(a, b));
    for (let i = 1; i < max; i++) {
        let fuel = 0;
        for (let j = 0; j < crabs.length; j++) {
            let distance = Math.abs(crabs[j] - i);
            for (let k = 1; k <= distance; k++) {
                fuel += k;
            }
        }
        leastFuel = Math.min(leastFuel, fuel);
    }

    return leastFuel;
}