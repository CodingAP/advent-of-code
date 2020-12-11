const input = require('fs').readFileSync('./years/2016/day2/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let passcode = '';

    let position = { x: 1, y: 1 };
    let grid = [[1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]]

    let directions = input.split('\n');
    for (let i = 0; i < directions.length; i++) {
        for (let j = 0; j < directions[i].length; j++) {
            switch (directions[i].charAt(j)) {
                case 'U':
                    position.y--;
                    break;
                case 'D':
                    position.y++;
                    break;
                case 'L':
                    position.x--;
                    break;
                case 'R':
                    position.x++;
                    break;
            }

            position.x = Math.max(0, Math.min(grid[0].length - 1, position.x));
            position.y = Math.max(0, Math.min(grid.length - 1, position.y));
        }
        passcode += grid[position.y][position.x];
    }

    return passcode;
}