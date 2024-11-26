/**
 * puzzles/2017/day01/solution.ts
 *
 * ~~ Inverse Captcha ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === input[(i + 1) % input.length]) sum += parseInt(input[i]);
    }
    return sum;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === input[(i + input.length / 2) % input.length]) sum += parseInt(input[i]);
    }
    return sum;
};

export { part1, part2 };
