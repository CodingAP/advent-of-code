const common = require('../../../scripts/common');
const input = common.readInput('./years/2015/day24/input.txt');

module.exports = () => {
    let weights = common.parseListToInt(input);
    let groupSize = common.addAll(weights) / 3;

    let smallestQE = null;
    for (let i = 2; i <= weights.length; i++) {
        let current = common.combinations(weights, i);
        current.forEach(array => {
            if (common.addAll(array) == groupSize) {
                let qe = array.reduce((acc, value) => acc * value);
                if (!smallestQE || qe < smallestQE) smallestQE = qe;
            }
        });
        if (smallestQE) break;
    }

    return smallestQE;
}