/**
 * puzzles/2019/day15/solution.ts
 *
 * ~~ Oxygen System ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/21/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let signal = input.trim().split('').map(num => parseInt(num));;
    const KEY = [0, 1, 0, -1];

    for (let fft = 0; fft < 100; fft++) {
        const newSignal = [];
        for (let i = 1; i <= signal.length; i++) {
            let number = 0;
            for (let j = 0; j < signal.length; j++) {
                number += signal[j] * KEY[Math.floor((j + 1) / i) % KEY.length];
            }
            newSignal.push(Math.abs(number) % 10);
        }
        signal = newSignal;
    }

    return signal.slice(0, 8).join('');
}

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let signal = input.trim().repeat(10000).split('').map(num => parseInt(num));

    const offset = parseInt(input.slice(0, 7));
    signal = signal.slice(offset);
    for (let i = 0; i < 100; i++) {
        for (let i = signal.length - 2; i >= 0; i--) {
            signal[i] = (signal[i + 1] + signal[i]) % 10;
        }
    }

    return signal.slice(0, 8).join('');
}

export { part1, part2 };