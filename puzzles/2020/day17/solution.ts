// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day17/solution.ts
 *
 * ~~ Conway Cubes ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

const objectForEach = (object, callback) => {
    Object.entries(object).forEach(([key, value]) => callback(key, value));
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let space = {};
    
    let rows = input.split('\n');
    for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[y].length; x++) {
            space[`${x},${y},0`] = (rows[y].charAt(x) == '#');
        }
    }

    for (let i = 0; i < 6; i++) {
        let newSpace = {};

        objectForEach(space, (key, value) => {
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    for (let z = -1; z <= 1; z++) {
                        if (x == 0 && y == 0 && z == 0) continue;
                        let [currentX, currentY, currentZ] = key.split(',').map(value => parseInt(value));
                        if (space[`${currentX + x},${currentY + y},${currentZ + z}`] == null) space[`${currentX + x},${currentY + y},${currentZ + z}`] = false;
                    }
                }
            }
        });

        objectForEach(space, (key, value) => {
            let neighbors = 0;
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    for (let z = -1; z <= 1; z++) {
                        if (x == 0 && y == 0 && z == 0) continue;  
                        let current = key.split(',').map(num => parseInt(num));
                        if (space[`${current[0] + x},${current[1] + y},${current[2] + z}`]) neighbors++;
                    }
                }
            }

            newSpace[key] = (value) ? (neighbors == 2 || neighbors == 3) : (neighbors == 3);
        });

        space = newSpace;
    }
    
    let active = 0;
    
    objectForEach(space, (key, value) => {
        if (value) active++;
    });

    return active;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let space = {};

    let rows = input.split('\n');
    for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[y].length; x++) {
            space[`${x},${y},0,0`] = (rows[y].charAt(x) == '#');
        }
    }

    for (let i = 0; i < 6; i++) {
        let newSpace = {};

        objectForEach(space, (key, value) => {
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    for (let z = -1; z <= 1; z++) {
                        for (let w = -1; w <= 1; w++) {
                            if (x == 0 && y == 0 && z == 0 && w == 0) continue;
                            let [currentX, currentY, currentZ, currentW] = key.split(',').map(value => parseInt(value));
                            if (space[`${currentX + x},${currentY + y},${currentZ + z},${currentW + w}`] == null) space[`${currentX + x},${currentY + y},${currentZ + z},${currentW + w}`] = false;
                        }
                    }
                }
            }
        });

        objectForEach(space, (key, value) => {
            let neighbors = 0;
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    for (let z = -1; z <= 1; z++) {
                        for (let w = -1; w <= 1; w++) {
                            if (x == 0 && y == 0 && z == 0 && w == 0) continue;
                            let [currentX, currentY, currentZ, currentW] = key.split(',').map(value => parseInt(value));
                            if (space[`${currentX + x},${currentY + y},${currentZ + z},${currentW + w}`]) neighbors++;
                        }
                    }
                }
            }

            newSpace[key] = (value) ? (neighbors == 2 || neighbors == 3) : (neighbors == 3);
        });

        space = newSpace;
    }

    let active = 0;

    objectForEach(space, (key, value) => {
        if (value) active++;
    });

    return active;
};

export { part1, part2 };
