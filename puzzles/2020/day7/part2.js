const input = require('fs').readFileSync('./years/2020/day7/input.txt').toString().trim();
const common = require('../../../scripts/common');

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
        let sum = 0;
        let insideBags = Object.keys(bags[bagName]);
        if (insideBags.length == 0) return false;
        for (let i = 0; i < insideBags.length; i++) {
            sum += bags[bagName][insideBags[i]];
            if (checkForBag(insideBags[i], sum)) sum += bags[bagName][insideBags[i]] * checkForBag(insideBags[i]);

        }
        return sum;
    }

    return checkForBag('shinygold');
}