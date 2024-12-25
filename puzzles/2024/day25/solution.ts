/**
 * puzzles/2024/day25/solution.ts
 *
 * ~~ Code Chronicle ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/24/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const keys: number[][] = [];
    const locks: number[][] = [];

    // seperate each key and lock, then identify
    input.trim().split('\n\n').forEach(lines => {
        const grid = lines.split('\n');
        const heights: number[] = [];
        const isKey = grid[0].split('').every(char => char === '.');

        for (let x = 0; x < grid[0].length; x++) {
            for (let y = 0; y < grid.length; y++) {
                // calculate height based on whether or not it is a key
                if (isKey && grid[y][x] === '#') {
                    heights.push(grid.length - y - 1);
                    break;
                }

                if (!isKey && grid[y][x] === '.') {
                    heights.push(y - 1);
                    break;
                }
            }
        }

        // place in right array
        if (isKey) keys.push(heights);
        else locks.push(heights);
    });

    // go through all pairs of locks and keys and check for nonoverlap
    let count = 0;
    for (let i = 0; i < locks.length; i++) {
        for (let j = 0; j < keys.length; j++) {
            let valid = true;
            for (let k = 0; k < locks[i].length; k++) {
                if (locks[i][k] + keys[j][k] >= 6) valid = false;
            }
            if (valid) count++;
        }
    }
    return count;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (_input: string) => {
    return '2024 DONE!';
};

export { part1, part2 };
