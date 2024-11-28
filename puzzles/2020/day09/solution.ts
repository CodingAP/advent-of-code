// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day09/solution.ts
 *
 * ~~ Encoding Error ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let numbers = input.split('\n').map(num => parseInt(num));
    let preambleLength = 25;

    for (let i = preambleLength; i < numbers.length; i++) {
        let preamble = numbers.slice(i - preambleLength, i);
        let valid = false;
        for (let j = 0; j < preamble.length; j++) {
            for (let k = 0; k < preamble.length; k++) {
                if (j == k) continue;
                if (preamble[j] + preamble[k] == numbers[i]) valid = true;
            }
        }

        if (!valid) return numbers[i];
    }
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let numbers = input.split('\n').map(num => parseInt(num));
    let preambleLength = 25;
    let invalidNumber = 0;

    for (let i = preambleLength; i < numbers.length; i++) {
        let preamble = numbers.slice(i - preambleLength, i);
        let valid = false;
        for (let j = 0; j < preamble.length; j++) {
            for (let k = 0; k < preamble.length; k++) {
                if (j == k) continue;
                if (preamble[j] + preamble[k] == numbers[i]) valid = true;
            }
        }

        if (!valid) {
            invalidNumber = numbers[i];
            break;
        }
    }

    let length = 1;
    while (true) {
        for (let i = 0; i <= numbers.length - length; i++) {
            let certainNumbers = numbers.slice(i, i + length);
            const sum = certainNumbers.reduce((sum, num) => sum + num, 0);
            if (sum == invalidNumber && certainNumbers.length > 1) {
                let smallest = Infinity, largest = -Infinity;
                certainNumbers.forEach(element => {
                    if (element < smallest) smallest = element;
                    if (element > largest) largest = element;
                });
                return smallest + largest;
            }
        }
        length++;
    }
};

export { part1, part2 };
