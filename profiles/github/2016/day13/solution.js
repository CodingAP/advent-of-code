const bfs = (grid, starting, ending) => {
    let queue = [];
    let visited = [`${starting.x},${starting.y}`];

    queue.push([starting]);

    while (queue.length > 0) {
        let path = queue.shift();
        let position = path[path.length - 1];

        let directions = [
            { x: position.x + 1, y: position.y },
            { x: position.x, y: position.y + 1 },
            { x: position.x - 1, y: position.y },
            { x: position.x, y: position.y - 1 }
        ];

        for (let direction of directions) {
            if (direction.x == ending.x && direction.y == ending.y) return path.concat([direction]);

            if (direction.x < 0 || direction.x >= grid[0].length ||
                direction.y < 0 || direction.y >= grid.length ||
                visited.includes(`${direction.x},${direction.y}`) ||
                grid[direction.y][direction.x] == '#') {
                continue;
            }

            visited.push(`${direction.x},${direction.y}`);
            queue.push(path.concat([direction]));
        }
    }

    return [];
}

const part1 = async input => {
    let number = parseInt(input);

    let starting = { x: 1, y: 1 };
    let ending = { x: 31, y: 39 };

    let size = 50;
    let rows = new Array(size).fill(0).map((element, y) => new Array(size).fill(0).map((element, x) => {
        let magic = x * x + 3 * x + 2 * x * y + y + y * y;
        magic += number;
        return (magic.toString(2).split('').filter(bit => bit == '1').length % 2 == 0) ? '.' : '#';
    }));

    return bfs(rows, starting, ending).length - 1;
}

const part2 = async input => {
    let number = parseInt(input);

    let starting = { x: 1, y: 1 };

    let size = 50;
    let rows = new Array(size).fill(0).map((element, y) => new Array(size).fill(0).map((element, x) => {
        let magic = x * x + 3 * x + 2 * x * y + y + y * y;
        magic += number;
        return (magic.toString(2).split('').filter(bit => bit == '1').length % 2 == 0) ? '.' : '#';
    }));

    let spaces = 0;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (rows[y][x] == '#') continue;
            let steps = bfs(rows, starting, { x, y }).length - 1;
            if (steps != -1 && steps <= 50) spaces++;
        }
    }

    return spaces;
}

export { part1, part2 };