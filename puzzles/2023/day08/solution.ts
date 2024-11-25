// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2023/day08/solution.ts
 * 
 * ~~ Haunted Wasteland ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/7/2023
 */

/**
 * find the greatest common factor of two numbers
 * 
 * @param {number} a first number
 * @param {number} b second number 
 * @returns {number}
 */
const gcf = (a, b) => b == 0 ? a : gcf(b, a % b);

/**
 * find the least common multiple of two numbers
 * 
 * @param {number} a first number
 * @param {number} b second number 
 * @returns {number}
 */
const lcm = (a, b) => a / gcf(a, b) * b;

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    // parse input
    const groups = input.split(/\n\n/g);
    const turns = groups[0];

    /**
     * decides what is left and right of the each node
     * 
     * @type {Record<string, { left: string, right: string }>} 
     */
    const directions = groups[1].split(/\n/g).reduce((obj, line) => {
        const [start, other] = line.split(/ = /);
        const [left, right] = other.replace(/[\(\)]/g, '').split(/, /g);
        obj[start] = { left, right };
        return obj;
    }, {});

    // see how many steps it takes to get from 'AAA' to 'ZZZ'
    let current = 'AAA', steps = 0;
    while (current != 'ZZZ') {
        current = directions[current][turns[steps % turns.length] == 'L' ? 'left' : 'right'];
        steps++;
    }

    return steps;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    // parse input
    const groups = input.split(/\n\n/g);
    const turns = groups[0];

    /**
     * decides what is left and right of the each node
     * 
     * @type {Record<string, { left: string, right: string }>} 
     */
    const directions = groups[1].split(/\n/g).reduce((obj, line) => {
        const [start, other] = line.split(/ = /);
        const [left, right] = other.replace(/[\(\)]/g, '').split(/, /g);
        obj[start] = { left, right };
        return obj;
    }, {});

    // find all paths that end with 'A'
    let current = Object.keys(directions).filter(name => name[name.length - 1] == 'A');

    // see how many steps it take for each path to loop
    for (let i = 0; i < current.length; i++) {
        let steps = 0;
        while (current[i][current[i].length - 1] != 'Z') {
            current[i] = directions[current[i]][turns[steps % turns.length] == 'L' ? 'left' : 'right'];

            steps++;
        }
        current[i] = steps;
    }
    
    // find the least common multiple of all the steps to find when it takes for all of the to end
    return current.reduce((multiple, num) => lcm(multiple, num), 1);
}

export { part1, part2 };