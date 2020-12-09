const input = require('fs').readFileSync('inputs/2017/4.in').toString().trim();

module.exports = {
    part1: () => {
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
    },
    part2: () => {
        let valid = 0;
        let wordGroups = input.split('\n');
        for (let i = 0; i < wordGroups.length; i++) {
            let wordCount = {};
            let words = wordGroups[i].split(' ');
            for (let j = 0; j < words.length; j++) {
                let sortedWord = words[j].split('').sort().join('');

                if (wordCount[sortedWord] == null) wordCount[sortedWord] = 0;
                wordCount[sortedWord]++;
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
}