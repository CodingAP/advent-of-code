/**
 * puzzles/2025/day02/solution.ts
 *
 * ~~ Gift Shop ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/5/2026
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    return input.split(',').reduce((sum, line) => {
        const [start, end] = line.split('-').map(num => parseInt(num));
        
        for (let i = start; i <= end; i++) {
            const num = i.toString();
            if (num.length % 2 === 1) continue;
            if (num.slice(0, num.length / 2) === num.slice(num.length / 2)) sum += i;
        }

        return sum;
    }, 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    return input.split(',').reduce((sum, line) => {
        const [start, end] = line.split('-').map(num => parseInt(num));
        
        for (let i = start; i <= end; i++) {
            const num = i.toString();
            let invalid = false;
            for (let j = 1; j < num.length; j++) {
                const counts: { [key: string]: number } = {};
                for (let k = 0; k <= num.length - j; k += j) {
                    let part = num.slice(k, k + j);
                    counts[part] = (counts[part] || 0) + 1;
                }

                const biggest = Math.max(...Object.values(counts));
                if (biggest === num.length / j) invalid = true;
            }

            if (invalid) sum += i;
        }

        return sum;
    }, 0);
};

export { part1, part2 };
