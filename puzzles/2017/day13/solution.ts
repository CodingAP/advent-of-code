// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2017/day13/solution.ts
 *
 * ~~ Packet Scanners ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    return input.split('\n').reduce((acc, element) => {
        let [position, depth] = element.split(': ').map(num => parseInt(num));
        if (position % (2 * (depth - 1)) == 0) acc += position * depth;
        return acc;
    }, 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let depths = input.split('\n').map(line => {
        let [position, depth] = line.split(': ').map(num => parseInt(num));
        return { position, depth };
    });
    
    let delay = 0, caught = true;
    while (caught) {
        caught = false;
        for (let i = 0; i < depths.length; i++) {
            if ((depths[i].position + delay) % (2 * (depths[i].depth - 1)) == 0) {
                caught = true;
                break;
            }
        }

        if (caught) delay++;
    };
    return delay;
};

export { part1, part2 };
