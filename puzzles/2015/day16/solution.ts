// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2015/day16/solution.ts
 * 
 * ~~ Aunt Sue ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/26/2023
 */

/**
 * Sue that we are looking for
 */
const correctSue = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    // parse input
    const sues = input.split('\n').reduce((array, sue, index) => {
        const tokens = sue.split(/: |, /g).slice(1);
        array[index] = {};
        for (let i = 0; i < tokens.length; i += 2) {
            array[index][tokens[i]] = parseInt(tokens[i + 1]);
        }
        return array;
    }, []);

    // find right sue
    for (let i = 0; i < sues.length; i++) {
        let correct = true;
        Object.keys(sues[i]).forEach(item => {
            if (correctSue[item] != sues[i][item]) correct = false;
        });

        if (correct) return i + 1;
    }

    return -1;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    // parse input
    const sues = input.split(/\n/g).reduce((array, sue, index) => {
        const tokens = sue.split(/: |, /g).slice(1);
        array[index] = {};
        for (let i = 0; i < tokens.length; i += 2) {
            array[index][tokens[i]] = parseInt(tokens[i + 1]);
        }
        return array;
    }, []);

    // find right sue
    for (let i = 0; i < sues.length; i++) {
        let correct = true;
        Object.keys(sues[i]).forEach(item => {
            if (item == 'cats' || item == 'trees') {
                if (correctSue[item] >= sues[i][item]) correct = false;
            } else if (item == 'pomeranians' || item == 'goldfish') {
                if (correctSue[item] <= sues[i][item]) correct = false;
            } else {
                if (correctSue[item] != sues[i][item]) correct = false;
            }
        });

        if (correct) return i + 1;
    }

    return -1;
}

export { part1, part2 };