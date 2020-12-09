const input = require('fs').readFileSync('./years/2020/day3/input.txt').toString().trim();
const common = require('../../../common');

module.exports = () => {
    let position = { x: 0, y: 0 };
    let velocity = { x: 3, y: 1 };
    let trees = 0;

    let rows = input.split('\n');
    let grid = new Array(rows.length);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(rows[i].length);
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = (rows[i].charAt(j) == '#');
        }
    }

    while (position.y < grid.length) {
        if (grid[position.y][position.x]) trees++;

        position.x = (position.x + velocity.x) % grid[0].length;
        position.y += velocity.y;
    }

    return trees;
}