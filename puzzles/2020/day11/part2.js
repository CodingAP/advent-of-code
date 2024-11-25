const input = require('fs').readFileSync('./years/2020/day11/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let seats = input.split('\n');

    let grid = common.create2DArray(seats[0].length, seats.length, (x, y) => {
        if (seats[y].charAt(x) == 'L') {
            return false;
        } else if (seats[y].charAt(x) == '#') {
            return true;
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
                    let lookingPosition = { x, y };
                    
                    while (true) {
                        lookingPosition.x += k;
                        lookingPosition.y += j;

                        if (lookingPosition.x < 0 || lookingPosition.x >= grid[0].length || lookingPosition.y < 0 || lookingPosition.y >= grid.length) break;

                        if (grid[lookingPosition.y][lookingPosition.x] != null) {
                            neighbors += (grid[lookingPosition.y][lookingPosition.x]) ? 1 : 0;
                            break;
                        }
                    } 
                }
            }

            if (value) {
                newGrid[y][x] = (neighbors < 5);
            } else {
                newGrid[y][x] = (neighbors == 0);
            }
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
    }
}