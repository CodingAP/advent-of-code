/**
 * aoc/puzzles/2020/day02/solution.js
 * 
 * ~~ Password Philosophy ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/29/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // parse input
    let passwordPolicies = input.split(/\n/g).map(line => {
        let [range, character, password] = line.replace(/:/g, '').split(/ /g);
        range = range.split(/-/g).map(num => parseInt(num));
        return { range, character, password };
    });

    // check to see how many policies follow procedure
    return passwordPolicies.reduce((sum, policy) => {
        let characters = policy.password.split('').reduce((obj, character) => {
            if (obj[character] == null) obj[character] = 0;
            obj[character]++;
            return obj;
        }, {});

        if (characters[policy.character] >= policy.range[0] && characters[policy.character] <= policy.range[1]) sum++;
        return sum;
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
    let passwordPolicies = input.split(/\n/g).map(line => {
        let [range, character, password] = line.replace(/:/g, '').split(/ /g);
        range = range.split(/-/g).map(num => parseInt(num));
        return { range, character, password };
    });

    // check to see how many policies follow procedure (remember: no index zero)
    return passwordPolicies.reduce((sum, policy) => {
        let count = 0;
        if (policy.password[policy.range[0] - 1] == policy.character) count++;
        if (policy.password[policy.range[1] - 1] == policy.character) count++;

        if (count == 1) sum++;
        return sum;
    }, 0);
}

export { part1, part2 };