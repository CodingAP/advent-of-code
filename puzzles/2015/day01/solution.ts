/**
 * puzzles/2015/day1/solution.ts
 * 
 * ~~ Not Quite Lisp ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/26/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 */
const part1 = (input: string) => {
    return input.split('').reduce((sum, char) => sum + ((char == '(') ? 1 : -1), 0);
}

/**
 * code for part 2 of the advent of code puzzle
 */
const part2 = (input: string) => {
    let floor = 0, first = -1;
    input.split('').forEach((char, index) => {
        floor += (char == '(') ? 1 : -1;
        if (floor < 0 && first == -1) first = index + 1;
    });
    return first;
}

export { part1, part2 };