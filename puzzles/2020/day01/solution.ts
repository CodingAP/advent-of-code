/**
 * puzzles/2020/day01/solution.ts
 *
 * ~~ Report Repair ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const numbers = input.trim().split('\n').map(value => parseInt(value));

    for (let i = 0; i < numbers.length; i++) {
        const other = 2020 - numbers[i];
        if (numbers.includes(other)) return numbers[i] * other;
    }

    return 0;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const numbers = input.trim().split('\n').map(value => parseInt(value));

    for (let i = 0; i < numbers.length; i++) {
        const left = 2020 - numbers[i];
        for (let j = 0; j < numbers.length; j++) {
            const other = left - numbers[j];
            if (numbers.includes(other)) return numbers[i] * numbers[j] * other;
        }
    }

    return 0;
};

export { part1, part2 };
