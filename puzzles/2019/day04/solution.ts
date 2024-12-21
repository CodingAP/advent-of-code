/**
 * puzzles/2019/day04/solution.ts
 *
 * ~~ Secure Container ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/20/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const [min, max] = input.split('-').map(num => parseInt(num));

    let valid = 0;

    for (let password = min; password <= max; password++) {
        const passwordString = password.toString();
        const numberCount = passwordString.split('').reduce((count, digit) => {
            count[parseInt(digit)]++;
            return count;
        }, new Array(10).fill(0));

        let decreases = false;
        for (let i = 1; i < passwordString.length; i++) {
            if (parseInt(passwordString[i]) < parseInt(passwordString[i - 1])) decreases = true;
        }

        if (!decreases && numberCount.filter(element => element >= 2).length > 0) valid++;
    }

    return valid;
}

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const [min, max] = input.split('-').map(num => parseInt(num));

    let valid = 0;
    for (let password = min; password <= max; password++) {
        const passwordString = password.toString();
        const numberCount = passwordString.split('').reduce((count, digit) => {
            count[parseInt(digit)]++;
            return count;
        }, new Array(10).fill(0));

        let decreases = false;
        for (let i = 1; i < passwordString.length; i++) {
            if (parseInt(passwordString[i]) < parseInt(passwordString[i - 1])) decreases = true;
        }

        if (!decreases && numberCount.filter(element => element === 2).length > 0) valid++;
    }
    return valid;
}

export { part1, part2 };