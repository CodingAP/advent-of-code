/**
 * puzzles/2021/day20/solution.ts
 *
 * ~~ Trench Map ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

const enhanceImage = (grid: { [key: string]: number }, algorithm: string, steps: number) => {
    for (let step = 0; step < steps; step++) {
        const newGrid: { [key: string]: number } = {};

        Object.keys(grid).forEach(coord => {
            const [x, y] = coord.split(',').map(num => parseInt(num));
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    let neighborCoords = `${x + i},${y + j}`;
                    if (grid[neighborCoords] === undefined) grid[neighborCoords] = step % 2;
                }
            }
        });

        Object.keys(grid).forEach(coord => {
            const [x, y] = coord.split(',').map(num => parseInt(num));

            let binary = '';
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    let neighborCoords = `${x + i},${y + j}`;
                    if (grid[neighborCoords] === undefined) binary += step % 2;
                    else binary += grid[neighborCoords];
                }
            }

            newGrid[coord] = (algorithm[parseInt(binary, 2)] === '#') ? 1 : 0;
        });

        grid = newGrid;
    }

    return grid;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const [algorithm, image] = input.split('\n\n');

    let grid: { [key: string]: number } = {};
    image.trim().split('\n').forEach((line, y) => {
        for (let x = 0; x < line.length; x++) {
            grid[`${x},${y}`] = (line[x] === '#') ? 1 : 0;
        }
    });

    return Object.values(enhanceImage(grid, algorithm, 2)).reduce((sum, state) => sum + state, 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const [algorithm, image] = input.split('\n\n');

    let grid: { [key: string]: number } = {};
    image.trim().split('\n').forEach((line, y) => {
        for (let x = 0; x < line.length; x++) {
            grid[`${x},${y}`] = (line[x] === '#') ? 1 : 0;
        }
    });

    return Object.values(enhanceImage(grid, algorithm, 50)).reduce((sum, state) => sum + state, 0);
};

export { part1, part2 };
