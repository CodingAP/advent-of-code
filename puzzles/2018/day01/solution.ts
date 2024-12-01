/**
 * puzzles/2018/day01/solution.ts
 *
 * ~~ Chronal Calibration ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/28/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const numbers = input.trim().split('\n').map(num => parseInt(num));
    return numbers.reduce((sum, num) => sum + num, 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const numbers = input.trim().split('\n').map(num => parseInt(num));

    const seen: number[] = [];
    let sum = 0, position = 0;
    while (true) {
        sum += numbers[position];
        if (seen.includes(sum)) return sum;
        seen.push(sum);
        position = (position + 1) % numbers.length;
    }
};

export { part1, part2 };
