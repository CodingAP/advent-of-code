/**
 * puzzles/2015/day08/solution.ts
 * 
 * ~~ Matchsticks ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 */
const part1 = (input: string) => {
    return input.trim().split(/\n/g).reduce((sum, line) => {
        let stringCount = 0;
        for (let i = 1; i < line.length - 1; i++) {
            if (line[i] == '\\') {
                if (line[i + 1] == 'x') {
                    i += 3;
                } else if (line[i + 1] == '"' || line[i + 1] == '\\') {
                    i++;
                }
            }
            stringCount++;
        }
        return sum + (line.length - stringCount);
    }, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 */
const part2 = (input: string) => {
    // add new quotes to length and add extra if it is quote or backslash
    return input.trim().split(/\n/g).reduce((sum, line) => {
        return sum + 2 + line.split('').filter(character => character == '"' || character == '\\').length;
    }, 0);
}

export { part1, part2 };