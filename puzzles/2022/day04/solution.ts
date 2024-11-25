// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2022/day4/solution.ts
 * 
 * ~~ Camp Cleanup ~~
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
    let pairs = input.split('\n').reduce((array, line) => {
        let [left, right] = line.split(',').map(element => element.split('-').map(num => parseInt(num)));
        array.push({ left, right });
        return array;
    }, []);

    return pairs.reduce((acc, pairs) => {
        if ((pairs.left[0] >= pairs.right[0] && pairs.left[1] <= pairs.right[1]) ||
            pairs.right[0] >= pairs.left[0] && pairs.right[1] <= pairs.left[1]) acc++;
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
    let pairs = input.split('\n').reduce((array, line) => {
        let [left, right] = line.split(',').map(element => element.split('-').map(num => parseInt(num)));
        array.push({ left, right });
        return array;
    }, []);

    return pairs.reduce((acc, pairs) => {
        let collisions = {};
        for (let i = pairs.left[0]; i <= pairs.left[1]; i++) {
            if (collisions[i] == null) collisions[i] = 0;
            collisions[i]++; 
        }
        for (let i = pairs.right[0]; i <= pairs.right[1]; i++) {
            if (collisions[i] == null) collisions[i] = 0;
            collisions[i]++;
        }
        if (Object.values(collisions).filter(element => element == 2).length > 0) acc++;
        return acc;
    }, 0);
}

export { part1, part2 };