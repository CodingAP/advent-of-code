// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2022/day14/solution.ts
 * 
 * ~~ Regolith Reservoir ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    let walls = input.split('\n').reduce((set, line) => {
        let points = line.split(' -> ').map(element => element.split(',').map(num => parseInt(num)));

        for (let i = 1; i < points.length; i++) {
            let minX = Math.min(points[i - 1][0], points[i][0]);
            let maxX = Math.max(points[i - 1][0], points[i][0]);
            let minY = Math.min(points[i - 1][1], points[i][1]);
            let maxY = Math.max(points[i - 1][1], points[i][1]);
            for (let y = minY; y <= maxY; y++) {
                for (let x = minX; x <= maxX; x++) {
                    set.add(`${x},${y}`);
                }
            }
        }
        return set;
    }, new Set());

    let currentSand = { x: 500, y: 0 };
    let bitsOfSand = 0;
    let finished = false;
    let lowest = [...walls].reduce((highest, point) => Math.max(parseInt(point.split(',')[1]), highest), -Infinity);
    while (!finished) {
        while (!finished) {
            if (walls.has(`${currentSand.x},${currentSand.y + 1}`)) {
                if (!walls.has(`${currentSand.x - 1},${currentSand.y + 1}`)) {
                    currentSand.x--;
                    currentSand.y++;
                } else if (!walls.has(`${currentSand.x + 1},${currentSand.y + 1}`)) {
                    currentSand.x++;
                    currentSand.y++;
                } else {
                    walls.add(`${currentSand.x},${currentSand.y}`);
                    break;
                }
            } else {
                currentSand.y++;
            }

            if (currentSand.y > lowest) finished = true;
        }
        currentSand = { x: 500, y: 0 };
        bitsOfSand++;
    }
    return bitsOfSand - 1;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let walls = input.split('\n').reduce((set, line) => {
        let points = line.split(' -> ').map(element => element.split(',').map(num => parseInt(num)));

        for (let i = 1; i < points.length; i++) {
            let minX = Math.min(points[i - 1][0], points[i][0]);
            let maxX = Math.max(points[i - 1][0], points[i][0]);
            let minY = Math.min(points[i - 1][1], points[i][1]);
            let maxY = Math.max(points[i - 1][1], points[i][1]);
            for (let y = minY; y <= maxY; y++) {
                for (let x = minX; x <= maxX; x++) {
                    set.add(`${x},${y}`);
                }
            }
        }
        return set;
    }, new Set());

    let currentSand = { x: 500, y: 0 };
    let bitsOfSand = 0;
    let lowest = [...walls].reduce((highest, point) => Math.max(parseInt(point.split(',')[1]), highest), -Infinity);
    while (!walls.has('500,0')) {
        while (true) {
            if (walls.has(`${currentSand.x},${currentSand.y + 1}`)) {
                if (!walls.has(`${currentSand.x - 1},${currentSand.y + 1}`)) {
                    currentSand.x--;
                    currentSand.y++;
                } else if (!walls.has(`${currentSand.x + 1},${currentSand.y + 1}`)) {
                    currentSand.x++;
                    currentSand.y++;
                } else {
                    walls.add(`${currentSand.x},${currentSand.y}`);
                    break;
                }
            } else {
                currentSand.y++;
            }

            if (currentSand.y == lowest + 1) {
                walls.add(`${currentSand.x},${currentSand.y}`);
                break;
            }
        }
        currentSand = { x: 500, y: 0 };
        bitsOfSand++;
    }
    return bitsOfSand;
}

export { part1, part2 };