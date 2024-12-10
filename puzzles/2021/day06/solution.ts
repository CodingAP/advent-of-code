/**
 * puzzles/2021/day06/solution.ts
 *
 * ~~ Lanternfish ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

const countFish = (starting: number[], days: number) => {
    const currentFish: { [key: number]: number } = {};

    // initialize fish counts using starting
    for (let i = 0; i < 10; i++) currentFish[i] = 0;
    for (let i = 0; i < starting.length; i++) currentFish[starting[i]]++;

    // add current fish counts, and create new fishes when needed
    for (let d = 0; d < days; d++) {
        const fish = Object.keys(currentFish);
        for (let i = 0; i < fish.length; i++) {
            if (parseInt(fish[i]) > 0) {
                currentFish[parseInt(fish[i]) - 1] = currentFish[parseInt(fish[i])];
                currentFish[parseInt(fish[i])] = 0;
            } else {
                currentFish[7] += currentFish[parseInt(fish[i])];
                currentFish[9] += currentFish[parseInt(fish[i])];
            }
        }
    }

    // add all the fish
    return Object.values(currentFish).reduce((a, b) => a + b);
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const lanternfish = input.split(',').map(num => parseInt(num));
    return countFish(lanternfish, 80);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const lanternfish = input.split(',').map(num => parseInt(num));
    return countFish(lanternfish, 256);
};

export { part1, part2 };
