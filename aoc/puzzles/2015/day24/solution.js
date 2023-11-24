import { combination } from '../../../../scripts/common.js';
const common = {
    combinations: combination,
    parseListToInt: input => input.split('\n').map(element => parseInt(element)),
    addAll: input => input.reduce((acc, num) => acc + num, 0)
}

const part1 = async input => {
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

const part2 = async input => {
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

export { part1, part2 };