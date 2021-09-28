const common = require('../../../scripts/common');

module.exports = input => {
    let grid = {};

    let positions = {
        e: { x: 1, y: 0 },
        ne: { x: 0.5, y: 1 },
        nw: { x: -0.5, y: 1 },
        w: { x: -1, y: 0 },
        se: { x: 0.5, y: -1 },
        sw: { x: -0.5, y: -1 },
    }

    input.split(/\n/).forEach(value => {
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
        
        common.objectForEach(grid, (key, value) => {
            let [posX, posY] = key.split(',').map(value => parseFloat(value));
            
            common.objectForEach(positions, (key, value) => {
                let neighborX = posX + value.x;
                let neighborY = posY + value.y;

                if (grid[neighborX + ',' + neighborY] == null) grid[neighborX + ',' + neighborY] = false;
            });
        });

        common.objectForEach(grid, (key, value) => {
            let neighbors = 0;
            let [posX, posY] = key.split(',').map(value => parseFloat(value));
            
            common.objectForEach(positions, (key, value) => {
                let neighborX = posX + value.x;
                let neighborY = posY + value.y;
                
                if (grid[neighborX + ',' + neighborY]) neighbors++;
            });

            newGrid[key] = value ? (neighbors == 1 || neighbors == 2) : (neighbors == 2);
        });

        grid = newGrid;
    }
    
    return Object.entries(grid).filter(value => value[1]).length;
}