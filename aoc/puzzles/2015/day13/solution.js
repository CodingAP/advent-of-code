/**
 * aoc/puzzles/2015/day13/solution.js
 * 
 * ~~ Knights of the Dinner Table ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/26/2023
 */

/**
 * Take an array and return all possible permutations
 * 
 * @param {any[]} array some array to permute
 * @returns {any[][]} all possible permutations
 */
const permuation = array => {
    if (!array.length) return [[]];
    return array.flatMap(element => {
        return permuation(array.filter(perm => perm !== element)).map(perms => [element, ...perms]);
    });
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // parse input
    const happinesses = input.split(/\n/g).reduce((obj, score) => {
        let words = score.replace(/\./g, '').split(' ');

        if (obj[words[0]] == null) obj[words[0]] = {};
        obj[words[0]][words[10]] = parseInt(words[3]) * ((words[2] == 'gain') ? 1 : -1);

        return obj;
    }, {});

    // find the max happiness score through brute force
    const allPossible = permuation(Object.keys(happinesses));
    return allPossible.reduce((max, arrangment) => {
        let happiness = 0;
        for (let i = 0; i < arrangment.length; i++) {
            happiness += happinesses[arrangment[i]][arrangment[(i + 1) % arrangment.length]];
            happiness += happinesses[arrangment[(i + 1) % arrangment.length]][arrangment[i]];
        }

        return Math.max(max, happiness);
    }, -Infinity);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // parse input
    const happinesses = input.split(/\n/g).reduce((obj, score) => {
        let words = score.replace(/\./g, '').split(' ');

        if (obj[words[0]] == null) obj[words[0]] = {};
        obj[words[0]][words[10]] = parseInt(words[3]) * ((words[2] == 'gain') ? 1 : -1);

        return obj;
    }, {});

    // add "Me" with neutral happiness score;
    let allPeople = Object.keys(happinesses);
    happinesses["Me"] = {};
    for (let i = 0; i < allPeople.length; i++) {
        happinesses["Me"][allPeople[i]] = 0;
        happinesses[allPeople[i]]["Me"] = 0;
    }

    // find the max happiness score through brute force
    const allPossible = permuation(Object.keys(happinesses));
    return allPossible.reduce((max, arrangment) => {
        let happiness = 0;
        for (let i = 0; i < arrangment.length; i++) {
            happiness += happinesses[arrangment[i]][arrangment[(i + 1) % arrangment.length]];
            happiness += happinesses[arrangment[(i + 1) % arrangment.length]][arrangment[i]];
        }

        return Math.max(max, happiness);
    }, -Infinity);
}

export { part1, part2 };