/**
 * puzzles/2018/day21/solution.ts
 *
 * ~~ Chronal Conversion ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/5/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // this is from reverse engineering the program
    // we take the first value that works
    let c = 4843319;
    let f = 65536;
    while (true) {
        let e = f & 0xff;
        c = (((c + e) & 16777215) * 65899) & 16777215

        if (f < 256) return c;
        f = Math.floor(f / 256); 
    }
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // this is from reverse engineering the program
    // we take the last value that works, which requires going through all possivle
    let c = 4843319;
    let f = 65536;
    const previous: number[] = [];
    while (true) {
        let e = f & 0xff;
        c = (((c + e) & 16777215) * 65899) & 16777215;

        if (f < 256) {
            if (previous.includes(c)) return previous.at(-1);
            else previous.push(c);

            f = c | 65536;
            c = 4843319;
        } else {
            f = Math.floor(f / 256); 
        }
    }
};

export { part1, part2 };
