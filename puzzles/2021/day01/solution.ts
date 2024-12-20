/**
 * puzzles/2021/day01/solution.ts
 *
 * ~~ Sonar Sweep ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const numbers = input.split('\n').map(num => parseInt(num));

    // count how many numbers are increasing from the last one
    let count = 0;
    for (let i = 1; i < numbers.length; i++) if (numbers[i] > numbers[i - 1]) count++;
    return count;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const numbers = input.split('\n').map(num => parseInt(num));
    
    // count how many numbers increased from the last 3 number window
    let count = 0;
    let last = numbers[0] + numbers[1] + numbers[2];
    for (let i = 1; i < numbers.length - 1; i++) {
        const next = numbers[i - 1] + numbers[i] + numbers[i + 1];
        if (next > last) count++;
        last = next;
    }
    return count;
};

export { part1, part2 };
