// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2015/day11/solution.ts
 * 
 * ~~ Corporate Policy ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

/**
 * Increments password by moving to next letter like a digit
 * 
 * @param {string} password Password to increment
 * @returns {string} 
 */
const incrementPassword = password => {
    let newPassword = new Array(password.length), carry = true;
    for (let i = password.length - 1; i >= 0; i--) {
        let newCharacter = (password.charCodeAt(i) - 97) + ((carry) ? 1 : 0);
        if (newCharacter < 26) carry = false;
        newPassword[i] = String.fromCharCode((newCharacter % 26) + 97);
    }
    return newPassword.join('');
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    let current = input;
    while (true) {
        current = incrementPassword(current); 

        const pairs = current.split('').reduce((obj, character, index) => {
            if (character == current[index + 1] && character != current[index + 2]) {
                if (!obj[character + character]) obj[character + character] = 0;
                obj[character + character]++;
            }
            return obj;
        }, {});

        const increasing = current.split('').filter((_, index) => {
            return (current.charCodeAt(index) == (current.charCodeAt(index + 1) - 1) && current.charCodeAt(index) == (current.charCodeAt(index + 2) - 2));
        }).length != 0;

        const noDisallowed = !current.match(/[iol]/g);
        const hasDoublePair = Object.values(pairs).reduce((sum, count) => sum + count, 0) >= 2;

        if (increasing && noDisallowed && hasDoublePair) return current;
    }
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let current = part1(input);
    while (true) {
        current = incrementPassword(current);

        const pairs = current.split('').reduce((obj, character, index) => {
            if (character == current[index + 1] && character != current[index + 2]) {
                if (!obj[character + character]) obj[character + character] = 0;
                obj[character + character]++;
            }
            return obj;
        }, {});

        const increasing = current.split('').filter((_, index) => {
            return (current.charCodeAt(index) == (current.charCodeAt(index + 1) - 1) && current.charCodeAt(index) == (current.charCodeAt(index + 2) - 2));
        }).length != 0;

        const noDisallowed = !current.match(/[iol]/g);
        const hasDoublePair = Object.values(pairs).reduce((sum, count) => sum + count, 0) >= 2;

        if (increasing && noDisallowed && hasDoublePair) return current;
    }
}

export { part1, part2 };