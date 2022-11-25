const part1 = async input => {
    let grid = new Array(1000).fill(0);
    grid = grid.map(() => new Array(1000).fill(false));

    input.split('\n').forEach(element => {
        let tokens = element.split(' ');
        if (tokens[0] == 'turn') {
            let [startX, startY] = tokens[2].split(',').map(number => parseInt(number));
            let [endX, endY] = tokens[4].split(',').map(number => parseInt(number));
            for (let y = startY; y <= endY; y++) {
                for (let x = startX; x <= endX; x++) {
                    grid[y][x] = tokens[1] == 'on';
                }
            }
        } else {
            let [startX, startY] = tokens[1].split(',').map(number => parseInt(number));
            let [endX, endY] = tokens[3].split(',').map(number => parseInt(number));
            for (let y = startY; y <= endY; y++) {
                for (let x = startX; x <= endX; x++) {
                    grid[y][x] = !grid[y][x];
                }
            }
        }
    });

    return grid.flatMap(element => element).filter(element => element).length;
}

const part2 = async input => {
    let grid = new Array(1000).fill(0);
    grid = grid.map(() => new Array(1000).fill(0));

    input.split('\n').forEach(element => {
        let tokens = element.split(' ');
        if (tokens[0] == 'turn') {
            let [startX, startY] = tokens[2].split(',').map(number => parseInt(number));
            let [endX, endY] = tokens[4].split(',').map(number => parseInt(number));
            for (let y = startY; y <= endY; y++) {
                for (let x = startX; x <= endX; x++) {
                    grid[y][x] += (tokens[1] == 'on') ? 1 : -1;
                    grid[y][x] = Math.max(grid[y][x], 0);
                }
            }
        } else {
            let [startX, startY] = tokens[1].split(',').map(number => parseInt(number));
            let [endX, endY] = tokens[3].split(',').map(number => parseInt(number));
            for (let y = startY; y <= endY; y++) {
                for (let x = startX; x <= endX; x++) {
                    grid[y][x] += 2;
                }
            }
        }
    });

    return grid.flatMap(element => element).reduce((acc, element) => acc + element, 0);
}

export { part1, part2 }; 