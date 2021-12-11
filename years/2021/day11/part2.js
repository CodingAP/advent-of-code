const common = require('../../../scripts/common');

module.exports = input => {
    let rows = input.split('\n');
    let grid = common.create2DArray(rows[0].length, rows.length, (x, y) => {
        return parseInt(rows[y][x]);
    });

    let doFlash = (x, y, grid) => {
        grid[y][x] = 'FLASHED';
        for (let j = -1; j <= 1; j++) {
            for (let k = -1; k <= 1; k++) {
                if (j == 0 && k == 0) continue;
                if ((y + j) < 0 || (y + j) >= rows.length || (x + k) < 0 || (x + k) >= rows[0].length) continue;
                if (grid[y + j][x + k] == 'FLASHED') continue;

                grid[y + j][x + k]++;
                if (grid[y + j][x + k] > 9) doFlash(x + k, y + j, grid);
            }
        }
    }

    let step = 1;
    while (true) {
        let newGrid = common.create2DArray(rows[0].length, rows.length, 0);

        common.forEach2DArray(grid, (value, x, y) => {
            newGrid[y][x] = value + 1;
        });

        common.forEach2DArray(newGrid, (value, x, y) => {
            if (value > 9) doFlash(x, y, newGrid);
        });

        let allFlashed = true;
        common.map2DArray(newGrid, (value, x, y) => {
            if (value == 'FLASHED') return 0;
            allFlashed = false;
            return value;
        });

        if (allFlashed) return step;
        grid = newGrid;
        step++;
    }
}