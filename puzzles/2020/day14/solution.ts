// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day14/solution.ts
 *
 * ~~ Docking Data ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let instructions = input.trim().split('\n');
    let memory = [];

    let mask = 0;
    for (let i = 0; i < instructions.length; i++) {
        if (instructions[i].startsWith('mask')) {
            mask = instructions[i].split('=')[1].trim();
        } else {
            let address = parseInt(instructions[i].split(/[\[\]]/)[1]);
            let value = parseInt(instructions[i].split('=')[1]);

            let stringValue = value.toString(2).padStart(36, '0');

            for (let j = 0; j < stringValue.length; j++) {
                if (mask.charAt(j) != 'X') {
                    stringValue = stringValue.slice(0, j) + mask.charAt(j) + stringValue.slice(j + 1);
                }
            }

            memory[address] = parseInt(stringValue, 2);
        }
    }

    for (let i = 0; i < memory.length; i++) {
        if (!memory[i]) memory[i] = 0;
    }

    return memory.reduce((sum, num) => sum + num, 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let instructions = input.trim().split('\n');
    let memory = {};

    let mask = 0;
    for (let i = 0; i < instructions.length; i++) {
        if (instructions[i].startsWith('mask')) {
            mask = instructions[i].split('=')[1].trim();
        } else {
            let address = parseInt(instructions[i].split(/[\[\]]/)[1]);
            let value = parseInt(instructions[i].split('=')[1]);

            let stringAddress = address.toString(2).padStart(36, '0');
            let floating = [];

            for (let j = 0; j < stringAddress.length; j++) {
                if (mask.charAt(j) == '1') {
                    stringAddress = stringAddress.slice(0, j) + mask.charAt(j) + stringAddress.slice(j + 1);
                } else if (mask.charAt(j) == 'X') {
                    floating.push(j);
                }
            }

            let combinations = [];
            for (let j = 0; j < Math.pow(2, floating.length); j++) {
                combinations.push(j.toString(2).padStart(floating.length, '0'));
            }
            for (let j = 0; j < combinations.length; j++) {
                let newAddress = stringAddress;
                for (let k = 0; k < floating.length; k++) {
                    newAddress = newAddress.slice(0, floating[k]) + combinations[j].charAt(k) + newAddress.slice(floating[k] + 1);
                }
                memory[parseInt(newAddress, 2)] = value;
            }
        }
    }

    let sum = 0;
    for (let i in memory) {
        sum += memory[i];
    }
    return sum;
};

export { part1, part2 };
