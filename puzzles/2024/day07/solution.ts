/**
 * puzzles/2024/day07/solution.ts
 *
 * ~~ Bridge Repair ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/6/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // go through all lines to find the sum of the ones that work
    return input.trim().split('\n').reduce((sum, line) => {
        // parse out final value and list of numbers
        const [finalValue, ...operands] = line.replace(/:/, '').split(' ').map(num => parseInt(num));

        // try every possible combination of * and +
        // we can do this by generating all binary representations between 0 and 2^(len-1)
        for (let i = 0; i < Math.pow(2, operands.length - 1); i++) {
            const operations = i.toString(2).padStart(operands.length - 1, '0');
            let value = operands[0];

            // 0 means +, 1 means *, don't follow order of operations
            for (let j = 1; j <= operations.length; j++) {
                if (operations[j - 1] === '0') value += operands[j];
                else value *= operands[j];
            }

            // if values match, no more checking is needed
            if (value === finalValue) return sum + value;
        }

        return sum;
    }, 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // go through all lines to find the sum of the ones that work
    return input.trim().split('\n').reduce((sum, line) => {
        // parse out final value and list of numbers
        const [finalValue, ...operands] = line.replace(/:/, '').split(' ').map(num => parseInt(num));

        // try every possible combination of *, +, and ||
        // we can do this by generating all ternary representations between 0 and 3^(len-1)
        for (let i = 0; i < Math.pow(3, operands.length - 1); i++) {
            const operations = i.toString(3).padStart(operands.length - 1, '0');
            let value = operands[0];

            // 0 means +, 1 means *, 2 means ||, don't follow order of operations
            for (let j = 1; j <= operations.length; j++) {
                if (operations[j - 1] === '0') value += operands[j];
                else if (operations[j - 1] === '1') value *= operands[j];
                // concatenation without strings cause it slows it down
                else value = value * Math.pow(10, Math.floor(Math.log10(operands[j])) + 1) + operands[j];
            }

            // if values match, no more checking is needed
            if (value === finalValue) return sum + value;
        }

        return sum;
    }, 0);
};

export { part1, part2 };
