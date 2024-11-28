// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day25/solution.ts
 *
 * ~~ Combo Breaker ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let keys = input.trim().split('\n').map(num => parseInt(num));
    let loopSizes = [];

    keys.forEach(value => {
        let loop = 1;
        let number = 1;
        while (true) {
            number = (number * 7) % 20201227;
            if (number == value) {
                loopSizes.push(loop);
                return;
            }
            loop++;
        }
    });
    
    let number = 1;
    for (let i = 0; i < loopSizes[1]; i++) {
        number = (number * keys[0]) % 20201227;
    }
    return number;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    return '2020 DONE!';
};

export { part1, part2 };
