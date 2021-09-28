module.exports = input => {
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
                if (answers[letters[k]] == null) answers[letters[k]] = 0;
                answers[letters[k]]++;
            }
        }
        let keys = Object.keys(answers);
        for (let j = 0; j < keys.length; j++) {
            if (answers[keys[j]] == groups[i].length) sum++;
        }
    }
    return sum;
}