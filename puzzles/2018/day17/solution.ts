/**
 * puzzles/2018/day17/solution.ts
 *
 * ~~ Reservoir Research ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/4/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const lines = input.trim().split('\n');
    const clay = new Set<string>();
    let minY = Infinity, maxY = -Infinity;

    lines.forEach(line => {
        const [first, second] = line.split(', ');
        const staticValue = parseInt(first.split('=')[1]);
        const [startValue, endValue] = second.split('=')[1].split('..').map(num => parseInt(num));

        let startX, endX, startY, endY;
        if (first[0] === 'x') {
            startX = staticValue;
            endX = staticValue;
            startY = startValue;
            endY = endValue;
        } else {
            startY = staticValue;
            endY = staticValue;
            startX = startValue;
            endX = endValue;
        }

        minY = Math.min(minY, startY, endY);
        maxY = Math.max(maxY, startY, endY);

        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                clay.add(`${x},${y}`);
            }
        }
    });

    const grid: { [key: string]: string } = { '0,500': '+' };

    console.log(clay);
    return 0;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    return 0;
};

export { part1, part2 };
