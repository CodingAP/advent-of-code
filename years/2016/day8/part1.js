const input = require('fs').readFileSync('./years/2016/day8/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let grid = common.create2DArray(50, 6, false);
    let instructions = input.split('\n');

    for (let i = 0; i < instructions.length; i++) {
        let tokens = instructions[i].split(' ');
        if (tokens[0] == 'rect') {
            let dimensions = { x: parseInt(tokens[1].split('x')[0]), y: parseInt(tokens[1].split('x')[1]) };

            for (let y = 0; y < dimensions.y; y++) {
                for (let x = 0; x < dimensions.x; x++) {
                    grid[y][x] = true;
                }
            }
        } else if (tokens[0] == 'rotate') {
            let index = parseInt(tokens[2].split('=')[1]);
            let amount = parseInt(tokens[4]);

            if (tokens[1] == 'row') {
                let shiftRow = [];
                for (let j = 0; j < grid[0].length; j++) {
                    shiftRow.push(grid[index][j]);
                }
                for (let j = 0; j < amount; j++) {
                    shiftRow.unshift(shiftRow.pop());
                }
                for (let j = 0; j < grid[0].length; j++) {
                    grid[index][j] = shiftRow[j];
                }
            } else if (tokens[1] == 'column') {
                let shiftColumn = [];
                for (let j = 0; j < grid.length; j++) {
                    shiftColumn.push(grid[j][index]);
                }
                for (let j = 0; j < amount; j++) {
                    shiftColumn.unshift(shiftColumn.pop());
                }
                for (let j = 0; j < grid.length; j++) {
                    grid[j][index] = shiftColumn[j];
                }
            }
        }
    }

    let lightsOn = 0;
    
    common.forEach2DArray(grid, value => {
        if (value) lightsOn++;
    })

    return lightsOn;
}