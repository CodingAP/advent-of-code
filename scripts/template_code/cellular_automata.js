let initial = '.#...####';
let size = 3;

let grid = {};
for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
        grid[`${x},${(y == 0) ? '' : '-'}${y}`] = initial[y * size + x] == '#';
    }
}

for (let cycles = 0; cycles < 1; cycles++) {
    let nextGrid = {};
    Object.keys(grid).forEach(element => {
        let [x, y] = element.split(',').map(num => parseInt(num));

        for (let j = -1; j <= 1; j++) {
            for (let i = -1; i <= 1; i++) {
                if (i == 0 && j == 0) continue;
                if (grid[`${x + i},${y + j}`] == null) grid[`${x + i},${y + j}`] = false;
            }
        }
    });

    Object.keys(grid).forEach(element => {
        let [x, y] = element.split(',').map(num => parseInt(num));

        let neighbors = 0;

        for (let j = -1; j <= 1; j++) {
            for (let i = -1; i <= 1; i++) {
                if (i == 0 && j == 0) continue;
                if (grid[`${x + i},${y + j}`]) neighbors++;
            }
        }

        nextGrid[element] = grid[element] ? (neighbors == 2 || neighbors == 3) : (neighbors == 3);
    });
    grid = nextGrid;
}