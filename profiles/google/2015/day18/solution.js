const part1 = async input => {
    let grid = new Array(100).fill(0).map(element => new Array(100).fill(0));
    let rows = input.split('\n');

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            grid[y][x] = rows[y][x] == '#';
        }
    }

    for (let step = 0; step < 100; step++) {
        let newGrid = new Array(100).fill(0).map(element => new Array(100).fill(0));

        for (let y = 0; y < newGrid.length; y++) {
            for (let x = 0; x < newGrid[y].length; x++) {
                let neighbors = 0;
                for (let j = -1; j <= 1; j++) {
                    for (let i = -1; i <= 1; i++) {
                        if (i == 0 && j == 0) continue;
                        if ((x + i) < 0 || (x + i) >= newGrid[y].length || (y + j) < 0 || (y + j) >= newGrid.length) continue;

                        neighbors += grid[y + j][x + i] ? 1 : 0;
                    }
                }
                if (grid[y][x]) newGrid[y][x] = (neighbors == 2 || neighbors == 3);
                else newGrid[y][x] = neighbors == 3;
            }
        }

        grid = newGrid;
    }

    return grid.flatMap(element => element).filter(element => element).length;
}

const part2 = async input => {
    let grid = new Array(100).fill(0).map(element => new Array(100).fill(0));
    let rows = input.split('\n');

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            grid[y][x] = rows[y][x] == '#';
        }
    }

    for (let step = 0; step < 100; step++) {
        let newGrid = new Array(100).fill(0).map(element => new Array(100).fill(0));

        for (let y = 0; y < newGrid.length; y++) {
            for (let x = 0; x < newGrid[y].length; x++) {
                let neighbors = 0;
                for (let j = -1; j <= 1; j++) {
                    for (let i = -1; i <= 1; i++) {
                        if (i == 0 && j == 0) continue;
                        if ((x + i) < 0 || (x + i) >= newGrid[y].length || (y + j) < 0 || (y + j) >= newGrid.length) continue;

                        neighbors += grid[y + j][x + i] ? 1 : 0;
                    }
                }
                if (grid[y][x]) newGrid[y][x] = (neighbors == 2 || neighbors == 3);
                else newGrid[y][x] = neighbors == 3;
            }
        }

        newGrid[0][0] = true;
        newGrid[0][newGrid[0].length - 1] = true;
        newGrid[newGrid.length - 1][0] = true;
        newGrid[newGrid.length - 1][newGrid[0].length - 1] = true;

        grid = newGrid;
    }

    return grid.flatMap(element => element).filter(element => element).length;
}

export { part1, part2 }; 