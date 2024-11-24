/**
 * aoc/puzzles/2023/day16/solution.js
 * 
 * ~~ The Floor Will Be Lava ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/15/2023
 */

/**
 * helper constants to give name to numbers and move the beam
 */
const directions = {
    RIGHT: 0,
    DOWN: 1,
    LEFT: 2,
    UP: 3,
    MOVEMENTS: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }]
};

/**
 * all movements done by a beam that depends on what tile it is on
 * 
 * @type {Record<string, (direction: number) => number[]>}
 */
const movements = {
    '.': direction => {
        return [direction];
    },
    '|': direction => {
        if (direction == directions.LEFT || direction == directions.RIGHT) return [directions.UP, directions.DOWN];
        return [direction];
    },
    '-': direction => {
        if (direction == directions.UP || direction == directions.DOWN) return [directions.LEFT, directions.RIGHT];
        return [direction];
    },
    '\\': direction => {
        if (direction == directions.LEFT) return [directions.UP];
        if (direction == directions.RIGHT) return [directions.DOWN];
        if (direction == directions.UP) return [directions.LEFT];
        if (direction == directions.DOWN) return [directions.RIGHT];
    },
    '/': direction => {
        if (direction == directions.LEFT) return [directions.DOWN];
        if (direction == directions.RIGHT) return [directions.UP];
        if (direction == directions.UP) return [directions.RIGHT];
        if (direction == directions.DOWN) return [directions.LEFT];
    }
}

/**
 * counts all energized tiles from the starting beam
 * 
 * @param {{ x: number, y: number, direction: number }} startingBeam position and direction of starting beam
 * @param {string[][]} grid grid to traverse on
 * @returns {number}
 */
const checkEnergized = (startingBeam, grid) => {
    // check what happens immediately
    let tiles = new Set([`${startingBeam.x},${startingBeam.y},${startingBeam.direction}`]);

    let startingDirections = movements[grid[startingBeam.y][startingBeam.x]](startingBeam.direction);
    let beams = startingDirections.map(direction => {
        return { x: startingBeam.x, y: startingBeam.y, direction };
    });

    // follow all beams until they hit the edge or overlap with a previous beam
    while (beams.length != 0) {
        // move beam in current direction
        let current = beams.shift();
        current.x += directions.MOVEMENTS[current.direction].x;
        current.y += directions.MOVEMENTS[current.direction].y;
        const beamName = `${current.x},${current.y},${current.direction}`;

        // if still in bounds and not following previous beam
        if (current.x >= 0 && current.x < grid[0].length && current.y >= 0 && current.y < grid.length && !tiles.has(beamName)) {
            // energize tile and move/split beam if necessary
            tiles.add(beamName);
            let newBeams = movements[grid[current.y][current.x]](current.direction);

            beams.push(...newBeams.map(direction => {
                return { x: current.x, y: current.y, direction };
            }));
        }
    }

    // remove duplicates by position
    return new Set([...tiles].map(tile => tile.split(/,/g).slice(0, -1).join(','))).size;
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // parse input
    const grid = input.split(/\n/g).map(line => line.split(''));

    // check for the top-left corner going right
    return checkEnergized({ x: 0, y: 0, direction: directions.RIGHT }, grid);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // parse input
    const grid = input.split(/\n/g).map(line => line.split(''));

    // check all positions on the left and right edges
    let max = -Infinity;
    for (let y = 0; y < grid.length; y++) {
        max = Math.max(max, checkEnergized({ x: 0, y, direction: directions.RIGHT }, grid));
        max = Math.max(max, checkEnergized({ x: grid[y].length - 1, y, direction: directions.LEFT }, grid));
    }

    // check all positions on the top and bottom edges
    for (let x = 0; x < grid[0].length; x++) {
        max = Math.max(max, checkEnergized({ x, y: 0, direction: directions.DOWN }, grid));
        max = Math.max(max, checkEnergized({ x, y: grid.length - 1, direction: directions.UP }, grid));
    }

    return max;
}

export { part1, part2 };