/**
 * puzzles/2024/day01/solution.ts
 *
 * ~~ Historian Hysteria ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/30/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let leftList: number[] = [];
    let rightList: number[] = [];

    // get list of left and right numbers
    input.trim().split('\n').forEach(line => {
        const [left, right] = line.split(/\s+/).map(num => parseInt(num));
        leftList.push(left);
        rightList.push(right);
    });

    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);

    let sum = 0;
    for (let i = 0; i < leftList.length; i++) {
        sum += Math.abs(leftList[i] - rightList[i]);
    }
    return sum;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const leftList: number[] = [];
    const rightOccurences: { [key: number]: number } = {};
    input.trim().split('\n').forEach(line => {
        const [left, right] = line.split(/\s+/).map(num => parseInt(num));
        leftList.push(left);
        rightOccurences[right] = (rightOccurences[right] || 0) + 1; 
    });

    let sum = 0;
    for (let i = 0; i < leftList.length; i++) {
        sum += leftList[i] * (rightOccurences[leftList[i]] || 0);
    }
    return sum;
};

export { part1, part2 };
