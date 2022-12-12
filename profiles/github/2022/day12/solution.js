const part1 = async input => {
    let rows = input.split('\n').map(row => row.split('').map(character => character.charCodeAt(0)));

    let starting = { x: 0, y: 0 };
    let ending = { x: 0, y: 0 };

    for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[y].length; x++) {
            if (rows[y][x] == 'S'.charCodeAt(0)) {
                starting = { x, y };
                rows[y][x] = 'a'.charCodeAt(0);
            }
            if (rows[y][x] == 'E'.charCodeAt(0)) {
                ending = { x, y };
                rows[y][x] = 'z'.charCodeAt(0);
            }
        }
    }

    let finalPath = [];
    let queue = [];
    let visited = [`${starting.x},${starting.y}`];

    queue.push([starting]);

    while (queue.length > 0 && finalPath.length == 0) {
        let path = queue.shift();
        let position = path[path.length - 1];

        let directions = [
            { x: position.x + 1, y: position.y },
            { x: position.x, y: position.y + 1 },
            { x: position.x - 1, y: position.y },
            { x: position.x, y: position.y - 1 }
        ];

        for (let direction of directions) {
            if (direction.x < 0 || direction.x >= rows[0].length ||
                direction.y < 0 || direction.y >= rows.length ||
                visited.includes(`${direction.x},${direction.y}`) ||
                rows[direction.y][direction.x] - rows[position.y][position.x] > 1) {
                continue;
            }

            if (direction.x == ending.x && direction.y == ending.y) finalPath = path.concat([ending]);
            visited.push(`${direction.x},${direction.y}`);
            queue.push(path.concat([direction]));
        }
    }

    return finalPath.length - 1;
}

const part2 = async input => {
    let rows = input.split('\n').map(row => row.split('').map(character => character.charCodeAt(0)));

    let starting = { x: 0, y: 0 };

    for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[y].length; x++) {
            if (rows[y][x] == 'S'.charCodeAt(0)) rows[y][x] = 'a'.charCodeAt(0);
            if (rows[y][x] == 'E'.charCodeAt(0)) {
                starting = { x, y };
                rows[y][x] = 'z'.charCodeAt(0);
            }
        }
    }

    let finalPath = [];
    let queue = [];
    let visited = [`${starting.x},${starting.y}`];

    queue.push([starting]);

    while (queue.length > 0 && finalPath.length == 0) {
        let path = queue.shift();
        let position = path[path.length - 1];

        let directions = [
            { x: position.x + 1, y: position.y },
            { x: position.x, y: position.y + 1 },
            { x: position.x - 1, y: position.y },
            { x: position.x, y: position.y - 1 }
        ];

        for (let direction of directions) {
            if (direction.x < 0 || direction.x >= rows[0].length ||
                direction.y < 0 || direction.y >= rows.length ||
                visited.includes(`${direction.x},${direction.y}`) ||
                rows[position.y][position.x] - rows[direction.y][direction.x] > 1) {
                continue;
            }

            if (rows[direction.y][direction.x] == 'a'.charCodeAt(0)) finalPath = path.concat([direction]);
            visited.push(`${direction.x},${direction.y}`);
            queue.push(path.concat([direction]));
        }
    }

    return finalPath.length - 1;
}

export { part1, part2 };