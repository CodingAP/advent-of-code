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
 * this was my initial solution with some optimizations, but it is a bit slow
 */
const oldSolution = (finalValue: number, operands: number[], part2: boolean) => {
    // try every possible combination of * and +
    // we can do this by generating all binary representations between 0 and 2^(len-1)
    for (let i = 0; i < Math.pow(part2 ? 3 : 2, operands.length - 1); i++) {
        const operations = i.toString(part2 ? 3 : 2).padStart(operands.length - 1, '0');
        let value = operands[0];

        // 0 means +, 1 means *, 2 means ||, don't follow order of operations
        for (let j = 1; j <= operations.length; j++) {
            if (operations[j - 1] === '0') value += operands[j];
            else if (operations[j - 1] === '1') value *= operands[j];
            else value = value * Math.pow(10, Math.floor(Math.log10(operands[j])) + 1) + operands[j];

            // break early if value is already greater
            if (value > finalValue) break;
        }

        // if values match, no more checking is needed
        if (value === finalValue) return value;
    }

    return 0;
} 

/**
 * this was my new solution with recursion that is faster
 */
const findSolution = (finalValue: number, operands: number[], part2: boolean): number => {
    // terminating conditions, if we find the correct value or current value is greater than final value
    if (operands.length === 1 && finalValue === operands[0]) return finalValue;
    if (operands[0] > finalValue) return 0;

    // remove first two elements
    const a = operands.shift();
    const b = operands.shift();
    if (a !== undefined && b !== undefined) {
        // try all possible branches
        const addition = operands.toSpliced(0, 0, a + b);
        const multiplication = operands.toSpliced(0, 0, a * b);
        const concatenation = operands.toSpliced(0, 0, a * Math.pow(10, Math.floor(Math.log10(b)) + 1) + b);

        // return value if a solution is eventually found
        if (findSolution(finalValue, addition, part2) !== 0) return finalValue;
        if (findSolution(finalValue, multiplication, part2) !== 0) return finalValue;
        if (part2 && findSolution(finalValue, concatenation, part2) !== 0) return finalValue;
    }

    return 0;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    return input.trim().split('\n').reduce((sum, line) => {
        const [finalValue, ...operands] = line.replace(/:/, '').split(' ').map(num => parseInt(num));
        return sum + findSolution(finalValue, operands, false);
    }, 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    return input.trim().split('\n').reduce((sum, line) => {
        const [finalValue, ...operands] = line.replace(/:/, '').split(' ').map(num => parseInt(num));
        return sum + findSolution(finalValue, operands, true);
    }, 0);
};

export { part1, part2 };
