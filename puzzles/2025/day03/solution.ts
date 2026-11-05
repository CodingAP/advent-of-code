/**
 * puzzles/2025/day03/solution.ts
 *
 * ~~ Lobby ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/5/2026
 */

const maxJoltage = (digits: string, k: number): number => {
    let result = '';
    let start = 0;

    for (let remaining = k; remaining > 0; remaining--) {
        // Last index we can pick from and still have enough digits left
        const end = digits.length - remaining;
        let bestIdx = start;
        for (let i = start; i <= end; i++) {
            if (digits[i] > digits[bestIdx]) bestIdx = i; // strict > keeps the earliest max
            if (digits[bestIdx] === '9') break;           // can't do better than 9
        }
        result += digits[bestIdx];
        start = bestIdx + 1;
    }

    return Number(result);
};

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    return input
        .trim()
        .split('\n')
        .reduce((sum, line) => sum + maxJoltage(line.trim(), 2), 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    return input
        .trim()
        .split('\n')
        .reduce((sum, line) => sum + maxJoltage(line.trim(), 12), 0);
}

export { part1, part2 };
