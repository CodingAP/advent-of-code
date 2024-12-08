/**
 * puzzles/2024/day08/solution.ts
 *
 * ~~ Resonant Collinearity ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/7/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const grid = input.trim().split('\n');
    const width = grid[0].length, height = grid.length;
    const antennas: { [key: string]: { x: number, y: number }[] } = {};

    // find all antennas with the same frequency (a-z, A-Z, 0-9)
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] !== '.') {
                if (antennas[grid[y][x]] === undefined) antennas[grid[y][x]] = [];
                antennas[grid[y][x]].push({ x, y });
            }
        }
    }

    // count all unique antinodes from each pair of antennas
    const antinodes = new Set<string>();
    Object.keys(antennas).forEach(frequency => {
        for (let i = 0; i < antennas[frequency].length; i++) {
            for (let j = 0; j < antennas[frequency].length; j++) {
                if (i === j) continue;

                const dx = antennas[frequency][j].x - antennas[frequency][i].x;
                const dy = antennas[frequency][j].y - antennas[frequency][i].y;

                const antinodeX = antennas[frequency][i].x + dx * 2;
                const antinodeY = antennas[frequency][i].y + dy * 2;
                
                // do bounds checking
                if (antinodeX >= 0 && antinodeX < width && antinodeY >= 0 && antinodeY < height) antinodes.add(`${antinodeX},${antinodeY}`);
            }
        }
    });

    return antinodes.size;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const grid = input.trim().split('\n');
    const width = grid[0].length, height = grid.length;
    const antennas: { [key: string]: { x: number, y: number }[] } = {};

    // find all antennas with the same frequency (a-z, A-Z, 0-9)
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] !== '.') {
                if (antennas[grid[y][x]] === undefined) antennas[grid[y][x]] = [];
                antennas[grid[y][x]].push({ x, y });
            }
        }
    }

    // count all unique antinodes from each pair of antennas
    const antinodes = new Set<string>();
    Object.keys(antennas).forEach(frequency => {
        for (let i = 0; i < antennas[frequency].length; i++) {
            for (let j = 0; j < antennas[frequency].length; j++) {
                if (i === j) continue;

                const dx = antennas[frequency][j].x - antennas[frequency][i].x;
                const dy = antennas[frequency][j].y - antennas[frequency][i].y;

                // try all position in back of pair of antennas
                for (let k = -50; k <= 50; k++) {
                    const antinodeX = antennas[frequency][i].x + dx * k;
                    const antinodeY = antennas[frequency][i].y + dy * k;
                
                    // do bounds checking
                    if (antinodeX >= 0 && antinodeX < width && antinodeY >= 0 && antinodeY < height) antinodes.add(`${antinodeX},${antinodeY}`);
                }
            }
        }
    });
    
    return antinodes.size;
};

export { part1, part2 };
