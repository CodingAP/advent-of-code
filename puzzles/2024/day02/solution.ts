/**
 * puzzles/2024/day02/solution.ts
 *
 * ~~ Red-Nosed Reports ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/1/2024
 */

/**
 * determine is a list of numbers is safe or not according to the rules:
 * - the levels are either all increasing or all decreasing
 * - any two adjacent levels differ by at least one and at most three
 * 
 * @param list - list of numbers to test
 * @returns if the list is safe or not according to the rules
 */
const testSafety = (list: number[]): boolean => {
    let isSafe = true, increasing = Math.sign(list[0] - list[1]);

    for (let j = 1; j < list.length; j++) {
        const diff = list[j - 1] - list[j];
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3 || Math.sign(diff) !== increasing) isSafe = false;
    }

    return isSafe
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const lists = input.trim().split('\n').map(line => line.split(' ').map(num => parseInt(num)));

    // find how many lists are safe
    return lists.reduce((sum, list) => sum + (testSafety(list) ? 1 : 0), 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const lists = input.trim().split('\n').map(line => line.split(' ').map(num => parseInt(num)));

    // find how many lists with one removed element are safe
    return lists.reduce((sum, list) => {
        let isSafe = false;
        
        for (let j = 0; j < list.length; j++) {
            if (testSafety(list.toSpliced(j, 1))) isSafe = true;
        }

        if (isSafe) sum++;
        return sum;
    }, 0);
};

export { part1, part2 };
