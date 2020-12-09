const input = require('fs').readFileSync('./years/2017/day4/input.txt').toString().trim();
const common = require('../../../common');

module.exports = () => {
    let valid = 0;
    let wordGroups = input.split('\n');
    for (let i = 0; i < wordGroups.length; i++) {
        let wordCount = {};
        let words = wordGroups[i].split(' ');
        for (let j = 0; j < words.length; j++) {
            if (wordCount[words[j]] == null) wordCount[words[j]] = 0;
            wordCount[words[j]]++;
        }

        let thisValid = true;
        let wordKeys = Object.keys(wordCount);
        for (let j = 0; j < wordKeys.length; j++) {
            if (wordCount[wordKeys[j]] > 1) thisValid = false;
        }

        if (thisValid) valid++;
    }
    return valid;
}