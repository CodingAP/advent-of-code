// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day20/solution.ts
 * 
 * ~~ Firewall Rules ~~
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
    let blacklist = input.split('\n').reduce((array, line) => {
        let [min, max] = line.split('-').map(num => parseInt(num));
        array.push({ min, max });
        return array;
    }, []);

    for (let i = 0; i <= 4294967295; i++) {
        let allowed = true;
        for (let range of blacklist) {
            if (range.min <= i && range.max >= i) {
                allowed = false;
                i = range.max;
                break;
            }
        }
        if (allowed) return i;
    }
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let blacklist = input.split('\n').reduce((array, line) => {
        let [min, max] = line.split('-').map(num => parseInt(num));
        array.push({ min, max });
        return array;
    }, []);

    let count = 0;
    for (let i = 0; i <= 4294967295; i++) {
        let allowed = true;
        for (let range of blacklist) {
            if (range.min <= i && range.max >= i) {
                allowed = false;
                i = range.max;
                break;
            }
        }
        if (allowed) count++;
    }
    return count;
}

export { part1, part2 };