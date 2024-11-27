/**
 * puzzles/2017/day06/solution.ts
 *
 * ~~ Memory Reallocation ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

/**
 * simulates a reallocation while mutating the original array
 */
const simulateRun = (array: number[]) => {
    let maxIndex = 0;
    for (let i = 1; i < array.length; i++) {
        if (array[i] > array[maxIndex]) maxIndex = i;
    }

    const amount = array[maxIndex];
    array[maxIndex] = 0;
    for (let i = 0; i < amount; i++) {
        array[(maxIndex + i + 1) % array.length]++;
    }
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const numbers = input.trim().split(/\s+/).map(num => parseInt(num));
    const seen = new Set();
    seen.add(numbers.join(','));

    let iterations = 0;
    while (true) {
        iterations++;
        simulateRun(numbers);

        const key = numbers.join(',');
        if (seen.has(key)) break;

        seen.add(key);
    }

    return iterations;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const numbers = input.trim().split(/\s+/).map(num => parseInt(num));
    const seen: { [key: string]: number } = {}
    seen[numbers.join(',')] = 0;

    let iterations = 0;
    while (true) {
        iterations++;
        simulateRun(numbers);

        const key = numbers.join(',');
        if (seen[key] !== undefined) return iterations - seen[key];

        seen[key] = iterations;
    }
};

export { part1, part2 };
