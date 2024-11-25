// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day21/solution.ts
 * 
 * ~~ Scrambled Letters and Hash ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
 */

/**
 * returns all permutations of an array
 * 
 * @param {string[]} array array to permute
 * @returns {string[][]} all permutations of the given array
 */
const permute = (array) => {
    if (array.length === 0) return [[]];

    const result = [];
    for (let i = 0; i < array.length; i++) {
        const rest = array.slice(0, i).concat(array.slice(i + 1));
        const permutations = permute(rest);
        for (const perm of permutations) {
            result.push([array[i], ...perm]);
        }
    }
    return result;
}

let scrambleTheString = (string, instructions) => {
    let scrambler = string.split('');

    instructions.forEach(line => {
        let tokens = line.split(' ');
        if (tokens[0] == 'swap') {
            if (tokens[1] == 'position') {
                let first = parseInt(tokens[2]);
                let second = parseInt(tokens[5]);

                let temp = scrambler[first];
                scrambler[first] = scrambler[second];
                scrambler[second] = temp;
            } else if (tokens[1] == 'letter') {
                let first = scrambler.indexOf(tokens[2]);
                let second = scrambler.indexOf(tokens[5]);

                let temp = scrambler[first];
                scrambler[first] = scrambler[second];
                scrambler[second] = temp;
            }
        } else if (tokens[0] == 'rotate') {
            if (tokens[1] == 'left') {
                for (let s = 0; s < parseInt(tokens[2]); s++) scrambler.push(scrambler.shift());
            } else if (tokens[1] == 'right') {
                for (let s = 0; s < parseInt(tokens[2]); s++) scrambler.unshift(scrambler.pop());
            } else if (tokens[1] == 'based') {
                let index = scrambler.indexOf(tokens[6]);
                let times = 1 + index + ((index >= 4) ? 1 : 0);
                for (let s = 0; s < times; s++) scrambler.unshift(scrambler.pop());
            }
        } else if (tokens[0] == 'reverse') {
            let first = parseInt(tokens[2]);
            let second = parseInt(tokens[4]);

            let part = scrambler.slice(first, second + 1).reverse();
            for (let i = 0; i < part.length; i++) scrambler[first + i] = part[i];
        } else if (tokens[0] == 'move') {
            let first = parseInt(tokens[2]);
            let second = parseInt(tokens[5]);

            let removed = scrambler.splice(first, 1);
            scrambler.splice(second, 0, removed[0]);
        }
    });

    return scrambler.join('');
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    return scrambleTheString('abcdefgh', input.split('\n'));
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let permutations = permute('abcdefgh'.split('')).map(value => value.join(''));
    for (let i = 0; i < permutations.length; i++) {
        if (scrambleTheString(permutations[i], input.split('\n')) == 'fbgdceah') return permutations[i];
    }
}

export { part1, part2 };