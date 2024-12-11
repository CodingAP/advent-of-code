/**
 * puzzles/2024/day11/solution.ts
 *
 * ~~ Plutonian Pebbles ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/10/2024
 */

/**
 * change the stones according to the initial stones
 * uses counts to stop exponential growth from destroying my computer
 */
const changeStones = (stones: { [key: string]: number }, steps: number) => {
    for (let step = 0; step < steps; step++) {
        const newStones: { [key: string]: number } = {};
        Object.entries(stones).forEach(([stone, count]) => {
            if (parseInt(stone) === 0) newStones[1] = (newStones[1] || 0) + count;
            else if (stone.length % 2 === 0) {
                // must parse int to remove leading zeros
                const left = parseInt(stone.slice(0, stone.length / 2));
                const right = parseInt(stone.slice(stone.length / 2));
                newStones[left] = (newStones[left] || 0) + count;
                newStones[right] = (newStones[right] || 0) + count;
            } else newStones[parseInt(stone) * 2024] = (newStones[parseInt(stone) * 2024] || 0) + count;
        });
        stones = newStones;
    }

    return stones;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const stones = input.split(' ').map(num => parseInt(num));
    let stoneCounts: { [key: string]: number } = {};
    stones.forEach(stone => stoneCounts[stone] = (stoneCounts[stone] || 0) + 1);

    return Object.values(changeStones(stoneCounts, 25)).reduce((sum, num) => sum + num, 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const stones = input.split(' ').map(num => parseInt(num));
    let stoneCounts: { [key: string]: number } = {};
    stones.forEach(stone => stoneCounts[stone] = (stoneCounts[stone] || 0) + 1);
    
    return Object.values(changeStones(stoneCounts, 75)).reduce((sum, num) => sum + num, 0);
};

export { part1, part2 };
