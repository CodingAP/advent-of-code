const common = require('../../../scripts/common');
const dijkstra = require('dijkstrajs');

module.exports = input => {
    let rows = input.split('\n');
    let grid = common.create2DArray(rows[0].length * 5, rows.length * 5, (x, y) => {
        let quadrantX = Math.floor(x / rows[0].length);
        let quadrantY = Math.floor(y / rows.length);

        let value = parseInt(rows[y - (quadrantY * rows.length)][x - (quadrantX * rows[0].length)]) + (quadrantX + quadrantY);
        if (value > 9) value -= 9;
        return value;
    });

    let risk = 0;
    let path = common.solveMazeWeighted(grid, { x: 0, y: 0 }, { x: grid[0].length - 1, y: grid[1].length - 1 });
    path.slice(1).forEach(element => {
        risk += grid[element.y][element.x];
    });

    return risk;
}