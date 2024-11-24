/**
 * aoc/puzzles/2020/day06/solution.js
 * 
 * ~~ Custom Customs ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/30/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    return input.split(/\n\n/g).reduce((sum, groups) => {
        return sum + new Set(groups.replace(/\n/g, '').split('')).size;
    }, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    return input.split(/\n\n/g).reduce((sum, groups) => {
        groups = groups.split(/\n/);
        let characters = groups.reduce((obj, line) => {
            line.split('').forEach(character => {
                if (obj[character] == null) obj[character] = 0;
                obj[character]++;
            })
            return obj;
        }, {});

        return sum + Object.values(characters).filter(count => count == groups.length).length;
    }, 0);
}

export { part1, part2 };