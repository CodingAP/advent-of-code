// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2022/day25/solution.ts
 * 
 * ~~ Full of Hot Air ~~
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
    let conversion = {
        0: 0,
        1: 1,
        2: 2,
        '-': -1,
        '=': -2
    }

    let numbers = input.split('\n').map(line => {
        let number = 0;
        let digit = 0;
        for (let i = line.length - 1; i >= 0; i--) {
            number += conversion[line[i]] * Math.pow(5, digit);
            digit++;
        }
        return number;
    });

    let sum = numbers.reduce((acc, num) => acc + num, 0);
    
    let convertToSNAFU = number => {
        if (number == 0) return '';
        let nextDigit = number % 5;
        let entries = Object.entries(conversion)
        for (let i = 0; i < entries.length; i++) {
            if ((entries[i][1] + 5) % 5 == nextDigit) {
                let newDigit = Math.floor((number - entries[i][1]) / 5);
                return convertToSNAFU(newDigit) + entries[i][0];
            }
        }
        return '';
    }
    
    return convertToSNAFU(sum);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    return '2022 DONE!';
}

export { part1, part2 };