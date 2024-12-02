/**
 * puzzles/2018/day05/solution.ts
 *
 * ~~ Alchemical Reduction ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/1/2024
 */

/**
 * reacts the polymer as much as possible
 * 
 * @param polymer - string of the polymer to react
 * @returns length of the remaining polymer
 */
const reactPolymer = (polymer: string) => {
    let current = polymer;

    // keep reacting until the next attempt doesn't shorten the string
    while (true) {
        let next = '';

        for (let i = 0; i < current.length; i++) {
            // checks to see if characters are Aa or aA
            if (current[i + 1] && current[i] !== current[i + 1] && (current[i].toLowerCase() === current[i + 1] || current[i] === current[i + 1].toLowerCase())) i++;
            else next += current[i]
        }

        if (current === next) break;
        current = next;
    }

    return current.length;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    return reactPolymer(input.trim());
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const allLetters = new Set(input.trim().toLowerCase());
    
    // remove all the letters of one type and find the minimum length
    return Math.min(...Array.from(allLetters).map(letter => {
        let filtered = input.trim().split('').filter(char => char.toLowerCase() !== letter).join('');
        return reactPolymer(filtered);
    }));
};

export { part1, part2 };
