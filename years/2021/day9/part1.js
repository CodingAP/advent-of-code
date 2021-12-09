const common = require('../../../scripts/common');

module.exports = input => {
    let rows = input.split('\n');
    let grid = common.create2DArray(rows[0].length, rows.length, (x, y) => {
        return parseInt(rows[y][x]);
    });

    let sum = 0;
    common.forEach2DArray(grid, (value, x, y) => {
        if (y > 0 && grid[y - 1][x] <= value) return;
        if (y < rows.length - 1 && grid[y + 1][x] <= value) return;
        if (x > 0 && grid[y][x - 1] <= value) return;
        if (x < rows[0].length - 1 && grid[y][x + 1] <= value) return;
        
        sum += value + 1;
    })
    return sum;
}