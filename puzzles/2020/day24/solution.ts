// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day24/solution.ts
 *
 * ~~ Lobby Layout ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

const objectForEach = (object, callback) => {
    Object.entries(object).forEach(([key, value]) => callback(key, value));
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let grid = {};
    
    let positions = {
        e: { x: 1, y: 0 },
        ne: { x: 0.5, y: 1 },
        nw: { x: -0.5, y: 1 },
        w: { x: -1, y: 0 },
        se: { x: 0.5, y: -1 },
        sw: { x: -0.5, y: -1 },
    }
    
    input.trim().split('\n').forEach(value => {
        let currentPosition = { x: 0, y: 0 };
        for (let i = 0; i < value.length; i++) {
            let current = value.charAt(i);
            let next = value.charAt(i + 1) || '';
            
            if (positions[current + next]) {
                currentPosition.x += positions[current + next].x;
                currentPosition.y += positions[current + next].y;
                i++;
            } else if (positions[current]) {
                currentPosition.x += positions[current].x;
                currentPosition.y += positions[current].y;
            }
        }
        
        if (!grid[currentPosition.x + ',' + currentPosition.y]) grid[currentPosition.x + ',' + currentPosition.y] = false;
        grid[currentPosition.x + ',' + currentPosition.y] = !grid[currentPosition.x + ',' + currentPosition.y];
    });
    
    return Object.entries(grid).filter(value => value[1]).length;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let grid = {};

    let positions = {
        e: { x: 1, y: 0 },
        ne: { x: 0.5, y: 1 },
        nw: { x: -0.5, y: 1 },
        w: { x: -1, y: 0 },
        se: { x: 0.5, y: -1 },
        sw: { x: -0.5, y: -1 },
    }

    input.trim().split('\n').forEach(value => {
        let currentPosition = { x: 0, y: 0 };
        for (let i = 0; i < value.length; i++) {
            let current = value.charAt(i);
            let next = value.charAt(i + 1) || '';

            if (positions[current + next]) {
                currentPosition.x += positions[current + next].x;
                currentPosition.y += positions[current + next].y;
                i++;
            } else if (positions[current]) {
                currentPosition.x += positions[current].x;
                currentPosition.y += positions[current].y;
            }
        }

        if (!grid[currentPosition.x + ',' + currentPosition.y]) grid[currentPosition.x + ',' + currentPosition.y] = false;
        grid[currentPosition.x + ',' + currentPosition.y] = !grid[currentPosition.x + ',' + currentPosition.y];
    });
    
    for (let i = 0; i < 100; i++) {
        let newGrid = {};
        
        objectForEach(grid, (key, value) => {
            let [posX, posY] = key.split(',').map(value => parseFloat(value));
            
            objectForEach(positions, (key, value) => {
                let neighborX = posX + value.x;
                let neighborY = posY + value.y;

                if (grid[neighborX + ',' + neighborY] == null) grid[neighborX + ',' + neighborY] = false;
            });
        });

        objectForEach(grid, (key, value) => {
            let neighbors = 0;
            let [posX, posY] = key.split(',').map(value => parseFloat(value));
            
            objectForEach(positions, (key, value) => {
                let neighborX = posX + value.x;
                let neighborY = posY + value.y;
                
                if (grid[neighborX + ',' + neighborY]) neighbors++;
            });

            newGrid[key] = value ? (neighbors == 1 || neighbors == 2) : (neighbors == 2);
        });

        grid = newGrid;
    }
    
    return Object.entries(grid).filter(value => value[1]).length;
};

export { part1, part2 };
