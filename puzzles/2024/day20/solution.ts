/**
 * puzzles/2024/day20/solution.ts
 *
 * ~~ Race Condition ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/19/2024
 */

type Point = { x: number, y: number };

// run a bfs with the given set of walls to find the shortest path between every spot
const bfs = (grid: string[][], start: Point) => {
    const width = grid[0].length, height = grid.length;
    const queue: { x: number, y: number, steps: number }[] = [];
    const distances: { [key: string]: number } = {};

    queue.push({ ...start, steps: 0 });
    distances[`${start.x},${start.y}`] = 0;

    while (queue.length !== 0) {
        const current = queue.shift();
        if (current === undefined) break;

        [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }].forEach(direction => {
            const position = { x: current.x + direction.x, y: current.y + direction.y };
            if (position.x < 0 || position.x >= width || position.y < 0 || position.y >= height || grid[position.y][position.x] === '#') return;

            const newDistance = current.steps + 1;
            const key = `${position.x},${position.y}`;
            if (distances[key] === undefined || distances[key] > newDistance) {
                queue.push({ ...position, steps: current.steps + 1 });
                distances[`${position.x},${position.y}`] = newDistance;
            }
        });
    }

    // returns all distances
    return distances;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const grid = input.trim().split('\n').map(line => line.split(''));
    const width = grid[0].length, height = grid.length;

    // find ending point
    let ending: Point = { x: 0, y: 0 };
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === 'E') {
                ending = { x, y };
                grid[y][x] = '.';
            }
        }
    }

    const distances = bfs(grid, ending);

    // check between every walkable spot with distance of 2 to see if there would be a cheat >= 100 
    let cheats = 0;
    const walkable = Object.keys(distances);
    for (let i = 0; i < walkable.length; i++) {
        for (let j = 0; j < walkable.length; j++) {
            if (i === j) continue;

            const start = walkable[i].split(',').map(num => parseInt(num));
            const end = walkable[j].split(',').map(num => parseInt(num));

            const dist = Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);

            if (dist <= 2 && distances[walkable[i]] - distances[walkable[j]] - dist >= 100) cheats++;
        }
    }
    return cheats;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const grid = input.trim().split('\n').map(line => line.split(''));
    const width = grid[0].length, height = grid.length;

    // find ending point
    let ending: Point = { x: 0, y: 0 };
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === 'E') {
                ending = { x, y };
                grid[y][x] = '.';
            }
        }    
    }

    const distances = bfs(grid, ending);

    // check between every walkable spot with distance of 20 to see if there would be a cheat >= 100
    let cheats = 0;
    const walkable = Object.keys(distances);
    for (let i = 0; i < walkable.length; i++) {
        for (let j = 0; j < walkable.length; j++) {
            if (i === j) continue;

            const start = walkable[i].split(',').map(num => parseInt(num));
            const end = walkable[j].split(',').map(num => parseInt(num));

            const dist = Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);

            if (dist <= 20 && distances[walkable[i]] - distances[walkable[j]] - dist >= 100) cheats++;
        }
    }
    return cheats;
};

export { part1, part2 };
