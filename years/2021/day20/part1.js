const common = require('../../../scripts/common');

module.exports = input => {
    let [algorithm, image] = input.split('\n\n');

    let grid = {};
    image.split('\n').forEach((element, index) => {
        for (let i = 0; i < element.length; i++) {
            grid[`${i},${index}`] = (element[i] == '#') ? 1 : 0;
        }
    });

    for (let steps = 0; steps < 2; steps++) {
        let newGrid = {};

        common.objectForEach(grid, (coords, state) => {
            let [x, y] = common.parseListToInt(coords, ',');
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    let neighborCoords = `${x + i},${y + j}`;
                    if (grid[neighborCoords] == null) grid[neighborCoords] = steps;
                }
            }
        });

        common.objectForEach(grid, (coords, state) => {
            let [x, y] = common.parseListToInt(coords, ',');
            let binary = '';
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    let neighborCoords = `${x + i},${y + j}`;
                    if (grid[neighborCoords] == null) binary += steps;
                    else binary += grid[neighborCoords];
                }
            }

            newGrid[coords] = (algorithm[parseInt(binary, 2)] == '#') ? 1 : 0;
        });

        grid = newGrid;
    }

    let lights = 0;
    common.objectForEach(grid, (coords, state) => {
        if (state == 1) lights++;
    });

    return lights;
}