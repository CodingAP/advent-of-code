// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2017/day10/solution.ts
 *
 * ~~ Knot Hash ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let hash = new Array(256).fill(0).map((element, index) => index);
    let sizes = input.trim().split(',').map(element => parseInt(element));

    let position = 0;
    sizes.forEach((size, index) => {
        for (let i = 0; i < size / 2; i++) {
            let temp = hash[(position + i) % hash.length];
            hash[(position + i) % hash.length] = hash[(position + (size - i - 1)) % hash.length];
            hash[(position + (size - i - 1)) % hash.length] = temp;
        }
        position = (position + size + index) % hash.length;
    });
    return hash[0] * hash[1];
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let hash = new Array(256).fill(0).map((element, index) => index);
    let sizes = input.trim().split('').map(element => element.charCodeAt(0));
    sizes.push(17, 31, 73, 47, 23);

    let position = 0, skip = 0;
    for (let round = 0; round < 64; round++) {
        sizes.forEach(size => {
            for (let i = 0; i < size / 2; i++) {
                let temp = hash[(position + i) % hash.length];
                hash[(position + i) % hash.length] = hash[(position + (size - i - 1)) % hash.length];
                hash[(position + (size - i - 1)) % hash.length] = temp;
            }
            position = (position + size + skip) % hash.length;
            skip++;
        });
    }
    
    let hashString = '';
    for (let group = 0; group < 16; group++) {
        let number = hash[group * 16];
        for (let xor = 1; xor < 16; xor++) number ^= hash[group * 16 + xor];
        hashString += number.toString(16).padStart(2, '0');
    }
    
    return hashString;
};

export { part1, part2 };
