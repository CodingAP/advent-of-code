/**
 * puzzles/2025/day01/solution.ts
 *
 * ~~ Secret Entrance ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/3/2026
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const turns = input.trim().split('\n');
    let dial = 50;
    let count = 0;
    for (let i = 0; i < turns.length; i++) {
        const direction = (turns[i][0] === 'L') ? -1 : 1;
        const amount = parseInt(turns[i].slice(1));
        dial = ((dial + amount * direction) + 100) % 100;

        if (dial === 0) count++;
    }
    return count;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const turns = input.trim().split('\n');
    let dial = 50;
    let count = 0;
    for (let i = 0; i < turns.length; i++) {
        const direction = (turns[i][0] === 'L') ? -1 : 1;
        const amount = parseInt(turns[i].slice(1));

        for (let i = 0; i < amount; i++) {
            dial = (dial + direction + 100) % 100;
            if (dial === 0) count++;
        }
    }
    return count;
};

export { part1, part2 };
