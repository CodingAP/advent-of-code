/**
 * puzzles/2017/day05/solution.ts
 *
 * ~~ A Maze of Twisty Trampolines, All Alike ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let instructions = input.trim().split('\n').map(num => parseInt(num));
    let pointer = 0, iterations = 0;

    while (true) {
        const newPointer = pointer + instructions[pointer];
        instructions[pointer]++;
        pointer = newPointer;
        iterations++;

        if (pointer < 0 || pointer >= instructions.length) break;
    }

    return iterations;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let instructions = input.trim().split('\n').map(num => parseInt(num));
    let pointer = 0, iterations = 0;

    while (true) {
        const newPointer = pointer + instructions[pointer];
        
        if (instructions[pointer] >= 3) instructions[pointer]--;
        else instructions[pointer]++;
        
        pointer = newPointer;
        iterations++;

        if (pointer < 0 || pointer >= instructions.length) break;
    }
    
    return iterations;
};

export { part1, part2 };
