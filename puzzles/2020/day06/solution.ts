// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day06/solution.ts
 *
 * ~~ Custom Customs ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let sum = 0;
    let groups = [];
    let people = input.trim().split('\n');
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
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let sum = 0;
    let groups = [];
    let people = input.trim().split('\n');
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
};

export { part1, part2 };
