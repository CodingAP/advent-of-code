// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day9/solution.ts
 * 
 * ~~ Explosives in Cyberspace ~~
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
    let uncompressed = '';

    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) == '(') {
            let other = i;
            while (input.charAt(other) != ')') other++;
            let info = input.substring(i + 1, other).split('x').map(value => parseInt(value));
            let newString = '';
            for (let j = 0; j < info[1]; j++) {
                newString += input.substring(other + 1, other + info[0] + 1);
            }
            uncompressed += newString;
            i += other - i + info[0];
        } else {
            uncompressed += input.charAt(i);
        }
    }

    return uncompressed.length;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let findCompression = string => {
        let length = 0;

        for (let i = 0; i < string.length; i++) {
            if (string.charAt(i) == '(') {
                let other = i;
                while (string.charAt(other) != ')') other++;
                let info = string.substring(i + 1, other).split('x').map(value => parseInt(value));
                let stringRange = string.substring(other + 1, other + info[0] + 1);

                length += info[1] * findCompression(stringRange);

                i += other - i + info[0];
            } else length++;
        }

        return length;
    }

    return findCompression(input);
}

export { part1, part2 };