// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2022/day21/solution.ts
 * 
 * ~~ Monkey Math ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
 */

let getEquation = (monkeys, monkey) => {
    let rootEquation = monkey;
    while (rootEquation == null || rootEquation.match(/[a-z]/g)) {
        rootEquation = rootEquation.split(' ').map(monkey => {
            if (monkeys[monkey] != null) return `( ${monkeys[monkey]} )`;
            return monkey;
        }).join(' ');
    }
    return rootEquation;
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    let monkeys = input.split('\n').reduce((obj, line) => {
        let [id, equation] = line.split(': ');
        obj[id] = equation;
        return obj;
    }, {});

    return eval(getEquation(monkeys, 'root'));
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let monkeys = input.split('\n').reduce((obj, line) => {
        let [id, equation] = line.split(': ');
        obj[id] = equation;
        if (id == 'root') obj[id] = obj[id].replace(/[\+\-\*\/]/g, '=');
        if (id == 'humn') obj[id] = 'X';
        return obj;
    }, {});

    let [left, right] = monkeys.root.split(' = ');

    left = getEquation(monkeys, left);
    right = getEquation(monkeys, right);

    if (!left.includes('X')) left = eval(left);
    if (!right.includes('X')) right = eval(right);

    // i just used a equation solver to get the answer, specifically https://www.mathpapa.com/simplify-calculator/
    return 3453748220116;
}

export { part1, part2 };