/**
 * puzzles/2021/day08/solution.ts
 *
 * ~~ Seven Segment Search ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

const stringSort = (str: string) => str.split('').sort().join('');

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // parse lines
    const lines = input.trim().split('\n').map(element => {
        const [pattern, output] = element.split(' | ').map(line => line.split(' '));
        return { pattern, output };
    });
    
    // because these all have unique lengths, we know which ones those can be
    let one = 0, four = 0, seven = 0, eight = 0;

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].output.length; j++) {
            if (lines[i].output[j].length == 2) one++;
            if (lines[i].output[j].length == 4) four++;
            if (lines[i].output[j].length == 3) seven++;
            if (lines[i].output[j].length == 7) eight++;
        }
    }

    // return sum of all the known numbers
    return one + four + seven + eight;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // parse lines
    const lines = input.trim().split('\n').map(element => {
        const [pattern, output] = element.split(' | ').map(line => line.split(' '));
        return { pattern, output };
    });

    // reverse engineer the 7-segment displays to find what each number is
    return lines.reduce((sum, { pattern, output }) => {
        const decoded: { [key: string]: number } = {};

        // parse the unique ones
        const one = pattern.find(str => str.length === 2) as string;
        const four = pattern.find(str => str.length === 4) as string;
        const seven = pattern.find(str => str.length === 3) as string;
        const eight = pattern.find(str => str.length === 7) as string;

        // to figure out the rest, we can use compliments to find where segments are
        const three = pattern.find(str => str.length === 5 && str.split('').filter(char => !seven.includes(char)).length === 2) as string;
        const five = pattern.find(str => str.length === 5 && str !== three && str.split('').filter(char => !four.includes(char)).length === 2) as string;
        const two = pattern.find(str => str.length === 5 && str !== three && str !== five) as string;

        const six = pattern.find(str => str.length === 6 && str.split('').filter(char => !seven.includes(char)).length === 4) as string;
        const nine = pattern.find(str => str.length === 6 && str !== six && str.split('').filter(char => !four.includes(char)).length === 2) as string;
        const zero = pattern.find(str => str.length === 6 && str !== six && str !== nine) as string;

        // create mapping
        [zero, one, two, three, four, five, six, seven, eight, nine].forEach((num, index) => decoded[stringSort(num)] = index);

        return sum + parseInt(output.map(pattern => decoded[stringSort(pattern)]).join(''));
    }, 0);
};

export { part1, part2 };
