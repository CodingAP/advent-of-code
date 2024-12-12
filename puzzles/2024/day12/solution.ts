/**
 * puzzles/2024/day12/solution.ts
 *
 * ~~ Garden Groups ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/11/2024
 */

interface Perimeter {
    x: number;
    y: number;
    valid: boolean
};

const UP = '0', RIGHT = '1', DOWN = '2', LEFT = '3';

/**
 * floods a specific region and finds all units that belong to it
 * captures the area and perimeter cells
 */
const floodFill = (grid: string[], details: { area: number, perimeter: { [key: string]: Perimeter[] } }, x: number, y: number, area: Set<string>) => {
    if (area.has(`${x},${y}`)) return;
    area.add(`${x},${y}`);

    const width = grid[0].length, height = grid.length;
    const plant = grid[y][x];

    details.area++;
    if (y === 0 || grid[y - 1][x] !== plant) details.perimeter[UP].push({ x, y, valid: true });
    if (y === height - 1 || grid[y + 1][x] !== plant) details.perimeter[DOWN].push({ x, y, valid: true });
    if (x === 0 || grid[y][x - 1] !== plant) details.perimeter[RIGHT].push({ x, y, valid: true });
    if (x === width - 1 || grid[y][x + 1] !== plant) details.perimeter[LEFT].push({ x, y, valid: true });

    if (y !== 0 && grid[y - 1][x] === plant) floodFill(grid, details, x, y - 1, area);
    if (y !== height - 1 && grid[y + 1][x] === plant) floodFill(grid, details, x, y + 1, area);
    if (x !== 0 && grid[y][x - 1] === plant) floodFill(grid, details, x - 1, y, area);
    if (x !== width - 1 && grid[y][x + 1] === plant) floodFill(grid, details, x + 1, y, area);
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const grid = input.trim().split('\n');
    const width = grid[0].length, height = grid.length;

    let alreadyFlooded = new Set<string>();
    let sum = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // only count unique regions
            if (!alreadyFlooded.has(`${x},${y}`)) {
                let details: { area: number, perimeter: { [key: string]: Perimeter[] } } = { area: 0, perimeter: { [UP]: [], [DOWN]: [], [LEFT]: [], [RIGHT]: [] } };
                let visited = new Set<string>();
                floodFill(grid, details, x, y, visited);
                alreadyFlooded = alreadyFlooded.union(visited);
                
                // count perimeter as total units
                sum += details.area * Object.values(details.perimeter).reduce((sum, array) => sum + array.length, 0);
            }
        }   
    }

    return sum;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const grid = input.trim().split('\n');
    const width = grid[0].length, height = grid.length;

    /**
     * remove extra perimeter based on axis
     */
    const filterPerimeters = (array: Perimeter[], primary: 'x' | 'y', secondary: 'x' | 'y') => {
        // sort from smallest to largest
        array.sort((a, b) => a[primary] - b[primary]);
                        
        // try to remove any perimeters on the same line
        for (let i = 0; i < array.length; i++) {
            let check = array[i][primary];
            while (true) {
                check++;
                const nextNode = array.find(node => node[primary] === check && node[secondary] === array[i][secondary]);
                
                // end check if not on continuous line
                if (nextNode !== undefined) nextNode.valid = false;
                else break;
            }
        }
    }

    let alreadyFlooded = new Set<string>();
    let sum = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (!alreadyFlooded.has(`${x},${y}`)) {
                let details: { area: number, perimeter: { [key: string]: Perimeter[] } } = { area: 0, perimeter: { [UP]: [], [DOWN]: [], [LEFT]: [], [RIGHT]: [] } };
                let visited = new Set<string>();
                floodFill(grid, details, x, y, visited);
                alreadyFlooded = alreadyFlooded.union(visited);

                // go through and remove extra perimeter not needed
                Object.keys(details.perimeter).forEach(direction => {
                    if (direction === UP || direction === DOWN) filterPerimeters(details.perimeter[direction], 'x', 'y');
                    if (direction === LEFT || direction === RIGHT) filterPerimeters(details.perimeter[direction], 'y', 'x');
                });

                // only count perimeter which are 'valid'
                sum += details.area * Object.values(details.perimeter).reduce((sum, array) => sum + array.filter(perimeter => perimeter.valid).length, 0);
            }
        }   
    }

    return sum;
};

export { part1, part2 };
