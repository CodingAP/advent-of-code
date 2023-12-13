/**
 * aoc/puzzles/2023/day13/solution.js
 * 
 * ~~ Point of Incidence ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/12/2023
 */

const getReflections = grid => {

    let reflections = { vertical: [], horizontal: [] };
    // check for vertical reflection
    for (let x = 0; x < grid[0].length - 1; x++) {
        let reflection = true;
        let smallestSide = Math.min(x, grid[0].length - (x + 2));
        for (let col = 0; col <= smallestSide; col++) {
            let line1 = '', line2 = '';
            for (let y = 0; y < grid.length; y++) {
                line1 += grid[y][x - col];
                line2 += grid[y][x + col + 1];
            }
            if (line1 != line2) reflection = false;
        }
        if (reflection) reflections.vertical.push(x + 1);
    }

    // check for horizontal reflection
    for (let y = 0; y < grid.length - 1; y++) {
        let reflection = true;
        let smallestSide = Math.min(y, grid.length - (y + 2));
        for (let row = 0; row <= smallestSide; row++) {
            let line1 = '', line2 = '';
            for (let x = 0; x < grid[y].length; x++) {
                line1 += grid[y - row][x];
                line2 += grid[y + row + 1][x];
            }
            if (line1 != line2) reflection = false;
        }
        if (reflection) reflections.horizontal.push(y + 1);
    }

    return reflections;
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    return input.split(/\n\n/g).reduce((sum, grid) => {
        const { vertical, horizontal } = getReflections(grid.split(/\n/g).map(line => line.split('')));
        sum += vertical.reduce((sum, num) => sum + num, 0);
        sum += horizontal.reduce((sum, num) => sum + num * 100, 0);
        return sum;
    }, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    return input.split(/\n\n/g).reduce((sum, grid) => {
        const original = grid.split(/\n/g).map(line => line.split(''));
        let reflections = getReflections(original);
        for (let y = 0; y < original.length; y++) {
            for (let x = 0; x < original[y].length; x++) {
                let newGrid = structuredClone(original);
                newGrid[y][x] = (newGrid[y][x] == '#') ? '.' : '#';
                const newReflections = getReflections(newGrid);
                if (newReflections.vertical.length != 0 || newReflections.horizontal.length != 0) {
                    newReflections.vertical = newReflections.vertical.filter(element => !reflections.vertical.includes(element));
                    newReflections.horizontal = newReflections.horizontal.filter(element => !reflections.horizontal.includes(element));
                    
                    if (newReflections.vertical.length != 0 || newReflections.horizontal.length != 0) {
                        sum += newReflections.vertical.reduce((sum, num) => sum + num, 0);
                        sum += newReflections.horizontal.reduce((sum, num) => sum + num * 100, 0);
                        return sum;
                    }
                }
            }
        }
        return sum;
    }, 0);
}

export { part1, part2 };