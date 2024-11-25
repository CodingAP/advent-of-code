// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day10/solution.ts
 * 
 * ~~ Balance Bots ~~
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
    let instructions = input.split('\n');

    let bots = {};
    let output = [];

    let count = 0;
    while (count < 100) {
        for (let i = 0; i < instructions.length; i++) {
            let tokens = instructions[i].split(' ');
            if (tokens[0] == 'value') {
                if (!bots[tokens[5]]) bots[tokens[5]] = [];
                bots[tokens[5]].push(parseInt(tokens[1]));
                instructions[i] = 'pass';
            } else if (tokens[0] == 'bot') {
                if (bots[tokens[1]] && bots[tokens[1]].length == 2) {
                    let low = Math.min(bots[tokens[1]][0], bots[tokens[1]][1]);
                    let high = Math.max(bots[tokens[1]][0], bots[tokens[1]][1]);

                    if (tokens[5] == 'output') {
                        output[tokens[6]] = low;
                    } else if (tokens[5] == 'bot') {
                        if (!bots[tokens[6]]) bots[tokens[6]] = [];
                        bots[tokens[6]].push(low);

                        if (bots[tokens[6]].includes(61) && bots[tokens[6]].includes(17)) return tokens[6];
                    }
                    
                    if (tokens[10] == 'output') {
                        output[tokens[11]] = high;
                    } else if (tokens[10] == 'bot') {
                        if (!bots[tokens[11]]) bots[tokens[11]] = [];
                        bots[tokens[11]].push(high);

                        if (bots[tokens[11]].includes(61) && bots[tokens[11]].includes(17)) return tokens[11];
                    }

                    bots[tokens[1]] = [];

                    instructions[i] = 'pass';
                }
            }
        }
        count++;
    }
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let instructions = input.split('\n');

    let bots = {};
    let output = [];

    let count = 0;
    while (count < 100) {
        for (let i = 0; i < instructions.length; i++) {
            let tokens = instructions[i].split(' ');
            if (tokens[0] == 'value') {
                if (!bots[tokens[5]]) bots[tokens[5]] = [];
                bots[tokens[5]].push(parseInt(tokens[1]));
                instructions[i] = 'pass';
            } else if (tokens[0] == 'bot') {
                if (bots[tokens[1]] && bots[tokens[1]].length == 2) {
                    let low = Math.min(bots[tokens[1]][0], bots[tokens[1]][1]);
                    let high = Math.max(bots[tokens[1]][0], bots[tokens[1]][1]);

                    if (tokens[5] == 'output') {
                        output[tokens[6]] = low;
                    } else if (tokens[5] == 'bot') {
                        if (!bots[tokens[6]]) bots[tokens[6]] = [];
                        bots[tokens[6]].push(low);
                    }

                    if (tokens[10] == 'output') {
                        output[tokens[11]] = high;
                    } else if (tokens[10] == 'bot') {
                        if (!bots[tokens[11]]) bots[tokens[11]] = [];
                        bots[tokens[11]].push(high);
                    }

                    bots[tokens[1]] = [];

                    instructions[i] = 'pass';
                }
            }
        }
        count++;
    }

    return (output[0] * output[1] * output[2]);
}

export { part1, part2 };