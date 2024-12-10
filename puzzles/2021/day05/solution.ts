/**
 * puzzles/2021/day05/solution.ts
 *
 * ~~ Hydrothermal Venture ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // parse the lines
    const lines: { start: { x: number, y: number }, magnitude: number, direction: { x: number, y: number } }[] = [];
    input.trim().split('\n').forEach(element => {
        const [start, end] = element.split(' -> ').map(point => point.split(',').map(num => parseInt(num)));

        let dx = end[0] - start[0];
        let dy = end[1] - start[1];
        const magnitude = Math.max(Math.abs(dx), Math.abs(dy));
        dx /= magnitude;
        dy /= magnitude;

        lines.push({ start: { x: start[0], y: start[1] }, magnitude, direction: { x: dx, y: dy } });
    });

    // find all vertical and horizontal lines and get all the spots
    const grid: { [key: string]: number } = {};
    lines.forEach(line => {
        if (Math.abs(line.direction.x + line.direction.y) === 1) {
            for (let i = 0; i <= line.magnitude; i++) {
                const key = `${line.start.x + line.direction.x * i},${line.start.y + line.direction.y * i}`;
                grid[key] = (grid[key] || 0) + 1; 
            }
        }
    });

    // only return spots that have 2 more lines
    return Object.values(grid).filter(element => element >= 2).length;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // parse the lines
    const lines: { start: { x: number, y: number }, magnitude: number, direction: { x: number, y: number } }[] = [];
    input.trim().split('\n').forEach(element => {
        const [start, end] = element.split(' -> ').map(point => point.split(',').map(num => parseInt(num)));

        let dx = end[0] - start[0];
        let dy = end[1] - start[1];
        const magnitude = Math.max(Math.abs(dx), Math.abs(dy));
        dx /= magnitude;
        dy /= magnitude;

        lines.push({ start: { x: start[0], y: start[1] }, magnitude, direction: { x: dx, y: dy } });
    });

    // find all lines and get all the spots
    const grid: { [key: string]: number } = {};
    lines.forEach(line => {
        for (let i = 0; i <= line.magnitude; i++) {
            const key = `${line.start.x + line.direction.x * i},${line.start.y + line.direction.y * i}`;
            grid[key] = (grid[key] || 0) + 1; 
        }
    });

    // only return spots that have 2 more lines
    return Object.values(grid).filter(element => element >= 2).length;
};

export { part1, part2 };
