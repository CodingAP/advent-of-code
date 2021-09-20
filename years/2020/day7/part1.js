const common = require('../../../scripts/common');
const input = common.readInput('./years/2020/day7/input.txt');

module.exports = () => {
    let rules = input.split('\n');
    let bags = {};

    for (let i = 0; i < rules.length; i++) {
        let tokens = rules[i].split(' ');
        let inBags = {};

        let count = Math.floor((tokens.length - 4) / 4);
        for (let j = 0; j < count; j++) {
            inBags[(tokens[4 * (j + 1) + 1] + tokens[4 * (j + 1) + 2])] = parseInt(tokens[4 * (j + 1)]);
        }
        bags[tokens[0] + tokens[1]] = inBags;
    }

    let checkForBag = bagName => {
        if (bagName == 'shinygold') return true;
        let insideBags = Object.keys(bags[bagName]);
        for (let i = 0; i < insideBags.length; i++) {
            if (checkForBag(insideBags[i])) return true;
        }
        return false;
    }

    let sum = 0;
    let keys = Object.keys(bags);
    for (let i = 0; i < keys.length; i++) {
        if (checkForBag(keys[i]) && keys[i] != 'shinygold') sum++;
    }
    return sum;
}