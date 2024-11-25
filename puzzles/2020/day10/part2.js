const input = require('fs').readFileSync('./years/2020/day10/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let adapters = common.parseListToInt(input);
    adapters.push(0);
    adapters.sort((a, b) => a - b);
    adapters.push(adapters[adapters.length - 1] + 3);

    let previous = {};
    let branches = {};

    for (let i = 0; i < adapters.length; i++) {
        let possible = [];
        for (let j = 1; j <= 3; j++) {
            if (adapters.includes(adapters[i] + j)) {
                possible.push(adapters[i] + j);
            }
        }
        branches[adapters[i]] = possible;
    }

    let findPaths = number => {
        let paths = 0;
        if (previous[number]) return previous[number];
        if (number == adapters[adapters.length - 1]) return 1;
        for (let i = 0; i < branches[number].length; i++) {
            let sum = findPaths(branches[number][i]);
            paths += sum;
            previous[branches[number][i]] = sum;
        }
        return paths;
    }

    return findPaths(0);
}