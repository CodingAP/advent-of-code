/**
 * puzzles/2024/day04/solution.ts
 *
 * ~~ Ceres Search ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/3/2024
 */

/**
 * gets the character from the grid
 * 
 * returns an empty string if out of bounds
 * 
 * @param grid grid to grab from
 * @param x x position to search from
 * @param y y position to search from
 * @returns character at position, empty string if out of bounds  
 */
const getCharacter = (grid: string[], x: number, y: number) => {
    if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) return '';
    return grid[y][x];
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const grid = input.trim().split('\n');
    let words = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            // we need the first character to matched before we continue
            if (grid[y][x] !== 'X') continue;
            
            // check all directions from a single midpoint
            // this prevents overcounting as reverse strings are just the negated versions from the middle
            words += [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 }].reduce((sum, direction) => {
                let search = grid[y][x];
                let currentX = x, currentY = y;

                for (let i = 0; i < 'XMAS'.length - 1; i++) {
                    currentX += direction.x;
                    currentY += direction.y;
    
                    search += getCharacter(grid, currentX, currentY);
                }
        
                return sum + (search === 'XMAS' ? 1 : 0);
            }, 0);
        }   
    }

    return words;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const grid = input.trim().split('\n');
    let words = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] !== 'A') continue;

            // find the characters through each diagonal
            let left = '', right = '';
            for (let i = -1; i <= 1; i++) {
                left += getCharacter(grid, x + i, y + i);
                right += getCharacter(grid, x - i, y + i);
            }

            if ((left === 'MAS' || left === 'SAM') && (right === 'MAS' || right === 'SAM')) words++;
        }   
    }

    return words;
};

export { part1, part2 };
