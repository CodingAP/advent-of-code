/**
 * puzzles/2017/day02/solution.ts
 *
 * ~~ Corruption Checksum ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const spreadsheet = input.trim().split('\n').map(line => line.split(/\s+/g).map(num => parseInt(num)));
    
    return spreadsheet.reduce((sum, line) => {
        return sum + (Math.max(...line) - Math.min(...line));
    }, 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const spreadsheet = input.trim().split('\n').map(line => line.split(/\s+/g).map(num => parseInt(num)));
    
    return spreadsheet.reduce((sum, line) => {
        for (let i = 0; i < line.length; i++) {
            for (let j = 0; j < line.length; j++) {
                if (i === j) continue;

                if (line[i] % line[j] === 0) return sum + (line[i] / line[j]);
            }   
        }
        return sum;
    }, 0);
};

export { part1, part2 };
