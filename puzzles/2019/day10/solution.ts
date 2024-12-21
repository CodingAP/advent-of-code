/**
 * puzzles/2019/day10/solution.ts
 *
 * ~~ Monitoring Station ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/20/2024
 */

/**
 * find the greatest common factor of two numbers
 */
const gcf = (a: number, b: number): number => b == 0 ? a : gcf(b, a % b);

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const grid = input.trim().split('\n');
    const width = grid[0].length, height = grid.length;

    const asteroids = new Set<string>();
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '#') asteroids.add(`${x},${y}`);
        }
    }

    let max = -Infinity;
    for (const asteroid of asteroids) {
        const [x, y] = asteroid.split(',').map(num => parseInt(num));
        const slopes: { [key: string]: number } = {};

        for (const other of asteroids) {
            const [otherX, otherY] = other.split(',').map(num => parseInt(num));
            if (x === otherX && y === otherY) continue;
            
            const dx = otherX - x;
            const dy = otherY - y;

            if (dx === 0 || dy === 0) slopes[`${Math.sign(dx)},${Math.sign(dy)}`] = (slopes[`${Math.sign(dx)},${Math.sign(dy)}`] || 0) + 1;
            else {
                const slopeX = dx / gcf(Math.abs(dx), Math.abs(dy));
                const slopeY = dy / gcf(Math.abs(dx), Math.abs(dy));

                slopes[`${slopeX},${slopeY}`] = (slopes[`${slopeX},${slopeY}`] || 0) + 1;
            }
        }

        max = Math.max(max, Object.keys(slopes).length);
    }

    return max;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const grid = input.trim().split('\n');
    const width = grid[0].length, height = grid.length;

    const asteroids = new Set<string>();
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '#') asteroids.add(`${x},${y}`);
        }
    }

    let bestPosition = { x: 0, y: 0 }, positions: { [key: string]: { x: number, y: number }[] } = {};
    for (const asteroid of asteroids) {
        const [x, y] = asteroid.split(',').map(num => parseInt(num));
        const slopes: { [key: string]: { x: number, y: number }[] } = {};

        for (const other of asteroids) {
            const [otherX, otherY] = other.split(',').map(num => parseInt(num));
            if (x === otherX && y === otherY) continue;
            
            const dx = otherX - x;
            const dy = otherY - y;

            let key = '';
            if (dx === 0 || dy === 0) key = `${Math.sign(dx)},${Math.sign(dy)}`;
            else key = `${dx / gcf(Math.abs(dx), Math.abs(dy))},${dy / gcf(Math.abs(dx), Math.abs(dy))}`;

            if (slopes[key] === undefined) slopes[key] = [];
            slopes[key].push({ x: otherX, y: otherY });
        }
        
        if (Object.keys(positions).length < Object.keys(slopes).length) {
            bestPosition = { x, y };
            positions = slopes;
        }
    }

    // sort each slope from closest to furthest
    Object.keys(positions).forEach(position => positions[position].sort((a, b) => (Math.abs(a.x - bestPosition.x) + Math.abs(a.y - bestPosition.y)) - (Math.abs(b.x - bestPosition.x) + Math.abs(b.y - bestPosition.y))));

    const order = Object.keys(positions).sort((a, b) => {
        const [ax, ay] = a.split(',').map(num => parseInt(num));
        const [bx, by] = b.split(',').map(num => parseInt(num));

        return Math.atan2(bx, by) - Math.atan2(ax, ay);
    });

    let current = 0;
    for (let i = 0; i < 199; i++) {
        positions[order[current]].shift();
        current = (current + 1) % order.length;
    }

    return positions[order[current]][0].x * 100 + positions[order[current]][0].y;
};

export { part1, part2 };
