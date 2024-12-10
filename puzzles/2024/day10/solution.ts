/**
 * puzzles/2024/day10/solution.ts
 *
 * ~~ Hoof It ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/9/2024
 */

/**
 * run bfs on each trailhead to find all paths, unique or not depending on part 
 */
const findTrails = (grid: number[][], starting: { x: number, y: number }, part1: boolean): number => {
    const width = grid[0].length, height = grid.length;
    const queue: { x: number, y: number }[] = [{ ...starting }];
    const visited = new Set<string>(); // only use visited in part 1

    // count all possible paths
    let paths = 0;
    while (queue.length != 0) {
        const current = queue.shift();
        if (current === undefined) break;

        if (grid[current.y][current.x] === 9) {
            paths++;
            continue;
        }

        // try all directions
        [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }].forEach(direction => {
            const position = { x: current.x + direction.x, y: current.y + direction.y };
            if (position.x < 0 || position.x >= width || position.y < 0 || position.y >= height || (visited.has(`${position.x},${position.y}`) && part1) || grid[position.y][position.x] - grid[current.y][current.x] !== 1) return;

            queue.push(position);
            if (part1) visited.add(`${position.x},${position.y}`);
        });
    }
    
    return paths;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const grid = input.split('\n').map(line => line.split('').map(num => parseInt(num)));
    const width = grid[0].length, height = grid.length;

    // add all trailhead scores
    let sum = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === 0) sum += findTrails(grid, { x, y }, true);
        }    
    }
    return sum;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const grid = input.split('\n').map(line => line.split('').map(num => parseInt(num)));
    const width = grid[0].length, height = grid.length;

    // add all trailhead ratings
    let sum = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === 0) sum += findTrails(grid, { x, y }, false);
        }    
    }
    return sum;
};

export { part1, part2 };
