/**
 * aoc/puzzles/2020/day12/solution.js
 * 
 * ~~ Rain Risk ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/10/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    /**
     * actions that the ship does in part 1
     * 
     * @type {Record<string, (ship: { x: number, y: number, direction: number }, amount: number)>}
     */
    const actions = {
        N: (ship, amount) => {
            ship.y += amount;
        },
        S: (ship, amount) => {
            ship.y -= amount;
        },
        E: (ship, amount) => {
            ship.x += amount;
        },
        W: (ship, amount) => {
            ship.x -= amount;
        },
        L: (ship, amount) => {
            ship.direction = (ship.direction + (4 - (amount / 90))) % 4;
        },
        R: (ship, amount) => {
            ship.direction = (ship.direction + (amount / 90)) % 4;
        },
        F: (ship, amount) => {
            ship.x += [1, 0, -1, 0][ship.direction] * amount;
            ship.y += [0, -1, 0, 1][ship.direction] * amount;
        }
    }

    // le ship :3
    let ship = { x: 0, y: 0, direction: 0 };

    // parse input
    input.split(/\n/).forEach(line => {
        actions[line[0]](ship, parseInt(line.slice(1)));
    });

    // get manhattan distance of ship
    return Math.abs(ship.x) + Math.abs(ship.y);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    /**
     * actions that the ship does in part 2
     * 
     * @type {Record<string, (waypoint: { x: number, y: number, direction: number }, amount: number)>}
     */
    const actions = {
        N: (ship, amount) => {
            ship.waypoint.y += amount;
        },
        S: (ship, amount) => {
            ship.waypoint.y -= amount;
        },
        E: (ship, amount) => {
            ship.waypoint.x += amount;
        },
        W: (ship, amount) => {
            ship.waypoint.x -= amount;
        },
        L: (ship, amount) => {
            for (let i = 0; i < (amount / 90); i++) {
                ship.waypoint = { x: -ship.waypoint.y, y: ship.waypoint.x }
            }
        },
        R: (ship, amount) => {
            for (let i = 0; i < (amount / 90); i++) {
                ship.waypoint = { x: ship.waypoint.y, y: -ship.waypoint.x }
            }
        },
        F: (ship, amount) => {
            ship.x += ship.waypoint.x * amount;
            ship.y += ship.waypoint.y * amount;
        }
    }

    // le ship :3
    let ship = { waypoint: { x: 10, y: 1 }, x: 0, y: 0 };

    // parse input
    input.split(/\n/).forEach(line => {
        actions[line[0]](ship, parseInt(line.slice(1)));
    });

    // get manhattan distance of ship
    return Math.abs(ship.x) + Math.abs(ship.y);
}

export { part1, part2 };