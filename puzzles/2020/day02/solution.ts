// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day02/solution.ts
 *
 * ~~ Password Philosophy ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let passwords = input.trim().split('\n');
    let valid = 0;

    for (let i = 0; i < passwords.length; i++) {
        let tokens = passwords[i].split(' ');
        let min = parseInt(tokens[0].split('-')[0]);
        let max = parseInt(tokens[0].split('-')[1]);
        let count = 0;
        let letter = tokens[1].replace(':', '');
        let password = tokens[2];
        for (let j = 0; j < password.length; j++) {
            if (password.charAt(j) == letter) count++;
        }

        if (count >= min && count <= max) valid++;
    }

    return valid;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let passwords = input.trim().split('\n');
    let valid = 0;

    for (let i = 0; i < passwords.length; i++) {
        let tokens = passwords[i].split(' ');
        let firstIndex = parseInt(tokens[0].split('-')[0]);
        let lastIndex = parseInt(tokens[0].split('-')[1]);
        let letter = tokens[1].replace(':', '');
        let password = tokens[2];

        if (((password.charAt(firstIndex - 1) == letter) & 0x1) ^ ((password.charAt(lastIndex - 1) == letter) & 0x1)) valid++;
    }

    return valid;
};

export { part1, part2 };
