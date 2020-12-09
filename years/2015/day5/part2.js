const input = require('fs').readFileSync('./years/2015/day5/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let niceStrings = 0;
    let strings = input.split('\n');
    for (let i = 0; i < strings.length; i++) {
        let string = strings[i];
        let mirrorLetters = false, twoPair = false, currentPairs = {};
        for (let j = 0; j < string.length; j++) {
            let next = string.charAt(j + 1) || '';
            let current = string.charAt(j);
            let last = string.charAt(j - 1) || '';
            if (next == last) mirrorLetters = true;
            if (!(last == current && current == next) && (last + current).length == 2) {
                let pair = last + current;
                if (currentPairs[pair] == null) currentPairs[pair] = 0;
                currentPairs[pair]++;
                if (currentPairs[pair] >= 2) twoPair = true;
            }
        }
        if (mirrorLetters && twoPair) niceStrings++;
    }
    return niceStrings;
}