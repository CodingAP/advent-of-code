/**
 * puzzles/2019/day01/solution.ts
 *
 * ~~ The Tyranny of the Rocket Equation ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/20/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    return input.trim().split('\n').map(num => parseInt(num)).reduce((sum, num) => sum + (Math.floor(num / 3) - 2), 0);
}

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    return input.trim().split('\n').map(num => parseInt(num)).reduce((sum, num) => {
        let fuel = 0, mass = num;
        while (mass > 0) {
            mass = Math.max(Math.floor(mass / 3) - 2, 0);
            fuel += mass;
        }
        return sum + fuel;
    }, 0);
}

export { part1, part2 };