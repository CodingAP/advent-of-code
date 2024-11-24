/**
 * aoc/puzzles/2023/day22/solution.js
 * 
 * ~~ Sand Slabs ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/21/2023
 */

/**
 * checks for collsion between two 3d boxes
 * 
 * @param {{ start: { x: number, y: number, z: number }, end: { x: number, y: number, z: number } }} a first box
 * @param {{ start: { x: number, y: number, z: number }, end: { x: number, y: number, z: number } }} b second box
 * @returns 
 */
const checkCollision = (a, b) => {
    return a.start.x <= b.end.x &&
        a.end.x >= b.start.x &&
        a.start.y <= b.end.y &&
        a.end.y >= b.start.y &&
        a.start.z <= b.end.z &&
        a.end.z >= b.start.z;
}

const settleBricks = (bricks, check = false) => {
    for (let i = 0; i < bricks.length; i++) {
        let collides = false;
        while (!collides) {
            if (bricks[i].start.z == 1) break;

            let newBrick = structuredClone(bricks[i]);
            newBrick.start.z--;
            newBrick.end.z--;
            for (let j = 0; j < bricks.length; j++) {
                if (i == j) continue;
                if (checkCollision(newBrick, bricks[j])) {
                    collides = true;
                    break;
                }
            }

            if (!collides) {
                bricks[i] = newBrick;
                if (check) return true;
            }
        }
    }

    return false;
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // parse input and sort to lowest first
    let minX = Infinity, maxX = -Infinity, maxZ = -Infinity;
    let bricks = input.split(/\n/g).map(line => {
        let [start, end] = line.split(/~/g).map(coords => {
            let [x, y, z] = coords.split(/,/g).map(num => parseInt(num));
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            maxZ = Math.max(maxZ, z);
            return { x, y, z };
        });

        return {
            start: { x: Math.min(start.x, end.x), y: Math.min(start.y, end.y), z: Math.min(start.z, end.z) },
            end: { x: Math.max(start.x, end.x), y: Math.max(start.y, end.y), z: Math.max(start.z, end.z) }
        };
    }).sort((a, b) => a.start.z - b.start.z);

    // find stable state
    settleBricks(bricks);
    
    // find all bricks that when removed, cause blocks to fall
    let valid = 0;
    for (let i = 0; i < bricks.length; i++) {
        let copy = structuredClone(bricks);
        copy.splice(i, 1);

        if (!settleBricks(copy, true)) valid++;
    }
    return valid;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // parse input and sort to lowest first
    let minX = Infinity, maxX = -Infinity, maxZ = -Infinity;
    let bricks = input.split(/\n/g).map(line => {
        let [start, end] = line.split(/~/g).map(coords => {
            let [x, y, z] = coords.split(/,/g).map(num => parseInt(num));
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            maxZ = Math.max(maxZ, z);
            return { x, y, z };
        });

        return {
            start: { x: Math.min(start.x, end.x), y: Math.min(start.y, end.y), z: Math.min(start.z, end.z) },
            end: { x: Math.max(start.x, end.x), y: Math.max(start.y, end.y), z: Math.max(start.z, end.z) }
        };
    }).sort((a, b) => a.start.z - b.start.z);

    // find stable state
    settleBricks(bricks);

    // find all bricks that when removed, cause blocks to fall and count how many do
    let sum = 0;
    for (let i = 0; i < bricks.length; i++) {
        let copy = structuredClone(bricks);
        copy.splice(i, 1);

        const before = structuredClone(copy);
        settleBricks(copy)

        for (let i = 0; i < before.length; i++) {
            if (JSON.stringify(before[i]) != JSON.stringify(copy[i])) sum++;
        }
    }
    return sum;
}

export { part1, part2 };