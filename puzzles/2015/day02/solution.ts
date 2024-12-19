/**
 * puzzles/2015/day02/solution.ts
 * 
 * ~~ I Was Told There Would Be No Math ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 */
const part1 = (input: string) => {
    return input.trim().split('\n').reduce((sum, dimensions) => {
        const [l, w, h] = dimensions.split('x').map(num => parseInt(num)).sort((a, b) => a - b);
        const surfaceArea = 2 * l * w + 2 * w * h + 2 * h * l;
        const extra = l * w;
        return sum + surfaceArea + extra;
    }, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 */
const part2 = (input: string) => {
    return input.trim().split('\n').reduce((sum, dimensions) => {
        const [l, w, h] = dimensions.split('x').map(num => parseInt(num)).sort((a, b) => a - b);
        const perimeter = 2 * l + 2 * w;
        const extra = l * w * h;
        return sum + perimeter + extra;
    }, 0);
}

export { part1, part2 };