/**
 * puzzles/2018/day03/solution.ts
 *
 * ~~ No Matter How You Slice It ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/28/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const grid: { [key: string]: number } = {};

    // parse input and place all claims in grid
    input.trim().split('\n').forEach(line => {
        const [_, coords, area] = line.replace(/\s/g, '').split(/[@:]/);
        const [x, y] = coords.split(',').map(num => parseInt(num));
        const [width, height] = area.split('x').map(num => parseInt(num));

        for (let j = 0; j < height; j++) {
            for (let i = 0; i < width; i++) {
                grid[`${x + i},${y + j}`] = (grid[`${x + i},${y + j}`] || 0) + 1;
            }
        }
    })

    // find all spots with 2 or more claims
    return Object.values(grid).filter(num => num >= 2).length;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const grid: { [key: string]: number } = {};
    
    // parse input and place all claims in grid
    const claims = input.trim().split('\n').map(line => {
        const [_, coords, area] = line.replace(/\s/g, '').split(/[@:]/);
        const [x, y] = coords.split(',').map(num => parseInt(num));
        const [width, height] = area.split('x').map(num => parseInt(num));

        for (let j = 0; j < height; j++) {
            for (let i = 0; i < width; i++) {
                grid[`${x + i},${y + j}`] = (grid[`${x + i},${y + j}`] || 0) + 1;
            }
        }

        return { x, y, width, height };
    });

    // look to see if any spot has only 1 claim in all area
    for (let claim = 0; claim < claims.length; claim++) {
        let containsOther = false;
        for (let j = 0; j < claims[claim].height; j++) {
            for (let i = 0; i < claims[claim].width; i++) {
                if (grid[`${claims[claim].x + i},${claims[claim].y + j}`] > 1) containsOther = true;
            }
        }

        if (!containsOther) return claim + 1;
    }

    // unreachable
    return -1;
};

export { part1, part2 };
