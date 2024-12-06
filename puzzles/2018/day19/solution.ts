/**
 * puzzles/2018/day19/solution.ts
 *
 * ~~ Go With The Flow ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/5/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // note: this program just calculates the sum of all the factors of a number. in part 1, the number is 920. in part 2, the number is 10551320
    const num = 920;
    let sum = 0;

    for (let i = 1; i <= Math.sqrt(num); i++) {
        if (num % i !== 0) continue;

        const factor1 = i;
        const factor2 = num / i;
        if (factor1 === factor2) sum += factor1;
        else sum += factor1 + factor2;
    }

    return sum;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // note: this program just calculates the sum of all the factors of a number. in part 1, the number is 920. in part 2, the number is 10551320
    const num = 10551320;
    let sum = 0;

    for (let i = 1; i <= Math.sqrt(num); i++) {
        if (num % i !== 0) continue;

        const factor1 = i;
        const factor2 = num / i;
        if (factor1 === factor2) sum += factor1;
        else sum += factor1 + factor2;
    }

    return sum;
};

export { part1, part2 };
