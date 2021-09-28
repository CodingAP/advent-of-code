const common = require('../../../scripts/common');

module.exports = input => {
    let size = 50;
    let rows = input.split(/\n/);
    let grid = common.create2DArray(size, size, (x, y) => {
        return rows[y].charAt(x);
    });
    
    for (let i = 0; i < 10; i++) {
        let newGrid = common.create2DArray(size, size, true);

        common.forEach2DArray(grid, (value, x, y) => {
            let treeCount = 0;
            let lumberyardCount = 0;
            for (let j = -1; j <= 1; j++) {
                for (let k = -1; k <= 1; k++) {
                    if (j == 0 && k == 0) continue;
                    if (y + j < 0 || y + j >= size || x + k < 0 || x + k >= size) continue;
                    switch (grid[y + j][x + k]) {
                        case '#':
                            lumberyardCount++;
                            break;
                        case '|':
                            treeCount++;
                            break;
                    }
                }
            }

            switch (value) {
                case '.':
                    newGrid[y][x] = (treeCount >= 3) ? '|' : '.';
                    break;
                case '#':
                    newGrid[y][x] = (lumberyardCount != 0 && treeCount != 0) ? '#' : '.';
                    break;
                case '|':
                    newGrid[y][x] = (lumberyardCount >= 3) ? '#' : '|';
                    break;
            }
        });

        grid = newGrid;
    }

    let lumberCount = 0, treeCount = 0;
    common.forEach2DArray(grid, (value, x, y) => {
        switch (value) {
            case '#':
                lumberCount++;
                break;
            case '|':
                treeCount++;
                break;
        }
    });
    
    return lumberCount * treeCount;
}