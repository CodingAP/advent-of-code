const common = require('../../../scripts/common');
const input = common.readInput('./years/2019/day24/input.txt');

module.exports = () => {
    let size = 5;
    let rows = input.split('\n');
    let grid = common.create2DArray(size, size, (x, y) => (rows[y].charAt(x) == '#'));
    let last = [];

    while (true) {
        let newGrid = common.create2DArray(size, size, true);

        common.forEach2DArray(grid, (value, x, y) => {
            let neighbors = 0;
            if (y - 1 >= 0 && grid[y - 1][x]) neighbors++;
            if (x - 1 >= 0 && grid[y][x - 1]) neighbors++;
            if (x + 1 < size && grid[y][x + 1]) neighbors++;
            if (y + 1 < size && grid[y + 1][x]) neighbors++;

            newGrid[y][x] = value ? (neighbors == 1) : (neighbors == 1 || neighbors == 2);
        });

        grid = newGrid;

        let hasHappened = false;
        last.forEach(value => {
            if (JSON.stringify(grid) == value) hasHappened = true;
        });
        if (hasHappened) break;
        last.push(JSON.stringify(grid));
    }

    let sum = 0;
    common.forEach2DArray(grid, (value, x, y) => {
        if (value) sum += Math.pow(2, y * size + x);
    });
    return sum;
}