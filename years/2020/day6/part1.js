const input = require('fs').readFileSync('./years/2020/day6/input.txt').toString().trim();
const common = require('../../../common');

module.exports = () => {
    let sum = 0;
    let groups = [];
    let people = input.split('\n');
    let currentGroup = [];
    for (let i = 0; i < people.length; i++) {
        if (i == people.length - 1) {
            currentGroup.push(people[i]);
            groups.push(currentGroup);
        } else {
            if (people[i] == '') {
                groups.push(currentGroup);
                currentGroup = [];
            } else {
                currentGroup.push(people[i]);
            }
        }
    }

    for (let i = 0; i < groups.length; i++) {
        let answers = {};
        for (let j = 0; j < groups[i].length; j++) {
            let letters = groups[i][j].split('');
            for (let k = 0; k < letters.length; k++) {
                answers[letters[k]] = true;
            }
        }
        sum += Object.keys(answers).length;
    }
    return sum;
}