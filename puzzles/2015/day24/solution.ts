// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2015/day24/solution.ts
 * 
 * ~~ It Hangs in the Balance ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/28/2023
 */

/**
 * gets all possible combinations of elements with length k
 * 
 * @param {any[]} array list of elements to combine
 * @param {number} k length of set
 * @returns {any[][]}
 */
const combination = (array, k) => {
    let result = [];

    const combRecursive = (_array, _k, _i, _current) => {
        if (_current.length == k) result.push(_current);
        if (_current.length == k || _i == _array.length) return;

        combRecursive(_array, _k, _i + 1, [_array[_i], ..._current]);
        combRecursive(_array, _k, _i + 1, [..._current]);
    }

    combRecursive(array, k, 0, []);
    return result;
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    // parse inputs
    const weights = input.split(/\n/g).map(num => parseInt(num));

    // technically, we don't need to check the other two groups, we just need the first one
    const neededWeight = weights.reduce((sum, num) => sum + num, 0) / 3;

    // try all possible sizes (starting from 1 to find the minimum faster)
    for (let size = 1; size <= weights.length; size++) {
        let minimum = combination(weights, size).reduce((min, subset) => {
            if (subset.reduce((sum, num) => sum + num, 0) == neededWeight) return Math.min(min, subset.reduce((mul, num) => mul * num, 1));
            else return min;
        }, Infinity);

        if (minimum != Infinity) return minimum;
    }
    return 0;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    // parse inputs
    const weights = input.split(/\n/g).map(num => parseInt(num));

    // now, we check for 4
    const neededWeight = weights.reduce((sum, num) => sum + num, 0) / 4;

    // try all possible sizes (starting from 1 to find the minimum faster)
    for (let size = 1; size <= weights.length; size++) {
        let minimum = combination(weights, size).reduce((min, subset) => {
            if (subset.reduce((sum, num) => sum + num, 0) == neededWeight) return Math.min(min, subset.reduce((mul, num) => mul * num, 1));
            else return min;
        }, Infinity);

        if (minimum != Infinity) return minimum;
    }
    return 0;
}

export { part1, part2 };