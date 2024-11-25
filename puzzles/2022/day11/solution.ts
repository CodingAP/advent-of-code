// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2022/day11/solution.ts
 * 
 * ~~ Monkey in the Middle ~~
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
    let monkeys = input.split('\n\n').map(lines => {
        lines = lines.split('\n');
        let list = lines[1].split(': ')[1].split(', ').map(num => BigInt(num));
        let operation = lines[2].split(' = ')[1];
        let test = parseInt(lines[3].split('by ')[1]);
        let trueCondition = parseInt(lines[4].split('monkey ')[1]);
        let falseCondition = parseInt(lines[5].split('monkey ')[1]);
    
        return { list, operation, test, trueCondition, falseCondition, itemChecks: 0 };
    });

    for (let round = 0; round < 20; round++) {
        for (let i = 0; i < monkeys.length; i++) {
            while (monkeys[i].list.length != 0) {
                let worryLevel = Math.floor(eval(monkeys[i].operation.replace(/old/g, monkeys[i].list.shift())) / 3);
                monkeys[monkeys[i][(worryLevel % monkeys[i].test == 0) ? 'trueCondition' : 'falseCondition']].list.push(worryLevel);
                monkeys[i].itemChecks++;
            }
        }
    }

    monkeys.sort((a, b) => b.itemChecks - a.itemChecks);
    return monkeys[0].itemChecks * monkeys[1].itemChecks;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let monkeys = input.split('\n\n').map(lines => {
        lines = lines.split('\n');
        let list = lines[1].split(': ')[1].split(', ').map(num => BigInt(num));
        let operation = lines[2].split(' = ')[1];
        let test = parseInt(lines[3].split('by ')[1]);
        let trueCondition = parseInt(lines[4].split('monkey ')[1]);
        let falseCondition = parseInt(lines[5].split('monkey ')[1]);

        return { list, operation, test, trueCondition, falseCondition, itemChecks: 0 };
    });

    let highestValue = monkeys.reduce((acc, monkey) => acc *= monkey.test, 1);

    for (let round = 0; round < 10000; round++) {
        for (let i = 0; i < monkeys.length; i++) {
            while (monkeys[i].list.length != 0) {
                let worryLevel = eval(monkeys[i].operation.replace(/old/g, monkeys[i].list.shift())) % highestValue;
                monkeys[monkeys[i][(worryLevel % monkeys[i].test == 0) ? 'trueCondition' : 'falseCondition']].list.push(worryLevel);
                monkeys[i].itemChecks++;
            }
        }
    }

    monkeys.sort((a, b) => b.itemChecks - a.itemChecks);
    return monkeys[0].itemChecks * monkeys[1].itemChecks;
}

export { part1, part2 };