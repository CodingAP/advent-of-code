// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day07/solution.ts
 *
 * ~~ Handy Haversacks ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
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
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
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
};

export { part1, part2 };
