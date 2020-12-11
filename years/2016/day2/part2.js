const input = require('fs').readFileSync('./years/2016/day2/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let passcode = '';

    let position = { x: 0, y: 2 };
    let grid = [[0,  0,   1,   0,  0],
                [0,  2,   3,   4,  0],
                [5,  6,   7,   8,  9],
                [0, 'A', 'B', 'C', 0],
                [0,  0,  'D',  0,  0]]

    let directions = input.split('\n');
    for (let i = 0; i < directions.length; i++) {
        for (let j = 0; j < directions[i].length; j++) {
            switch (directions[i].charAt(j)) {
                case 'U':
                    position.y--;
                    if (position.y < 0 || grid[position.y][position.x] == 0) position.y++;
                    break;
                case 'D':
                    position.y++;
                    if (position.y >= grid[i].length || grid[position.y][position.x] == 0) position.y--;
                    break;
                case 'L':
                    position.x--;
                    if (position.x < 0 || grid[position.y][position.x] == 0) position.x++;
                    break;
                case 'R':
                    position.x++;
                    if (position.x >= grid[i].length || grid[position.y][position.x] == 0) position.x--;
                    break;
            }
        }

        passcode += grid[position.y][position.x];
    }

    return passcode;
}