/**
 * puzzles/2019/day24/solution.ts
 *
 * ~~ Planet of Discord ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/24/2024
 */

const WIDTH = 5, HEIGHT = 5;

const DIRECTIONS = [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }];
const INSIDE_MAPPINGS = [
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }],
    [{ x: 0, y: HEIGHT - 1 }, { x: 1, y: HEIGHT - 1 }, { x: 2, y: HEIGHT - 1 }, { x: 3, y: HEIGHT - 1 }, { x: 4, y: HEIGHT - 1 }],
    [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }],
    [{ x: WIDTH - 1, y: 0 }, { x: WIDTH - 1, y: 1 }, { x: WIDTH - 1, y: 2 }, { x: WIDTH - 1, y: 3 }, { x: WIDTH - 1, y: 4 }],
];

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let grid = input.trim().split('\n').map(line => line.split(''));
    const seen = new Set<string>();

    while (true) {
        const hash = grid.map(line => line.join('')).join('');
        if (seen.has(hash)) {
            let biodiversity = 0;
            for (let i = 0; i < hash.length; i++) {
                if (hash[i] === '#') biodiversity += 2 ** i;
            }
            return biodiversity;
        }

        seen.add(hash);

        const newGrid = structuredClone(grid);
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                const neighbors = DIRECTIONS.reduce((sum, direction) => {
                    const position = { x: x + direction.x, y: y + direction.y };
                    if (position.x < 0 || position.x >= WIDTH || position.y < 0 || position.y >= HEIGHT) return sum;
                    if (grid[position.y][position.x] === '#') sum++;
                    return sum;
                }, 0);

                if (grid[y][x] === '#' && neighbors !== 1) newGrid[y][x] = '.';
                else if (grid[y][x] !== '#' && (neighbors === 1 || neighbors === 2)) newGrid[y][x] = '#';
            }
        }
        grid = newGrid;
    }
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const layer0 = input.trim().split('\n').map(line => line.split(''));
    const middle = { x: Math.floor(WIDTH / 2), y: Math.floor(HEIGHT / 2) };

    const EMPTY_LAYER = new Array(HEIGHT).fill('').map(_ => new Array(WIDTH).fill('.'));

    let layers = [layer0];

    for (let step = 0; step < 200; step++) {
        // create new layers on each side
        layers.unshift(structuredClone(EMPTY_LAYER));
        layers.push(structuredClone(EMPTY_LAYER));

        const newLayers: string[][][] = [];

        for (let i = 0; i < layers.length; i++) {
            const newGrid = structuredClone(layers[i]);
            for (let y = 0; y < HEIGHT; y++) {
                for (let x = 0; x < WIDTH; x++) {
                    // don't process middle tile
                    if (x === middle.x && y === middle.y) continue;

                    const neighbors = DIRECTIONS.reduce((sum, direction, k) => {
                        const position = { x: x + direction.x, y: y + direction.y };

                        if (i - 1 >= 0) {
                            if (position.x < 0 && layers[i - 1][middle.y][middle.x - 1] === '#') sum++; // search layer up on left
                            if (position.x >= WIDTH && layers[i - 1][middle.y][middle.x + 1] === '#') sum++; // search layer up on right
                            if (position.y < 0 && layers[i - 1][middle.y - 1][middle.x] === '#') sum++; // search layer up on top
                            if (position.y >= HEIGHT && layers[i - 1][middle.y + 1][middle.x] === '#') sum++; // search layer up on bottom
                        }

                        if (position.x === middle.x && position.y === middle.y && i + 1 < layers.length) {
                            for (let j = 0; j < INSIDE_MAPPINGS[k].length; j++) {
                                if (layers[i + 1][INSIDE_MAPPINGS[k][j].y][INSIDE_MAPPINGS[k][j].x] === '#') sum++; // search layer down on each edge
                            }
                        } else if (position.x >= 0 && position.x < WIDTH && position.y >= 0 && position.y < HEIGHT) {
                            if (layers[i][position.y][position.x] === '#') sum++; // search inside layer
                        }

                        return sum;
                    }, 0);

                    if (layers[i][y][x] === '#' && neighbors !== 1) newGrid[y][x] = '.';
                    else if (layers[i][y][x] !== '#' && (neighbors === 1 || neighbors === 2)) newGrid[y][x] = '#';
                }
            }
            newLayers.push(newGrid);
        }

        layers = newLayers;
    }

    let count = 0;
    for (let i = 0; i < layers.length; i++) {
        count += layers[i].map(line => line.filter(char => char === '#').join('')).join('').length;
    }

    return count;
};

export { part1, part2 };
