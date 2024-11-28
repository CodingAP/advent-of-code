// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2021/day10/solution.ts
 *
 * ~~ Syntax Scoring ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let lines = input.split('\n');
    let opening = /[\(\[\{\<]/;
    let closing = /[\)\]\}\>]/;

    let pairs = { '(': ')', '[': ']', '{': '}', '<': '>' };
    let values = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
    let sum = 0;
    lines.forEach(element => {
        let characterStack = [];
        for (let i = 0; i < element.length; i++) {
            if (element[i].match(opening)) characterStack.push(element[i]);
            if (element[i].match(closing)) {
                let last = characterStack.pop();
                if (pairs[last] != element[i]) {
                    sum += values[element[i]];
                    return;
                }
            }
        }
    });
    return sum;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let lines = input.split('\n');
    let opening = /[\(\[\{\<]/;
    let closing = /[\)\]\}\>]/;

    let pairs = { '(': ')', '[': ']', '{': '}', '<': '>' };
    let values = { '(': 1, '[': 2, '{': 3, '<': 4 };
    let scores = [];
    lines.forEach(element => {
        let characterStack = [];
        let score = 0;
        for (let i = 0; i < element.length; i++) {
            if (element[i].match(opening)) characterStack.push(element[i]);
            if (element[i].match(closing)) {
                let last = characterStack.pop();
                if (pairs[last] != element[i]) return;
            }
        }

        for (let i = characterStack.length - 1; i >= 0; i--) {
            score *= 5;
            score += values[characterStack[i]];
        }
        scores.push(score);
    });

    scores.sort((a, b) => a - b)
    return scores[Math.floor(scores.length / 2)];
};

export { part1, part2 };
