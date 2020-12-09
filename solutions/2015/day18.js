const input = require('fs').readFileSync('inputs/2015/18.in').toString().trim();
const common = require('../../common');

module.exports = {
    part1: () => {
        let size = 100;
        let rows = input.split('\n');
        let grid = common.create2DArray(size, size, (x, y) => (rows[y].charAt(x) == '#'));
        
        let lightsOn = 0;
        for (let i = 0; i < 100; i++) {
            let newGrid = common.create2DArray(size, size, true);

            common.forEach2DArray(grid, (value, x, y) => {
                let neighbors = 0;
                for (let j = -1; j <= 1; j++) {
                    for (let k = -1; k <= 1; k++) {
                        if (j == 0 && k == 0) continue;
                        if (y + j < 0 || y + j >= size || x + k < 0 || x + k >= size) continue;
                        if (grid[y + j][x + k]) neighbors++;
                    }
                }

                if (value) {
                    newGrid[y][x] = (neighbors == 2 || neighbors == 3);
                } else {
                    newGrid[y][x] = (neighbors == 3);  
                }
            });

            grid = newGrid;
        }

        common.forEach2DArray(grid, value => {
            if (value) lightsOn++;
        });
        return lightsOn;
    },
    part2: () => {
        let size = 100;
        let rows = input.split('\n');
        let grid = common.create2DArray(size, size, (x, y) => (rows[y].charAt(x) == '#'));
        
        let lightsOn = 0;
        for (let i = 0; i < 100; i++) {
            let newGrid = common.create2DArray(size, size, true);

            common.forEach2DArray(grid, (value, x, y) => {
                let neighbors = 0;
                for (let j = -1; j <= 1; j++) {
                    for (let k = -1; k <= 1; k++) {
                        if (j == 0 && k == 0) continue;
                        if (y + j < 0 || y + j >= size || x + k < 0 || x + k >= size) continue;
                        if (grid[y + j][x + k]) neighbors++;
                    }
                }

                if (value) {
                    newGrid[y][x] = (neighbors == 2 || neighbors == 3);
                } else {
                    newGrid[y][x] = (neighbors == 3);  
                }
            });
            newGrid[0][0] = true;
            newGrid[0][size - 1] = true;
            newGrid[size - 1][size - 1] = true;
            newGrid[size - 1][0] = true;

            grid = newGrid;
        }

        common.forEach2DArray(grid, value => {
            if (value) lightsOn++;
        });
        return lightsOn;
    }
}