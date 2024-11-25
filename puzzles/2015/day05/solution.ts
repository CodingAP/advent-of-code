// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2015/day05/solution.ts
 * 
 * ~~ Doesn&apos;t He Have InternElves For This? ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    return input.split(/\n/g).reduce((sum, line) => {
        const characters = line.split('');

        const hasThreeVowels = characters.filter(character => character.match(/[aeiou]/)).length >= 3;
        const hasDouble = characters.filter((character, index) => character == characters[index + 1]).length != 0;
        const noDisallowed = !line.match(/ab|cd|pq|xy/g);

        return (hasThreeVowels && hasDouble && noDisallowed) + sum;
    }, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    return input.split(/\n/g).reduce((sum, line) => {
        const characters = line.split('');

        const pairs = characters.reduce((obj, character, index) => {
            let pair = character + characters[index + 1];
            if (!(character == characters[index + 1] && character == characters[index + 2])) {
                if (!obj[pair]) obj[pair] = 0;
                obj[pair]++;
            }
            return obj;
        }, {});
        
        const hasPair = Object.values(pairs).filter(count => count >= 2).length != 0;
        const hasMirrored = characters.filter((character, index) => character == characters[index + 2]).length != 0;

        return (hasMirrored && hasPair) + sum;
    }, 0);
}

export { part1, part2 };