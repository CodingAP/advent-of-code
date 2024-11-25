// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2023/day06/solution.ts
 * 
 * ~~ Wait For It ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/5/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    // parse input
    let [times, distances] = input.split(/\n/g).map(line => {
        return line.split(' ').filter(string => string != '').slice(1).map(num => parseInt(num));
    });

    // multiply all possible ways for each time/distance
    return times.reduce((mul, time, index) => {
        let ways = 0;
        for (let i = 0; i < time; i++) {
            if (i * (time - i) > distances[index]) ways++;
        }
        return mul * ways;
    }, 1);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    // parse input
    let [time, distance] = input.split(/\n/g).map(line => {
        return parseInt(line.split(' ').filter(string => string != '').slice(1).join(''));
    });

    // find all ways that i * (time - i) is bigger than distance
    let ways = 0;
    for (let i = 0; i < time; i++) {
        if (i * (time - i) > distance) ways++;
    }
    return ways;
}

export { part1, part2 };