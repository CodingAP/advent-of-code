// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2022/day13/solution.ts
 * 
 * ~~ Distress Signal ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
 */

const compareValues = (left, right) => {
    if (typeof left == 'number' && typeof right == 'number') {
        if (left > right) return false;
        if (left < right) return true;
        return null;
    } else if (Array.isArray(left) && Array.isArray(right)) {
        for (let i = 0; i < Math.min(left.length, right.length); i++) {
            let result = compareValues(left[i], right[i]);
            if (result != null) return result;
        }

        if (left.length < right.length) return true;
        else if (left.length > right.length) return false;
        return null;
    } else {
        return compareValues((typeof left == 'number') ? [left] : left, (typeof right == 'number') ? [right] : right);
    }
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    return input.split('\n\n').reduce((acc, lines, index) => {
        let [left, right] = lines.split('\n').map(element => JSON.parse(element));

        if (compareValues(left, right)) acc += index + 1;
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
    let lines = input.split('\n').filter(element => element != '').map(line => JSON.parse(line))
    lines.push([[2]], [[6]]);
    lines.sort((left, right) => { // .sort() uses numbers instead of boolean values
        let result = compareValues(left, right);
        if (result != null) return result ? -1 : 1;
        else return 0;
    });
    
    let first = -1, second = -1;
    for (let i = 0; i < lines.length; i++) {
        if (JSON.stringify(lines[i]) == '[[2]]') first = i + 1;
        if (JSON.stringify(lines[i]) == '[[6]]') second = i + 1;
    }

    return first * second;
}

export { part1, part2 };