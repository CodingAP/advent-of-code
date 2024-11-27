// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2017/day09/solution.ts
 *
 * ~~ Stream Processing ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let garbage = false, depth = 0, total = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] == '!') i++;
        else if (input[i] == '<') garbage = true
        else if (input[i] == '>') garbage = false;

        if (!garbage) {
            if (input[i] == '{') depth++;
            else if (input[i] == '}') {
                total += depth;
                depth--;
            }
        }
    }

    return total;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let garbage = false, total = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] == '!') i++;
        else if (input[i] == '<' && !garbage) garbage = true
        else if (input[i] == '>') garbage = false;
        else if (garbage) total++;
    }

    return total;
};

export { part1, part2 };
