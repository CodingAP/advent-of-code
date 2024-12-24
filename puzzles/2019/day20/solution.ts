/**
 * puzzles/2019/day20/solution.ts
 *
 * ~~ Donut Maze ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/22/2024
 */

const DIRECTIONS = [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }];

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const grid = input.split('\n');
    const OFFSET = 2;
    const width = grid[0].length - OFFSET * 2, height = grid.length - OFFSET * 2;

    // define portals
    const portals: { [key: string]: { x: number, y: number }[] } = {};
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y + OFFSET][x + OFFSET] === '.') {
                DIRECTIONS.forEach(direction => {
                    if (grid[y + OFFSET + direction.y][x + OFFSET + direction.x].match(/[A-Z]/g)) {
                        const positions = [{ x: x + OFFSET + direction.x, y: y + OFFSET + direction.y }, { x: x + OFFSET + direction.x * 2, y: y + OFFSET + direction.y * 2 }];
                        positions.sort((a, b) => {
                            if (a.y === b.y) return a.x - b.x;
                            return a.y - b.y;
                        });

                        const name = positions.map(position => grid[position.y][position.x]).join('')

                        if (portals[name] === undefined) portals[name] = [];
                        portals[name].push({ x, y });
                    }
                });
            }
        }   
    }

    const queue = [{ ...portals.AA[0], steps: 0 }];
    const visited = new Set<string>();

    while (queue.length !== 0) {
        const current = queue.shift();
        if (current === undefined) break;

        if (visited.has(`${current.x},${current.y}`)) continue;
        visited.add(`${current.x},${current.y}`);

        if (current.x === portals.ZZ[0].x && current.y === portals.ZZ[0].y) return current.steps;

        DIRECTIONS.forEach(direction => {
            const position = { x: current.x + direction.x, y: current.y + direction.y };

            // check for portals
            if (grid[position.y + OFFSET][position.x + OFFSET].match(/[A-Z]/g)) {
                Object.values(portals).forEach((portals) => {
                    if (portals.length !== 2) return;

                    const index = portals.findIndex(portal => portal.x === current.x && portal.y === current.y);
                    if (index !== -1) queue.push({ ...portals[index === 0 ? 1 : 0], steps: current.steps + 1 });
                });
            }

            if (grid[position.y + OFFSET][position.x + OFFSET] === '.') queue.push({ ...position, steps: current.steps + 1 });
        });
    }

    return -1;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const grid = input.split('\n');
    const OFFSET = 2;
    const width = grid[0].length - OFFSET * 2, height = grid.length - OFFSET * 2;

    // define portals
    const portals: { [key: string]: { x: number, y: number, outer: boolean }[] } = {};
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y + OFFSET][x + OFFSET] === '.') {
                DIRECTIONS.forEach(direction => {
                    if (grid[y + OFFSET + direction.y][x + OFFSET + direction.x].match(/[A-Z]/g)) {
                        const positions = [{ x: x + OFFSET + direction.x, y: y + OFFSET + direction.y }, { x: x + OFFSET + direction.x * 2, y: y + OFFSET + direction.y * 2 }];
                        positions.sort((a, b) => {
                            if (a.y === b.y) return a.x - b.x;
                            return a.y - b.y;
                        });

                        const name = positions.map(position => grid[position.y][position.x]).join('')

                        if (portals[name] === undefined) portals[name] = [];
                        portals[name].push({ x, y, outer: (x === 0 || y === 0 || x === width - 1 || y === height - 1) });
                    }
                });
            }
        }
    }

    const queue = [{ x: portals.AA[0].x, y: portals.AA[0].y, layer: 0, steps: 0 }];
    const visited = new Set<string>();

    while (queue.length !== 0) {
        const current = queue.shift();
        if (current === undefined) break;

        if (visited.has(`${current.x},${current.y},${current.layer}`)) continue;
        visited.add(`${current.x},${current.y},${current.layer}`);

        if (current.x === portals.ZZ[0].x && current.y === portals.ZZ[0].y && current.layer === 0) return current.steps;

        DIRECTIONS.forEach(direction => {
            const position = { x: current.x + direction.x, y: current.y + direction.y };

            // check for portals
            if (grid[position.y + OFFSET][position.x + OFFSET].match(/[A-Z]/g)) {
                Object.values(portals).forEach((entries) => {
                    if (entries.length !== 2) return;

                    const index = entries.findIndex(portal => portal.x === current.x && portal.y === current.y);
                    if (index !== -1) {
                        if (current.layer === 0 && entries[index].outer) return;
                        if (current.layer > (Object.keys(portals).length * 2 - 2)) return;
                        const other = entries[index === 0 ? 1 : 0];
                        queue.push({ x: other.x, y: other.y, layer: current.layer + (entries[index].outer ? -1 : 1), steps: current.steps + 1 });
                    }
                });
            }

            if (grid[position.y + OFFSET][position.x + OFFSET] === '.') queue.push({ ...position, layer: current.layer, steps: current.steps + 1 });
        });
    }

    return -1;
};

export { part1, part2 };
