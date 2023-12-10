/**
 * aoc/puzzles/2023/day10/solution.js
 * 
 * ~~ Pipe Maze ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/9/2023
 */

/**
 * has constants for directions and
 * maps the direction number to a x, y change
 */
const directions = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
    MOVEMENTS: [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }]
};

/**
 * decides what the next direction is based off current pipe
 * 
 * @type {Record<string, (direction: number) => number>}
 */
const pipeMovement = {
    '|': direction => direction,
    '-': direction => direction,
    'S': direction => direction,
    'L': direction => (direction == directions.LEFT) ? directions.UP : directions.RIGHT,
    'J': direction => (direction == directions.RIGHT) ? directions.UP : directions.LEFT,
    'F': direction => (direction == directions.LEFT) ? directions.DOWN : directions.RIGHT,
    '7': direction => (direction == directions.RIGHT) ? directions.DOWN : directions.LEFT
};

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // parse input
    const grid = input.split(/\n/).map(line => line.split(''));

    // find starting position and direction
    let current = { x: 0, y: 0, direction: 0 };

    for (let y = 0; y < grid.length; y++) { 
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == 'S') {
                current.x = x;
                current.y = y;

                if (grid[y][x - 1].match(/[FL-]/)) current.direction = directions.LEFT;
                if (grid[y][x + 1].match(/[7J-]/)) current.direction = directions.RIGHT;
                if (grid[y - 1][x].match(/[F7|]/)) current.direction = directions.UP;
                if (grid[y + 1][x].match(/[LJ|]/)) current.direction = directions.DOWN;
            }
        }
    }

    // go through the whole loop until it get's back to 'S'
    let loop = new Set();
    do {
        loop.add(`${current.x},${[current.y]}`);
        current.x += directions.MOVEMENTS[current.direction].x;
        current.y += directions.MOVEMENTS[current.direction].y;
        current.direction = pipeMovement[grid[current.y][current.x]](current.direction);
    } while (grid[current.y][current.x] != 'S');

    return loop.size / 2;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // parse input
    const grid = input.split(/\n/).map(line => line.split(''));

    // find starting position and direction
    let current = { x: 0, y: 0, direction: 0 };
    let isStartingNorth = false, isStartingSouth = false;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == 'S') {
                current.x = x;
                current.y = y;

                if (grid[y][x - 1].match(/[FL-]/)) current.direction = directions.LEFT;
                if (grid[y][x + 1].match(/[7J-]/)) current.direction = directions.RIGHT;

                if (grid[y - 1][x].match(/[F7|]/)) {
                    current.direction = directions.UP;
                    isStartingNorth = true;
                }

                if (grid[y + 1][x].match(/[LJ|]/)) {
                    current.direction = directions.DOWN;
                    isStartingSouth = true;
                }
            }
        }
    }

    // go through the whole loop until it get's back to 'S'
    let loop = new Set();
    do {
        loop.add(`${current.x},${[current.y]}`);
        current.x += directions.MOVEMENTS[current.direction].x;
        current.y += directions.MOVEMENTS[current.direction].y;
        current.direction = pipeMovement[grid[current.y][current.x]](current.direction);
    } while (grid[current.y][current.x] != 'S');

    // use the line test to find if a spot is in the loop or not
    // if the spot goes through an odd amount of lines, it is within the boundary
    // we must keep track of which way the line goes, however, because the
    // bends can happen on the same line, so we must check for overlap there 
    let area = 0;
    for (let y = 0; y < grid.length; y++) {
        let northCount = 0, southCount = 0;
        for (let x = 0; x < grid[y].length; x++) {
            if (loop.has(`${x},${y}`)) {
                if (grid[y][x].match(/[LJ|]/)) northCount++;
                if (grid[y][x].match(/[F7|]/)) southCount++;

                // if current spot is 'S', check whether it goes north and/or south depending on stuff around it
                if (grid[y][x] == 'S') {
                    if (isStartingNorth) northCount++;
                    if (isStartingSouth) southCount++;
                }
                continue;
            }

            if (northCount % 2 == 1 || southCount % 2 == 1) area++;
        }
    }

    return area;
}

export { part1, part2 };