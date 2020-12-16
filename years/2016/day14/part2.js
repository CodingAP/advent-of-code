const input = require('fs').readFileSync('./years/2016/day14/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let keys = [];
    let previousHashes = [];

    let getHash = index => {
        if (previousHashes[index]) return previousHashes[index];
        let firstHash = common.md5(input + index);
        for (let i = 0; i < 2016; i++) {
            firstHash = common.md5(firstHash);
        }
        previousHashes[index] = firstHash;
        return previousHashes[index];
    }

    let find5Digits = (starting, digit) => {
        let findThis = digit.padStart(5, digit);

        for (let i = 1; i <= 1000; i++) {
            let hash = getHash(starting + i);
            if (hash.search(findThis) != -1) return true;
        }

        return false;
    }

    let index = 10;
    while (true) {
        let hash = getHash(index);
        let stringIndex = hash.search(/(.)\1\1/);
        if (stringIndex != -1 && find5Digits(index, hash.charAt(stringIndex))) keys.push(index);

        if (keys.length == 64) break;
        index++;
    }

    return keys[keys.length - 1];
}