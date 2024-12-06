/**
 * puzzles/2018/day18/solution.ts
 *
 * ~~ Settlers of The North Pole ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/5/2024
 */

const hashGrid = (grid: string[][]): number => grid.map(line => line.join('')).join('').split('').reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0);

const simulateGrowth = (grid: string[][]) => {
    const width = grid[0].length, height = grid.length;
    const newGrid = structuredClone(grid);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // count tree and lumberyard neighbors
            let trees = 0, lumberyards = 0;
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    if (i === 0 && j === 0) continue;
                    if (x + i < 0 || x + i >= width || y + j < 0 || y + j >= height) continue;

                    if (grid[y + j][x + i] === '|') trees++;
                    if (grid[y + j][x + i] === '#') lumberyards++;
                }
            }

            // only change state if needed
            if (grid[y][x] === '.' && trees >= 3) newGrid[y][x] = '|';
            if (grid[y][x] === '|' && lumberyards >= 3) newGrid[y][x] = '#';
            if (grid[y][x] === '#' && (trees === 0 || lumberyards === 0)) newGrid[y][x] = '.';
        }
    }

    return newGrid;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let grid = input.trim().split('\n').map(line => line.split(''));
    const width = grid[0].length, height = grid.length;

    // run the automata for 10 cycles
    for (let minute = 0; minute < 10; minute++) grid = simulateGrowth(grid);

    // count total tree and lumberyard acres
    let trees = 0, lumberyards = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '|') trees++;
            if (grid[y][x] === '#') lumberyards++; 
        }
    }

    return trees * lumberyards;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let grid = input.trim().split('\n').map(line => line.split(''));
    const width = grid[0].length, height = grid.length;

    // keep running automata until a cycle is found
    let previous: number[] = [hashGrid(grid)];
    let cycleStart = -1, cycleLength = -1;
    while (true) {
        grid = simulateGrowth(grid);

        const newHash = hashGrid(grid);
        if (previous.includes(newHash)) {
            cycleStart = previous.indexOf(newHash);
            cycleLength = previous.length - cycleStart;
            break;
        }

        previous.push(newHash);
    }

    // after finding the cycle, simulate 1000000000 turns by only enough to get the cycle equilvalent
    for (let i = 0; i < ((1000000000 - cycleStart - cycleLength) % cycleLength); i++) grid = simulateGrowth(grid);

    // count total tree and lumberyard acres
    let trees = 0, lumberyards = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '|') trees++;
            if (grid[y][x] === '#') lumberyards++; 
        }
    }

    return trees * lumberyards;
};

export { part1, part2 };
