// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2021/day14/solution.ts
 *
 * ~~ Extended Polymerization ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let [polymer, rules] = input.split('\n\n');

    let replacements = {};

    rules.split('\n').forEach(element => {
        let tokens = element.split(' -> ');
        replacements[tokens[0]] = tokens[1];
    });

    for (let steps = 0; steps < 10; steps++) {
        let newPolymer = '';
        for (let i = 1; i < polymer.length; i++) {
            if (replacements[polymer[i - 1] + polymer[i]]) {
                newPolymer += polymer[i - 1] + replacements[polymer[i - 1] + polymer[i]];
            } else {
                newPolymer += polymer[i - 1];
            }

            if (i == polymer.length - 1) {
                newPolymer += polymer[i];
            }
        }
        polymer = newPolymer;
    }

    let set = {};
    for (let i = 0; i < polymer.length; i++) {
        if (!set[polymer[i]]) set[polymer[i]] = 0;
        set[polymer[i]]++;
    }

    let sorted = Object.entries(set).sort((a, b) => a[1] - b[1]);
    return sorted[sorted.length - 1][1] - sorted[0][1];
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let [initalPolymer, rules] = input.split('\n\n');

    let replacements = {};

    rules.split('\n').forEach(element => {
        let tokens = element.split(' -> ');
        replacements[tokens[0]] = tokens[1];
    });

    let pairs = {};
    let set = {};
    for (let i = 1; i < initalPolymer.length; i++) {
        let pair = initalPolymer[i - 1] + initalPolymer[i];
        if (!pairs[pair]) pairs[pair] = 0;
        pairs[pair]++;

        if (!set[pair[0]]) set[pair[0]] = 0;
        set[pair[0]]--;
    }

    for (let steps = 0; steps < 40; steps++) {
        let pairList = Object.entries(pairs);
        pairList.forEach(([element, times]) => {
            if (replacements[element] && pairs[element] != 0) {
                let newPair = element[0] + replacements[element];
                if (!pairs[newPair]) pairs[newPair] = 0;
                pairs[newPair] += times;

                newPair = replacements[element] + element[1];
                if (!pairs[newPair]) pairs[newPair] = 0;
                pairs[newPair] += times;

                pairs[element] -= times;

                if (!set[replacements[element]]) set[replacements[element]] = 0;
                set[replacements[element]] -= times;
            }
        });
    }

    let pairList = Object.keys(pairs);
    pairList.forEach(element => {
        if (!set[element[0]]) set[element[0]] = 0;
        set[element[0]] += pairs[element];

        if (!set[element[1]]) set[element[1]] = 0;
        set[element[1]] += pairs[element];
    });

    let sorted = Object.entries(set).sort((a, b) => a[1] - b[1]);
    return sorted[sorted.length - 1][1] - sorted[0][1] - 1;
};

export { part1, part2 };
