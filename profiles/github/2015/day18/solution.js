const common = {
    create2DArray: (width, height, value) => {
        let array = new Array(height).fill(0).map(element => new Array(width).fill(0));
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (typeof value == 'function') array[y][x] = value(x, y);
                else array[y][x] = value;
            }
        }
        return array;
    },
    forEach2DArray: (array, callback) => {
        for (let y = 0; y < array.length; y++) {
            for (let x = 0; x < array[y].length; x++) {
                callback(array[y][x], x, y);
            }
        }
    }
}

const part1 = async input => {
    let size = 100;
    let rows = input.split('\n');
    let grid = common.create2DArray(size, size, (x, y) => (rows[y].charAt(x) == '#'));

    let lightsOn = 0;
    for (let i = 0; i < 100; i++) {
        let newGrid = common.create2DArray(size, size, true);

        common.forEach2DArray(grid, (value, x, y) => {
            let neighbors = 0;
            for (let j = -1; j <= 1; j++) {
                for (let k = -1; k <= 1; k++) {
                    if (j == 0 && k == 0) continue;
                    if (y + j < 0 || y + j >= size || x + k < 0 || x + k >= size) continue;
                    if (grid[y + j][x + k]) neighbors++;
                }
            }

            if (value) {
                newGrid[y][x] = (neighbors == 2 || neighbors == 3);
            } else {
                newGrid[y][x] = (neighbors == 3);
            }
        });

        grid = newGrid;
    }

    common.forEach2DArray(grid, value => {
        if (value) lightsOn++;
    });
    return lightsOn;
}

const part2 = async input => {
    let size = 100;
    let rows = input.split('\n');
    let grid = common.create2DArray(size, size, (x, y) => (rows[y].charAt(x) == '#'));

    let lightsOn = 0;
    for (let i = 0; i < 100; i++) {
        let newGrid = common.create2DArray(size, size, true);

        common.forEach2DArray(grid, (value, x, y) => {
            let neighbors = 0;
            for (let j = -1; j <= 1; j++) {
                for (let k = -1; k <= 1; k++) {
                    if (j == 0 && k == 0) continue;
                    if (y + j < 0 || y + j >= size || x + k < 0 || x + k >= size) continue;
                    if (grid[y + j][x + k]) neighbors++;
                }
            }

            if (value) {
                newGrid[y][x] = (neighbors == 2 || neighbors == 3);
            } else {
                newGrid[y][x] = (neighbors == 3);
            }
        });
        newGrid[0][0] = true;
        newGrid[0][size - 1] = true;
        newGrid[size - 1][size - 1] = true;
        newGrid[size - 1][0] = true;

        grid = newGrid;
    }

    common.forEach2DArray(grid, value => {
        if (value) lightsOn++;
    });
    return lightsOn;
}

export { part1, part2 };