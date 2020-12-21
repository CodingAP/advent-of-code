const input = require('fs').readFileSync('./years/2015/day24/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let weights = common.parseListToInt(input);
    let groupSize = common.addAll(weights) / 4;

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