/**
 * puzzles/2018/day11/solution.ts
 *
 * ~~ Chronal Charge ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/2/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // create the grid based off the position and input
    const size = 300;
    const grid = Array.from({ length: size }, (_, y) => Array.from({ length: size }, (_, x) => {
        let rackID = (x + 1) + 10;
        let powerLevel = rackID * (y + 1) + parseInt(input);
        return Math.floor((rackID * powerLevel) % 1000 / 100) - 5;
    }));

    // find the largest 3x3 area
    const convolution = 3;
    let max = -Infinity, position = { x: 0, y: 0 };
    for (let y = 0; y < size - convolution; y++) {
        for (let x = 0; x < size - convolution; x++) {
            let totalScore = 0;
            for (let j = 0; j < convolution; j++) {
                for (let i = 0; i < convolution; i++) {
                    totalScore += grid[y + j][x + i];
                }
            }
            
            if (totalScore > max) {
                position = { x: x + 1, y: y + 1 };
                max = totalScore;
            }
        }
    }

    return `${position.x},${position.y}`;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // create the grid based off the position and input
    const size = 300;
    const grid = Array.from({ length: size }, (_, y) => Array.from({ length: size }, (_, x) => {
        let rackID = (x + 1) + 10;
        let powerLevel = rackID * (y + 1) + parseInt(input);
        return Math.floor((rackID * powerLevel) % 1000 / 100) - 5;
    }));

    // find the largest area from 1 to 50 (after 50 you get lesser results than the lower values)
    let max = -Infinity, position = { x: 0, y: 0, size: 0 };
    for (let convolution = 1; convolution <= 50; convolution++) {
        for (let y = 0; y < size - convolution; y++) {
            for (let x = 0; x < size - convolution; x++) {
                let totalScore = 0;
                for (let j = 0; j < convolution; j++) {
                    for (let i = 0; i < convolution; i++) {
                        totalScore += grid[y + j][x + i];
                    }
                }
                
                if (totalScore > max) {
                    position = { x: x + 1, y: y + 1, size: convolution };
                    max = totalScore;
                }
            }
        }
    }

    return `${position.x},${position.y},${position.size}`;
};

export { part1, part2 };
