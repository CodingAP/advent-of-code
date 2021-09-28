const common = require('../../../scripts/common');

module.exports = input => {
    let claims = input.split('\n');
    let size = 1000;

    let grid = common.create2DArray(size, size, []);

    for (let i = 0; i < claims.length; i++) {
        let tokens = claims[i].replace(/[#:]/g, '').split(' ');
        let id = parseInt(tokens[0]);
        let startingPosition = { x: parseInt(tokens[2].split(',')[0]), y: parseInt(tokens[2].split(',')[1]) };
        let dimensions = { x: parseInt(tokens[3].split('x')[0]), y: parseInt(tokens[3].split('x')[1]) };

        for (let y = 0; y < dimensions.y; y++) {
            for (let x = 0; x < dimensions.x; x++) {
                grid[startingPosition.y + y][startingPosition.x + x].push(id);
            }
        }
    }

    let overlap = 0;
    common.forEach2DArray(grid, value => {
        if (value.length > 1) overlap++;
    });

    return overlap;
}