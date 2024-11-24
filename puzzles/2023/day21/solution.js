/**
 * aoc/puzzles/2023/day21/solution.js
 * 
 * ~~ Step Counter ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/20/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // parse input
    const grid = input.split(/\n/).map(line => line.split(''));

    // find starting position
    let starting = { x: 0, y: 0 };
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] == 'S') starting = { x, y };
        }
    }

    // do bfs with multiple visited for each step
    // doesn't re-search anything already searched 
    let visited = [];
    let queue = [{ x: starting.x, y: starting.y, steps: 0 }];
    while (queue.length != 0) {
        let current = queue.shift();

        if (current.steps != 64) {
            if (visited[current.steps] == null) visited[current.steps] = new Set();

            // searchs up, down, left, and right
            [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }].forEach(neighbor => {
                const newPosition = { x: current.x + neighbor.x, y: current.y + neighbor.y, steps: current.steps + 1 };
                if (newPosition.x >= 0 && newPosition.x < grid[0].length && newPosition.y >= 0 && newPosition.y < grid.length &&
                    grid[newPosition.y][newPosition.x] != '#' &&
                    !visited[current.steps].has(`${newPosition.x},${newPosition.y}`)) {
                    visited[current.steps].add(`${newPosition.x},${newPosition.y}`);
                    queue.push(newPosition);
                }
            })
        }
    }

    return visited[visited.length - 1].size;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // https://github.com/villuna/aoc23/wiki/A-Geometric-solution-to-advent-of-code-2023,-day-21
    // this helped me so much to understand what we are doing
    // result = (n+1)^2 * odd_squares + n^2 * even_squares - (n+1) * odd_corners + n * even_corners

    // n: how many grid sizes we are going through (202300 for this puzzle)
    // odd_squares: how many spots have an odd parity ((x+y+1) % 2 == 1)
    // even_squares: how many spots have an even parity ((x+y+1) % 2 == 0)
    // odd_corners: how many spots have an odd parity and distance > 65
    // even_corners: how many spots have an even parity and distance > 65

    // parse input
    const grid = input.split(/\n/).map(line => line.split(''));

    // find starting position
    let starting = { x: 0, y: 0 };
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] == 'S') starting = { x, y };
        }
    }

    // do bfs with multiple visited for each step
    let distances = {};
    let queue = [{ x: starting.x, y: starting.y, steps: 0 }];
    while (queue.length != 0) {
        let current = queue.shift();
        if (distances[`${current.x},${current.y}`] != null) continue;
        distances[`${current.x},${current.y}`] = current.steps;

        // searchs up, down, left, and right
        [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }].forEach(neighbor => {
            const newPosition = { x: current.x + neighbor.x, y: current.y + neighbor.y, steps: current.steps + 1 };
            if (newPosition.x >= 0 && newPosition.x < grid[0].length && newPosition.y >= 0 && newPosition.y < grid.length &&
                grid[newPosition.y][newPosition.x] != '#' &&
                distances[`${newPosition.x},${newPosition.y}`] == null) {
                queue.push(newPosition);
            }
        })
    }

    const n = (26501365 - Math.floor(grid.length / 2)) / grid.length;
    const evenSquares = Object.values(distances).filter(distance => distance % 2 == 0).length;
    const oddSquares = Object.values(distances).filter(distance => distance % 2 == 1).length;
    const evenCorners = Object.values(distances).filter(distance => distance % 2 == 0 && distance > Math.floor(grid.length / 2)).length;
    const oddCorners = Object.values(distances).filter(distance => distance % 2 == 1 && distance > Math.floor(grid.length / 2)).length;

    return Math.pow(n + 1, 2) * oddSquares + Math.pow(n, 2) * evenSquares - (n + 1) * oddCorners + n * evenCorners - n;
}

export { part1, part2 };