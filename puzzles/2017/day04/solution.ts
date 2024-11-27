/**
 * puzzles/2017/day04/solution.ts
 *
 * ~~ High-Entropy Passphrases ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const lines = input.trim().split('\n').map(line => line.split(' '));

    return lines.reduce((sum, line) => sum + ((line.length === new Set(line).size) ? 1 : 0), 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // if we sort each word, we can then tell the anagrams apart
    const lines = input.trim().split('\n').map(line => line.split(' ').map(word => word.split('').sort().join('')));

    return lines.reduce((sum, line) => sum + ((line.length === new Set(line).size) ? 1 : 0), 0);
};

export { part1, part2 };
