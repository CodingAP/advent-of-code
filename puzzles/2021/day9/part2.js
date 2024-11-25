const common = require('../../../scripts/common');

module.exports = input => {
    let rows = input.split('\n');
    let grid = common.create2DArray(rows[0].length, rows.length, (x, y) => {
        return parseInt(rows[y][x]);
    });

    let lowPoints = [];
    let areas = [];

    common.forEach2DArray(grid, (value, x, y) => {
        if (y > 0 && grid[y - 1][x] <= value) return;
        if (y < rows.length - 1 && grid[y + 1][x] <= value) return;
        if (x > 0 && grid[y][x - 1] <= value) return;
        if (x < rows[0].length - 1 && grid[y][x + 1] <= value) return;

        lowPoints.push({ x, y });
    });

    let fill = (x, y, points) => {
        points.push({ x, y });
        if (y > 0 && grid[y - 1][x] != 9 && points.findIndex(element => element.x == x && element.y == (y - 1)) == -1) fill(x, y - 1, points);
        if (y < rows.length - 1 && grid[y + 1][x] != 9 && points.findIndex(element => element.x == x && element.y == (y + 1)) == -1) fill(x, y + 1, points);
        if (x > 0 && grid[y][x - 1] != 9 && points.findIndex(element => element.x == (x - 1) && element.y == y) == -1) fill(x - 1, y, points);
        if (x < rows[0].length - 1 && grid[y][x + 1] != 9 && points.findIndex(element => element.x == (x + 1) && element.y == y) == -1) fill(x + 1, y, points);
        return points;
    }

    lowPoints.forEach(element => {
        let basin = fill(element.x, element.y, []);
        areas.push(basin);
    });

    areas.sort((a, b) => b.length - a.length);
    return areas[0].length * areas[1].length * areas[2].length;
}