const input = require('fs').readFileSync('./years/2016/day4/input.txt').toString().trim();
const { settings } = require('cluster');
const common = require('../../../scripts/common');

module.exports = () => {
    let sum = 0;
    let rooms = input.split('\n');
    for (let i = 0; i < rooms.length; i++) {
        let tokens = rooms[i].split('-');
        let sectorID = parseInt(tokens[tokens.length - 1].split('[')[0]);
        let neededLetters = tokens[tokens.length - 1].split('[')[1].replace(']', '');

        let allLetters = common.addAll(tokens.slice(0, tokens.length - 1));
        let counts = {};

        for (let j = 0; j < allLetters.length; j++) {
            if (!counts[allLetters.charAt(j)]) counts[allLetters.charAt(j)] = 0;
            counts[allLetters.charAt(j)]++;
        }

        let sorted = Object.keys(counts).sort((a, b) => {
            if (counts[b] - counts[a] != 0) return counts[b] - counts[a];
            return a.codePointAt(0) - b.codePointAt(0);
        });

        if (sorted.slice(0, 5).join('') == neededLetters) {
            let finalWord = '';

            for (let j = 0; j < allLetters.length; j++) {
                finalWord += String.fromCharCode((((allLetters.codePointAt(j) - 97) + sectorID) % 26) + 97);
            }

            if (finalWord.includes('north')) return sectorID;
        }
    }
    return sum;
}