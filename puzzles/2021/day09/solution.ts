/**
 * puzzles/2021/day09/solution.ts
 *
 * ~~ Smoke Basin ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * flood fill the grid, which stores a reference to the total area
 */
const fill = (grid: number[][], x: number, y: number, points: Set<string>) => {
    const width = grid[0].length, height = grid.length;

    points.add(`${x},${y}`);
    if (y > 0 && grid[y - 1][x] != 9 && !points.has(`${x},${y - 1}`)) fill(grid, x, y - 1, points);
    if (y < height - 1 && grid[y + 1][x] != 9 && !points.has(`${x},${y + 1}`)) fill(grid, x, y + 1, points);
    if (x > 0 && grid[y][x - 1] != 9 && !points.has(`${x - 1},${y}`)) fill(grid, x - 1, y, points);
    if (x < width - 1 && grid[y][x + 1] != 9 && !points.has(`${x + 1},${y}`)) fill(grid, x + 1, y, points);
    return points;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const grid = input.trim().split('\n').map(line => line.split('').map(num => parseInt(num)));
    const width = grid[0].length, height = grid.length;

    // count all the low point's heights
    let sum = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (y > 0 && grid[y - 1][x] <= grid[y][x]) continue;
            if (y < height - 1 && grid[y + 1][x] <= grid[y][x]) continue;
            if (x > 0 && grid[y][x - 1] <= grid[y][x]) continue;
            if (x < width - 1 && grid[y][x + 1] <= grid[y][x]) continue;
            
            sum += grid[y][x] + 1;
        }
    }
    return sum;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const grid = input.trim().split('\n').map(line => line.split('').map(num => parseInt(num)));
    const width = grid[0].length, height = grid.length;
    const areas: Set<string>[] = [];

    // flood fill the low points to find all the areas
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (y > 0 && grid[y - 1][x] <= grid[y][x]) continue;
            if (y < height - 1 && grid[y + 1][x] <= grid[y][x]) continue;
            if (x > 0 && grid[y][x - 1] <= grid[y][x]) continue;
            if (x < width - 1 && grid[y][x + 1] <= grid[y][x]) continue;
            
            areas.push(fill(grid, x, y, new Set()));
        }
    }

    // return the three biggest areas multiplied together
    areas.sort((a, b) => b.size - a.size);
    return areas[0].size * areas[1].size * areas[2].size;
};

export { part1, part2 };
