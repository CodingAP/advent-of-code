/**
 * puzzles/2021/day10/solution.ts
 *
 * ~~ Syntax Scoring ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

const OPENING = /[\(\[\{\<]/;
const CLOSING = /[\)\]\}\>]/;
const PAIRS: { [key: string]: string } = { '(': ')', '[': ']', '{': '}', '<': '>' };

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const VALUES: { [key: string]: number } = { ')': 3, ']': 57, '}': 1197, '>': 25137 };

    // find the scores of all the corrupted brackets
    return input.trim().split('\n').reduce((sum, line) => {
        let characterStack = [];

        for (let i = 0; i < line.length; i++) {
            if (line[i].match(OPENING)) characterStack.push(line[i]);
            if (line[i].match(CLOSING)) {
                const last = characterStack.pop() as string;
                if (PAIRS[last] !== line[i]) return sum + VALUES[line[i]];
            }
        }

        return sum;
    }, 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const VALUES: { [key: string]: number } = { '(': 1, '[': 2, '{': 3, '<': 4 };

    // get all the scores of the incomplete brackets
    const scores = input.trim().split('\n').map(line => {
        let characterStack = [];
        for (let i = 0; i < line.length; i++) {
            if (line[i].match(OPENING)) characterStack.push(line[i]);
            if (line[i].match(CLOSING)) {
                // don't accept corrupted strings this time
                const last = characterStack.pop() as string;
                if (PAIRS[last] != line[i]) return -1;
            }
        }

        // going right to left, find the score
        let score = 0;
        for (let i = characterStack.length - 1; i >= 0; i--) {
            score *= 5;
            score += VALUES[characterStack[i]];
        }
        return score;
    }).filter(score => score !== -1);

    // find the middle score
    scores.sort((a, b) => a - b)
    return scores[Math.floor(scores.length / 2)];
};

export { part1, part2 };
