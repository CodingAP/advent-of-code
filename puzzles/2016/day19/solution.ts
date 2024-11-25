// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day19/solution.ts
 * 
 * ~~ An Elephant Named Joseph ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    // thank you numberphile (https://www.youtube.com/watch?v=uCsD3ZGzMgE&ab_channel=Numberphile)
    let binary = parseInt(input).toString(2);
    return parseInt(binary.slice(1) + binary.charAt(0), 2);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let num = parseInt(input);
    let largest3 = 1;
    while (largest3 < num) largest3 *= 3;
    largest3 /= 3;
    let current = 0, increase = 1;
    
    for (let i = largest3; i < num; i++) {
        current += increase;
        if (i == largest3 / 3) increase = 2;
    }

    return current;
}

export { part1, part2 };