/**
 * puzzles/2024/day19/solution.ts
 *
 * ~~ Linen Layout ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/18/2024
 */

/**
 * recursively count how many possible components can make up a design
 */
const isPossible = (design: string, memo: { [key: string]: number }, possible: string[]): number => {
    // if already processed or empty, return result
    if (memo[design] !== undefined) return memo[design];
    if (design.length === 0) return 0;

    // else, count how many is possible
    let count = 0;
    for (let i = 0; i < possible.length; i++) {
        if (design.startsWith(possible[i])) {
            const newDesign = design.slice(possible[i].length);
            count += isPossible(newDesign, memo, possible);
        }
    }

    // cache result to speed up operations
    memo[design] = count;
    return count;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const parts = input.trim().split('\n\n');
    const possible = parts[0].replace(/\s/g, '').split(',');
    const designs = parts[1].split('\n');

    // memoize previous designs to speed up operations
    const memo: { [key: string]: number } = {};

    // try to count the base designs to see if some can be made into others
    // for example: given r, g, b, bg, rb, br; r, g, b: 1; bg, rb, br: 2
    const maxLength = possible.sort((a, b) => b.length - a.length)[0].length;
    for (let len = 1; len < maxLength; len++) {
        const current = possible.filter(design => design.length === len);
        if (len === 1) current.forEach(design => memo[design] = 1);
        else current.forEach(design => memo[design] = isPossible(design, memo, possible) + 1);
    }

    // add up all possible designs
    return designs.reduce((sum, design) => sum + ((isPossible(design, memo, possible) > 0) ? 1 : 0), 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const parts = input.trim().split('\n\n');
    const possible = parts[0].replace(/\s/g, '').split(',');
    const designs = parts[1].split('\n');

    // memoize previous designs to speed up operations
    const memo: { [key: string]: number } = {};

    // try to count the base designs to see if some can be made into others
    // for example: given r, g, b, bg, rb, br; r, g, b: 1; bg, rb, br: 2
    const maxLength = possible.sort((a, b) => b.length - a.length)[0].length;
    for (let len = 1; len < maxLength; len++) {
        const current = possible.filter(design => design.length === len);
        if (len === 1) current.forEach(design => memo[design] = 1);
        else current.forEach(design => memo[design] = isPossible(design, memo, possible) + 1);
    }

    // add up all possible designs
    return designs.reduce((sum, design) => sum + isPossible(design, memo, possible), 0);
};

export { part1, part2 };
