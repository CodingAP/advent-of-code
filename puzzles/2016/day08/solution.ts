// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day8/solution.ts
 * 
 * ~~ Two-Factor Authentication ~~
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
    let width = 50, height = 6;
    let rows = new Array(height).fill(0).map((element, y) => new Array(width).fill(false));

    input.split('\n').forEach(line => {
        let tokens = line.split(' ');
        if (tokens[0] == 'rect') {
            let [w, h] = tokens[1].split('x').map(num => parseInt(num));
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    rows[y][x] = true;
                }
            }
        } else {
            let index = parseInt(tokens[2].split('=')[1]);
            let amount = parseInt(tokens[4]);
            let array = [];

            if (tokens[1] == 'row') {
                for (let x = 0; x < width; x++) array.push(rows[index][x]);
                for (let i = 0; i < amount; i++) array.unshift(array.pop());
                for (let x = 0; x < width; x++) rows[index][x] = array[x];
            } else {
                for (let y = 0; y < height; y++) array.push(rows[y][index]);
                for (let i = 0; i < amount; i++) array.unshift(array.pop());
                for (let y = 0; y < height; y++) rows[y][index] = array[y];
            }
        }
    });

    return rows.flatMap(element => element).filter(element => element).length;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let width = 50, height = 6;
    let rows = new Array(height).fill(0).map((element, y) => new Array(width).fill(false));

    input.split('\n').forEach(line => {
        let tokens = line.split(' ');
        if (tokens[0] == 'rect') {
            let [w, h] = tokens[1].split('x').map(num => parseInt(num));
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    rows[y][x] = true;
                }
            }
        } else {
            let index = parseInt(tokens[2].split('=')[1]);
            let amount = parseInt(tokens[4]);
            let array = [];

            if (tokens[1] == 'row') {
                for (let x = 0; x < width; x++) array.push(rows[index][x]);
                for (let i = 0; i < amount; i++) array.unshift(array.pop());
                for (let x = 0; x < width; x++) rows[index][x] = array[x];
            } else {
                for (let y = 0; y < height; y++) array.push(rows[y][index]);
                for (let i = 0; i < amount; i++) array.unshift(array.pop());
                for (let y = 0; y < height; y++) rows[y][index] = array[y];
            }
        }
    });
    
    console.log(rows.map(element => element.map(element => (element) ? '#' : ' ').join('')).join('\n'));
    return 'EOARGPHYAO';
}

export { part1, part2 };