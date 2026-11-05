/**
 * backend/src/templates.ts
 *
 * file templates for newly generated puzzles
 *
 * by alex prosser
 */

const pad = (day: number) => String(day).padStart(2, '0');

const today = () => {
    const now = new Date();
    return `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
};

/**
 * starting solution.ts for a puzzle
 */
export const solutionTemplate = (year: number, day: number, title: string): string =>
    `/**
 * puzzles/${year}/day${pad(day)}/solution.ts
 *
 * ~~ ${title} ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * ${today()}
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    return 0;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    return 0;
};

export { part1, part2 };
`;
