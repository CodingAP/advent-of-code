const input = require('fs').readFileSync('./years/2020/day11/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let seats = input.split('\n');

    let grid = common.create2DArray(seats[0].length, seats.length, (x, y) => {
        if (seats[y].charAt(x) == 'L') {
            return false;
        }
        return null;
    });

    let previousGrid = null;
    while (true) {
        let newGrid = common.create2DArray(seats[0].length, seats.length, false);

        common.forEach2DArray(grid, (value, x, y) => {
            if (value == null) { newGrid[y][x] = null; return; }

            let neighbors = 0;
            for (let j = -1; j <= 1; j++) {
                for (let k = -1; k <= 1; k++) {
                    if (j == 0 && k == 0) continue;
                    if (y + j < 0 || y + j >= seats.length || x + k < 0 || x + k >= seats[0].length) continue;
                    if (grid[y + j][x + k]) neighbors++;
                }
            }

            newGrid[y][x] = (value) ? (neighbors < 4) : (neighbors == 0);
        });

        if (!previousGrid) {
            previousGrid = newGrid;
        } else {
            if (JSON.stringify(newGrid) === JSON.stringify(previousGrid)) {
                let occSeats = 0;
                common.forEach2DArray(newGrid, value => {
                    if (value) occSeats++;
                });
                return occSeats;
            }
            previousGrid = newGrid;
        }
        grid = newGrid;

        // for (let y = 0; y < grid.length; y++) {
        //     let line = '';
        //     for (let x = 0; x < grid[0].length; x++) {
        //         if (grid[y][x] == null) {
        //             line += '.';
        //         } else if (grid[y][x]) {
        //             line += '#';
        //         } else {
        //             line += 'L';
        //         }
        //     }
        //     console.log(line);
        // }
    }
}