// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day3/solution.ts
 * 
 * ~~ Squares With Three Sides ~~
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
    return input.split('\n').reduce((acc, line) => {
        let sides = line.split(/  +/g).slice(1).map(num => parseInt(num)).sort((a, b) => a - b);
        if (sides[0] + sides[1] > sides[2]) acc++;
        return acc;
    }, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let triangles = 0;
    let tempThree = [];
    input.split('\n').forEach(line => {
        tempThree.push(line.split(/  +/g).slice(1).map(num => parseInt(num)));

        if (tempThree.length == 3) {
            for (let i = 0; i < tempThree[0].length; i++) {
                let sides = [];
                for (let j = 0; j < tempThree.length; j++) {
                    sides.push(tempThree[j][i]);
                }
                sides.sort((a, b) => a - b);
                if (sides[0] + sides[1] > sides[2]) triangles++;
            }

            tempThree = [];
        }
    });

    return triangles;
}

export { part1, part2 };