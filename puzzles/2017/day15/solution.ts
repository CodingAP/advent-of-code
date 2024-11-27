/**
 * puzzles/2017/day15/solution.ts
 *
 * ~~ Dueling Generators ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const lines = input.trim().split('\n');
    let generatorA = parseInt(lines[0].split(' ')[4]);
    let generatorB = parseInt(lines[1].split(' ')[4]);

    let count = 0;
    for (let i = 0; i < 40000000; i++) {
        generatorA = (generatorA * 16807) % 2147483647;
        generatorB = (generatorB * 48271) % 2147483647;

        if ((generatorA & 0xffff) === (generatorB & 0xffff)) count++;
    }

    return count;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const lines = input.trim().split('\n');
    let generatorA = parseInt(lines[0].split(' ')[4]);
    let generatorB = parseInt(lines[1].split(' ')[4]);

    let count = 0;
    for (let i = 0; i < 5000000; i++) {
        while (generatorA % 4 !== 0) generatorA = (generatorA * 16807) % 2147483647;
        while (generatorB % 8 !== 0) generatorB = (generatorB * 48271) % 2147483647;

        if ((generatorA & 0xffff) === (generatorB & 0xffff)) count++;
        
        generatorA = (generatorA * 16807) % 2147483647;
        generatorB = (generatorB * 48271) % 2147483647;
    }

    return count;
};

export { part1, part2 };
