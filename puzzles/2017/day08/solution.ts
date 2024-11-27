/**
 * puzzles/2017/day08/solution.ts
 *
 * ~~ I Heard You Like Registers ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const instructions = input.trim().split('\n');

    const registers: { [key: string]: number } = {};
    for (let i = 0; i < instructions.length; i++) {
        const tokens = instructions[i].split(' ');
        
        if (registers[tokens[0]] === undefined) registers[tokens[0]] = 0;
        if (registers[tokens[4]] === undefined) registers[tokens[4]] = 0;

        if (eval(registers[tokens[4]] + tokens[5] + tokens[6])) {
            registers[tokens[0]] = registers[tokens[0]] + ((tokens[1] === 'inc' ? 1 : -1) * parseInt(tokens[2]));
        }
    }

    return Math.max(...Object.values(registers));
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const instructions = input.trim().split('\n');

    const registers: { [key: string]: number } = {};
    let max = -Infinity;
    for (let i = 0; i < instructions.length; i++) {
        const tokens = instructions[i].split(' ');
        
        if (registers[tokens[0]] === undefined) registers[tokens[0]] = 0;
        if (registers[tokens[4]] === undefined) registers[tokens[4]] = 0;

        if (eval(registers[tokens[4]] + tokens[5] + tokens[6])) {
            registers[tokens[0]] = registers[tokens[0]] + ((tokens[1] === 'inc' ? 1 : -1) * parseInt(tokens[2]));
            max = Math.max(max, registers[tokens[0]]);
        }
    }

    return max;
};

export { part1, part2 };
