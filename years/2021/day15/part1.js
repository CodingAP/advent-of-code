const common = require('../../../scripts/common');

module.exports = input => {
    let rows = input.split('\n');
    let grid = common.create2DArray(rows[0].length, rows.length, (x, y) => {
        return parseInt(rows[y][x]);
    });

    let risk = 0;
    let path = common.solveMazeWeighted(grid, { x: 0, y: 0 }, { x: grid[0].length - 1, y: grid[1].length - 1 });
    path.slice(1).forEach(element => {
        risk += grid[element.y][element.x];
    });

    return risk;
}