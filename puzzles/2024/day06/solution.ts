/**
 * puzzles/2024/day06/solution.ts
 *
 * ~~ Guard Gallivant ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/5/2024
 */

// helper constants to make direction math easier
const UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3;
const DIRECTIONS = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];

/**
 * simulates a guard walking, keeping track of loops and steps
 * 
 * @param grid grid from input
 * @param starting starting position and direction
 * @returns how many spots the guard sees and if it is a loop or not
 */
const walk = (grid: string[][], starting: { x: number, y: number, direction: number }) => {
    const width = grid[0].length, height = grid.length;
    
    // start with given position and initialize set
    let position = { ...starting };
    const visited = new Set<string>();
    visited.add(`${position.x},${position.y},${position.direction}`);

    let loop = false;
    while (true) {
        // find next position
        const next = { x: position.x + DIRECTIONS[position.direction].x, y: position.y + DIRECTIONS[position.direction].y };
        
        // if next position is outside the grid, it was not a loop
        if (next.x < 0 || next.x >= width || next.y < 0 || next.y >= height) break;

        // if hitting an obstacle, rotate right; else move forward
        if (grid[next.y][next.x] === '#') {
            position.direction = (position.direction + 1) % DIRECTIONS.length;
        } else {
            position = { ...next, direction: position.direction };
        }

        // check to see if already visited; if so, break out of loop
        if (visited.has(`${position.x},${position.y},${position.direction}`)) {
            loop = true;
            break;
        }
        visited.add(`${position.x},${position.y},${position.direction}`);
    }

    // filter out duplicate positions
    return { loop, spots: new Set(Array.from(visited).map(spot => spot.split(',').slice(0, 2).join(','))) };
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const grid = input.trim().split('\n').map(line => line.split(''));
    const width = grid[0].length, height = grid.length;

    // find starting position and direction
    let position = { x: -1, y: -1, direction: -1 };
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '^') position = { x, y, direction: UP };
            if (grid[y][x] === '>') position = { x, y, direction: RIGHT };
            if (grid[y][x] === 'V') position = { x, y, direction: DOWN };
            if (grid[y][x] === '<') position = { x, y, direction: LEFT };
            if (grid[y][x].match(/[\^><V]/)) grid[y][x] = '.';
        }
    }

    // return how many spots a guard has walked
    return walk(grid, position).spots.size;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const grid = input.trim().split('\n').map(line => line.split(''));
    const width = grid[0].length, height = grid.length;

    // find starting position and direction
    let position = { x: -1, y: -1, direction: -1 };
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '^') position = { x, y, direction: UP };
            if (grid[y][x] === '>') position = { x, y, direction: RIGHT };
            if (grid[y][x] === 'V') position = { x, y, direction: DOWN };
            if (grid[y][x] === '<') position = { x, y, direction: LEFT };
            if (grid[y][x].match(/[\^><V]/)) grid[y][x] = '.';
        }
    }

    // only place obstacles that will change the original path
    const onPath = Array.from(walk(grid, position).spots);

    // place a new obstacle in every position, see which ones cause a loop
    let loops = 0;
    Array.from(onPath).forEach(spot => {
        const [x, y] = spot.split(',').map(num => parseInt(num));

        // don't place obstacle on starting position
        if (x === position.x && y === position.y) return;

        // place obstacle
        grid[y][x] = '#';

        const result = walk(grid, position);
        if (result.loop) loops++;

        // remove obstacle
        grid[y][x] = '.';
    });

    return loops;
};

export { part1, part2 };
