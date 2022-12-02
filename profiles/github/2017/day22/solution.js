const part1 = async input => {
    let grid = {};
    input.split('\n').forEach((element, row) => {
        element.split('').forEach((space, col) => {
            grid[`${col},${row}`] = space == '#';
        });
    });

    let position = { x: 12, y: 12 };
    let directionVectors = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
    let direction = 0;

    let bursts = 0;
    for (let i = 0; i < 10000; i++) {
        if (grid[`${position.x},${position.y}`]) direction = (direction + 1) % directionVectors.length; 
        else {
            direction--;
            if (direction < 0) direction = directionVectors.length - 1; 
            bursts++;
        }
        grid[`${position.x},${position.y}`] = !grid[`${position.x},${position.y}`];
        position.x += directionVectors[direction].x;
        position.y += directionVectors[direction].y;
    }
    
    return bursts;
}

const part2 = async input => {
    let grid = {};
    input.split('\n').forEach((element, row) => {
        element.split('').forEach((space, col) => {
            let state = (space == '#') ? 2 : 0;
            grid[`${col},${row}`] = state;
        });
    });

    let position = { x: 12, y: 12 };
    let directionVectors = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
    let directionChange = [-1, 0, 1, 2];
    let direction = 0;

    let bursts = 0;
    for (let i = 0; i < 10000000; i++) {
        direction += directionChange[grid[`${position.x},${position.y}`]];
        if (direction < 0) direction = directionVectors.length - 1;
        direction = direction % directionVectors.length;
        
        grid[`${position.x},${position.y}`] = (grid[`${position.x},${position.y}`] + 1) % directionChange.length;
        if (grid[`${position.x},${position.y}`] == 2) bursts++;

        position.x += directionVectors[direction].x;
        position.y += directionVectors[direction].y;
        if (grid[`${position.x},${position.y}`] == null) grid[`${position.x},${position.y}`] = 0;
    }

    return bursts;
}

export { part1, part2 };