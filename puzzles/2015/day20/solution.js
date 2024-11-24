/**
 * aoc/puzzles/2015/day20/solution.js
 * 
 * ~~ Infinite Elves and Infinite Houses ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

/**
 * returns the sum of all the factors of the numbers
 * 
 * calculates it by going through all numbers 1 - sqrt(number) and checks if divisible
 * if yes, then sum that factor and it's other (k + number/k)
 * 
 * if limit is provided (used for part 2), it will check if factor reaches it
 * 
 * @param {number} number number to factorize and sum 
 * @returns {number}
 */
const factorSum = (number, limit = -1) => {
    let sum = 0;

    for (let k = 1; k * k <= number; k++) {
        if (number % k == 0) {
            if (limit !== -1) {
                if (k * limit >= number) sum += k;
                if ((number / k) * limit >= number) sum += (number / k);
            } else {
                sum += k + (number / k);
            }
        }
    }

    return sum;
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    let house = 1; 
    while (true) {
        if (parseInt(input) <= factorSum(house) * 10) return house;
        house++;
    }
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    let house = 1;
    while (true) {
        if (parseInt(input) <= factorSum(house, 50) * 11) return house;
        house++;
    }
}

export { part1, part2 };