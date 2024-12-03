/**
 * puzzles/2024/day03/solution.ts
 *
 * ~~ Mull It Over ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/2/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const lines = input.trim().split('\n').join('');
    let score = 0;

    // use regex to find all mul matches and capture both numbers
    const mulInstructions = lines.matchAll(/mul\((\d+),(\d+)\)/g);
    for (const match of mulInstructions) {
        score += parseInt(match[1]) * parseInt(match[2]);
    }

    return score;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const lines = input.trim().split('\n').join('');
    let score = 0;

    // use regex to find all mul matches and capture both numbers, with do's and don't's affecting final result
    const mulInstructions = lines.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g);
    let enable = true;
    for (const match of mulInstructions) {
        if (match[0] === 'do()') enable = true;
        else if (match[0] === 'don\'t()') enable = false;
        else if (enable) score += parseInt(match[1]) * parseInt(match[2]);
    }

    return score;
};

export { part1, part2 };
