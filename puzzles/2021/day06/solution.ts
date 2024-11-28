// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2021/day06/solution.ts
 *
 * ~~ Lanternfish ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let lanternfish = input.split(',').map(num => parseInt(num));
    
    for (let d = 0; d < 80; d++) {
        let toBeAdded = [];
        for (let i = 0; i < lanternfish.length; i++) {
            lanternfish[i]--;
            if (lanternfish[i] == -1) {
                toBeAdded.push(8);
                lanternfish[i] = 6;
            }
        }
        lanternfish.push(...toBeAdded);
    }
    
    return lanternfish.length;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let lanternfish = input.split(',').map(num => parseInt(num));

    let currentFish = { 6: 0, 7: 0, 8: 0, 9: 0 };

    for (let i = 0; i < lanternfish.length; i++) {
        if (!currentFish[lanternfish[i]]) currentFish[lanternfish[i]] = 0;
        currentFish[lanternfish[i]]++;
    }

    for (let d = 0; d < 256; d++) {
        let fish = Object.keys(currentFish);
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

    return Object.values(currentFish).reduce((a, b) => a + b);
};

export { part1, part2 };
