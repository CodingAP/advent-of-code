const input = require('fs').readFileSync('./years/2017/day22/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let grid = {};
    let rows = input.split('\n');
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            grid[`${j - Math.floor(rows[i].length / 2)},${i - Math.floor(rows.length / 2)}`] = rows[i][j] == '#';
        }
    }
    
    let position = { x: 0, y: 0 };
    let direction = 0;
    let bursts = 0;

    for (let i = 0; i < 1; i++) {
        let state = grid[`${position.x},${position.y}`];
        if (!state) {
            direction--;
            if (direction < 0) direction = 3;
            grid[`${position.x},${position.y}`] = true;
            bursts++;
        } else {
            direction = (direction + 1) % 4;
            grid[`${position.x},${position.y}`] = false;
        }

        switch (direction) {
            case 0:
                position.y++;
                break;
            case 1:
                position.x++;
                break;
            case 2:
                position.y--;
                break;
            case 3:
                position.x--;
                break;
        }
    }

    let 
    for (let i = 0;)

    return bursts;
}