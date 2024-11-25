// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2023/day18/solution.ts
 * 
 * ~~ Lavaduct Lagoon ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/17/2023
 */

const directions = {
    mapping: ['R', 'D', 'L', 'U'],
    movements: [{ x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 1 }]
};

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    // we are going to be using the shoelace formula and pick's theorem to calculate integer area
    // sum(xi*y(i+1)-yi*x(i+1)) + perimeter / 2 - 1
    // but we have to account for overlapping starting points, so -2 the whole thing to remove those
    let current = { x: 0, y: 0 };
    let points = [];
    let perimeter = 0;

    // parse input
    input.split(/\n/).forEach(line => {
        let [direction, amount, _] = line.split(/ /g);
        amount = parseInt(amount);

        perimeter += amount;
        current.x += directions.movements[directions.mapping.indexOf(direction)].x * amount;
        current.y += directions.movements[directions.mapping.indexOf(direction)].y * amount;

        points.push(structuredClone(current));
    });

    // do shoelace formula
    let area = 0;
    for (let i = 0; i < points.length; i++) {
        area += (points[i].x * points[(i + 1) % points.length].y) - (points[i].y * points[(i + 1) % points.length].x);
    }

    return Math.abs(area) / 2 + (perimeter / 2) + 1;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let current = { x: 0, y: 0 };
    let points = [];
    let perimeter = 0;

    // parse input (disregard first two and parse hex number)
    input.split(/\n/).forEach(line => {
        let [_, __, color] = line.split(/ /g);
        color = color.replace(/[\(\)#]/g, '');
        const amount = parseInt(color.slice(0, -1), 16);

        perimeter += amount;
        current.x += directions.movements[parseInt(color[color.length - 1])].x * amount;
        current.y += directions.movements[parseInt(color[color.length - 1])].y * amount;

        points.push(structuredClone(current));
    });

    // do shoelace formula
    let area = 0;
    for (let i = 0; i < points.length; i++) {
        area += (points[i].x * points[(i + 1) % points.length].y) - (points[i].y * points[(i + 1) % points.length].x);
    }

    return Math.abs(area) / 2 + (perimeter / 2) + 1;
}

export { part1, part2 };