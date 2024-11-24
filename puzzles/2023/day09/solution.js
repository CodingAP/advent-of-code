/**
 * aoc/puzzles/2023/day09/solution.js
 * 
 * ~~ Mirage Maintenance ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/8/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // parse input
    const histories = input.split(/\n/g).map(line => line.split(/ /g).map(num => parseInt(num)));
    
    // sum all interpolated values of each difference
    return histories.reduce((sum, nums) => {
        // find all set of differences between each iteration
        let differences = [structuredClone(nums)];
        while (true) {
            const lastDifference = differences[differences.length - 1];
            let newDifferences = [];

            // find differences between the last iteration and put it into differences
            for (let i = 1; i < lastDifference.length; i++) {
                newDifferences.push(lastDifference[i] - lastDifference[i - 1]);
            }

            differences.push(newDifferences);

            // if new differences are all 0, we are done
            if (newDifferences.filter(num => num != 0).length == 0) break;
        }

        // interpolate the data to make a new value
        // it just adds the last value of the difference array for each one
        let current = 0;
        for (let i = differences.length - 1; i >= 0; i--) {
            current += differences[i][differences[i].length - 1];
        }

        return sum + current;
    }, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // parse input
    const histories = input.split(/\n/g).map(line => line.split(/ /g).map(num => parseInt(num)));

    // sum all interpolated values of each difference
    return histories.reduce((sum, nums) => {
        // find all set of differences between each iteration
        let differences = [structuredClone(nums)];
        while (true) {
            const lastDifference = differences[differences.length - 1];
            let newDifferences = [];

            // find differences between the last iteration and put it into differences
            for (let i = 1; i < lastDifference.length; i++) {
                newDifferences.push(lastDifference[i] - lastDifference[i - 1]);
            }

            differences.push(newDifferences);

            // if new differences are all 0, we are done
            if (newDifferences.filter(num => num != 0).length == 0) break;
        }

        // interpolate the data to make a new value
        // it just subtracts the current value from the first value of the difference array for each one
        let current = 0;
        for (let i = differences.length - 1; i >= 0; i--) {
            current = differences[i][0] - current;
        }

        return sum + current;
    }, 0);
}

export { part1, part2 };