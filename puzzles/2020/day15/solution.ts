// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day15/solution.ts
 *
 * ~~ Rambunctious Recitation ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let numbers = input.split(',').map(num => parseInt(num));
    
    let past = [];
    for (let i = 0; i < 2020; i++) {
        if (numbers[i] != null) past[i] = numbers[i];
        else {
            let last = past[i - 1];
            let others = [...past.slice(0, i - 1), ...past.slice(i)];
            let index = others.lastIndexOf(last);

            if (index == -1) {
                past.push(0);
            } else {
                past.push((i - 1) - index);
            }
        }
    }
    return past[past.length - 1];
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let numbers = input.split(',').map(num => parseInt(num));

    let hashMap = new Array(30000000);
    let last = numbers[numbers.length - 1];
    for (let i = 0; i < hashMap.length; i++) {
        if (numbers[i] != null) hashMap[numbers[i]] = i;
        else {
            let index = hashMap[last];

            if (i != 3) hashMap[last] = i - 1;

            if (index == null || i - index == 1) {
                last = 0;
            } else {
                last = i - index - 1;
            }
        }
    }
    return last;
};

export { part1, part2 };
