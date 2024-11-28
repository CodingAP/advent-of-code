// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2021/day03/solution.ts
 *
 * ~~ Binary Diagnostic ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let binary = input.split('\n');
    let gamma = '';
    let ones = 0, zeros = 0;
    for (let j = 0; j < binary[0].length; j++) {
        for (let i = 0; i < binary.length; i++) {
            if (binary[i][j] == '1') ones++;
            else zeros++;
        }
        if (ones > zeros) gamma += '1';
        else gamma += '0';
        ones = 0;
        zeros = 0;
    }

    let epsilon = gamma.split('').map(element => {
        if (element == '1') return '0';
        else return '1';
    }).join('');
    
    return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let binary = input.split('\n');
    let ones = 0, zeros = 0;

    let oxygen = '';
    for (let j = 0; j < binary[0].length; j++) {
        for (let i = 0; i < binary.length; i++) {
            if (binary[i][j] == '1') ones++;
            else zeros++;
        }

        if (ones >= zeros) binary = binary.filter(element => element[j] === '1');
        else binary = binary.filter(element => element[j] === '0');

        ones = 0;
        zeros = 0;
        if (binary.length == 1) {
            oxygen = binary[0];
            break;
        }
    }

    binary = input.split('\n');

    let carbon = '';
    for (let j = 0; j < binary[0].length; j++) {
        for (let i = 0; i < binary.length; i++) {
            if (binary[i][j] == '1') ones++;
            else zeros++;
        }

        if (ones < zeros) binary = binary.filter(element => element[j] === '1');
        else binary = binary.filter(element => element[j] === '0');

        ones = 0;
        zeros = 0;
        if (binary.length == 1) {
            carbon = binary[0];
            break;
        }
    }
    
    return parseInt(oxygen, 2) * parseInt(carbon, 2);
};

export { part1, part2 };
