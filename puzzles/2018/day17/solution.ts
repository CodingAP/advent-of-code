/**
 * puzzles/2018/day17/solution.ts
 *
 * ~~ Reservoir Research ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/4/2024
 */

const getPosition = (grid: { [key: string]: string }, x: number, y: number) => grid[`${x},${y}`] || '.';
const setPosition = (grid: { [key: string]: string }, x: number, y: number, value: string) => grid[`${x},${y}`] = value;

const floodFill = (grid: { [key: string]: string }, maxY: number, x: number, y: number) => {
    if (y >= maxY) return;
    
    // drop down if nothing is supporting
    if (getPosition(grid, x, y + 1) === '.') {
        setPosition(grid, x, y + 1, '|');
        floodFill(grid, maxY, x, y + 1);
    }
    
    // try going left and right
    if (getPosition(grid, x, y + 1).match(/[#~]/)) {
        if (getPosition(grid, x - 1, y) === '.') {
            setPosition(grid, x - 1, y, '|');
            floodFill(grid, maxY, x - 1, y);
        }
        if (getPosition(grid, x + 1, y) === '.') {
            setPosition(grid, x + 1, y, '|');
            floodFill(grid, maxY, x + 1, y);
        }
    }

    // prevent already still water from setting more still water
    if (getPosition(grid, x, y) === '~') return;

    // check to see if water can fill between walls
    let leftWall = -1, rightWall = -1;
    let leftX = x, rightX = x;
    while ((leftWall === -1 || rightWall === -1) && getPosition(grid, leftX, y) !== '.' && getPosition(grid, rightX, y) !== '.') {
        // check for any walls to the left
        if (leftWall === -1) {
            if (getPosition(grid, leftX, y) === '#') leftWall = leftX;
            else leftX--;
        }

        // check for any walls to the right
        if (rightWall === -1) {
            if (getPosition(grid, rightX, y) === '#') rightWall = rightX;
            else rightX++;
        }
    }
    
    // if can, fill in level
    if (leftWall !== -1 && rightWall !== -1) {
        for (let i = leftWall + 1; i <= rightWall - 1; i++) setPosition(grid, i, y, '~');
    }
}

const parseInput = (input: string) => {
    const grid: { [key: string]: string } = {};

    // go through each line and make each point contained on the line a '#'
    input.trim().split('\n').forEach(line => {
        const [first, second] = line.split(', ');
        const staticValue = parseInt(first.split('=')[1]);
        const [startValue, endValue] = second.split('=')[1].split('..').map(num => parseInt(num));

        let startX, endX, startY, endY;
        if (first[0] === 'x') {
            startX = staticValue;
            endX = staticValue;
            startY = startValue;
            endY = endValue;
        } else {
            startY = staticValue;
            endY = staticValue;
            startX = startValue;
            endX = endValue;
        }

        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                setPosition(grid, x, y, '#');
            }
        }
    });

    return grid;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const grid = parseInput(input);
    const minY = Math.min(...Object.keys(grid).map(point => parseInt(point.split(',')[1])));
    const maxY = Math.max(...Object.keys(grid).map(point => parseInt(point.split(',')[1])));

    // start filling at (500, 0);
    floodFill(grid, maxY, 500, 0);
    
    // count all points in grid
    const counts = Object.entries(grid).reduce<{ [key: string]: number }>((obj, [point, value]) => {
        if (parseInt(point.split(',')[1]) < minY) return obj; 
        obj[value] = (obj[value] || 0) + 1;
        return obj;
    }, {});

    return counts['|'] + counts['~'];
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const grid = parseInput(input);
    const minY = Math.min(...Object.keys(grid).map(point => parseInt(point.split(',')[1])));
    const maxY = Math.max(...Object.keys(grid).map(point => parseInt(point.split(',')[1])));

    // start filling at (500, 0);
    floodFill(grid, maxY, 500, 0);
    
    // count all points in grid
    const counts = Object.entries(grid).reduce<{ [key: string]: number }>((obj, [point, value]) => {
        if (parseInt(point.split(',')[1]) < minY) return obj; 
        obj[value] = (obj[value] || 0) + 1;
        return obj;
    }, {});

    return counts['~'];
};

export { part1, part2 };
