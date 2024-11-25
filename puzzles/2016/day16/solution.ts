// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day16/solution.ts
 * 
 * ~~ Dragon Checksum ~~
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
    let data = input;
    let length = 272;
    while (data.length < length) {
        let a = data;
        let b = data.split('').map(element => (element == '0') ? 1 : 0).reverse().join('');

        data = a + '0' + b;
    }

    data = data.slice(0, length);
    while (data.length % 2 == 0) {
        let newData = '';
        for (let i = 0; i < data.length; i += 2) {
            newData += (data[i] == data[i + 1]) ? 1 : 0;
        }
        data = newData;
    }
    return data;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let data = input;
    let length = 35651584;
    while (data.length < length) {
        let a = data;
        let b = data.split('').map(element => (element == '0') ? 1 : 0).reverse().join('');

        data = a + '0' + b;
    }

    data = data.slice(0, length);
    while (data.length % 2 == 0) {
        let newData = '';
        for (let i = 0; i < data.length; i += 2) {
            newData += (data[i] == data[i + 1]) ? 1 : 0;
        }
        data = newData;
    }
    return data;
}

export { part1, part2 };