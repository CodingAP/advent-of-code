/**
 * puzzles/2018/day02/solution.ts
 *
 * ~~ Inventory Management System ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/28/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let twos = 0, threes = 0;
    input.trim().split('\n').forEach(line => {
        const characters = line.split('').reduce<{ [key: string]: number }>((obj, letter) => {
            obj[letter] = (obj[letter] || 0) + 1;
            return obj;
        }, {});

        if (Object.values(characters).includes(2)) twos++;
        if (Object.values(characters).includes(3)) threes++;
    });
    return twos * threes;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const words = input.trim().split('\n');
    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < words.length; j++) {
            if (i === j) continue;

            let same = '';
            for (let k = 0; k < words[i].length; k++) {
                if (words[i][k] === words[j][k]) same += words[i][k];
            }
            if (same.length === words[i].length - 1) return same; 
        }
    }
};

export { part1, part2 };
