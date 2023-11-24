const part1 = async input => {
    let position = { x: 0, y: 0 };
    let velocity = { x: 3, y: 1 };
    let trees = 0;

    let rows = input.split('\n');
    let grid = new Array(rows.length);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(rows[i].length);
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = (rows[i].charAt(j) == '#');
        }
    }

    while (position.y < grid.length) {
        if (grid[position.y][position.x]) trees++;

        position.x = (position.x + velocity.x) % grid[0].length;
        position.y += velocity.y;
    }

    return trees;
}

const part2 = async input => {
    let velocities = [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 }, { x: 7, y: 1 }, { x: 1, y: 2 }];
    let sum = 1;

    let rows = input.split('\n');
    let grid = new Array(rows.length);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(rows[i].length);
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = (rows[i].charAt(j) == '#');
        }
    }

    for (let i = 0; i < velocities.length; i++) {
        let position = { x: 0, y: 0 };
        let trees = 0;

        while (position.y < grid.length) {
            if (grid[position.y][position.x]) trees++;

            position.x = (position.x + velocities[i].x) % grid[0].length;
            position.y += velocities[i].y;
        }

        sum *= trees;
    }

    return sum;
}

export { part1, part2 };