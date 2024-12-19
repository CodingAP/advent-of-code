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
 */
const part1 = (input: string) => {
    return input.split('\n').reduce((sum, line) => {
        const characters = line.split('');

        const hasThreeVowels = characters.filter(character => character.match(/[aeiou]/)).length >= 3;
        const hasDouble = characters.filter((character, index) => character === characters[index + 1]).length !== 0;
        const noDisallowed = !line.match(/ab|cd|pq|xy/g);

        return sum + ((hasThreeVowels && hasDouble && noDisallowed) ? 1 : 0);
    }, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 */
const part2 = (input: string) => {
    return input.split('\n').reduce((sum, line) => {
        const characters = line.split('');

        const pairs = characters.reduce<{ [key: string]: number }>((obj, character, index) => {
            let pair = character + characters[index + 1];
            if (!(character === characters[index + 1] && character === characters[index + 2])) obj[pair] = (obj[pair] || 0) + 1;
            return obj;
        }, {});
        
        const hasPair = Object.values(pairs).filter(count => count >= 2).length != 0;
        const hasMirrored = characters.filter((character, index) => character == characters[index + 2]).length != 0;

        return sum + ((hasMirrored && hasPair) ? 1 : 0);
    }, 0);
}

export { part1, part2 };