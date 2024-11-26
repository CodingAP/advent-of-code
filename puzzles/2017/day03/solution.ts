/**
 * puzzles/2017/day03/solution.ts
 *
 * ~~ Spiral Memory ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

const DIRECTIONS = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const position = { x: 0, y: 0 };
    let direction = 0;
    const run = { current: 1, length: 1, times: 0 };
    for (let i = 0; i < parseInt(input) - 1; i++) {
        // move piece according to run
        position.x += DIRECTIONS[direction].x;
        position.y += DIRECTIONS[direction].y;

        // update next moves in a spiraling square
        run.current--;
        if (run.current === 0) {
            direction = (direction + 1) % DIRECTIONS.length;
            
            run.times++;
            if (run.times === 2) {
                run.times = 0;
                run.length++;
            }
            run.current = run.length;
        }
    }

    // return manhattan distance
    return Math.abs(position.x) + Math.abs(position.y);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const position = { x: 0, y: 0 };
    let direction = 0;
    const run = { current: 1, length: 1, times: 0 };
    const neighbors = { '0,0': 1 };
    for (let i = 0; i < parseInt(input) - 1; i++) {
        // move piece according to run
        position.x += DIRECTIONS[direction].x;
        position.y += DIRECTIONS[direction].y;

        // update next moves in a spiraling square
        run.current--;
        if (run.current === 0) {
            direction = (direction + 1) % DIRECTIONS.length;
            
            run.times++;
            if (run.times === 2) {
                run.times = 0;
                run.length++;
            }
            run.current = run.length;
        }

        // count neighbors
        let neighborCount = 0;
        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                if (x === 0 && y === 0) continue;

                if (neighbors[`${position.x + x},${position.y + y}`] !== undefined) neighborCount += neighbors[`${position.x + x},${position.y + y}`];
            }    
        }

        // if larger than input, return it
        if (neighborCount > parseInt(input)) return neighborCount;
        neighbors[`${position.x},${position.y}`] = neighborCount;
    }

    // unreachable
    return -1;
};

export { part1, part2 };
