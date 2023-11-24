const bfs = (nodes, starting, ending) => {
    let queue = [];
    let visited = [`${starting.x},${starting.y}`];

    queue.push([starting]);
    if (starting.x == ending.x && starting.y == ending.y) return queue[0];

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

            if (nodes[`${direction.x},${direction.y}`] == null ||
                visited.includes(`${direction.x},${direction.y}`) ||
                nodes[`${direction.x},${direction.y}`].size >= 500) {
                continue;
            }

            visited.push(`${direction.x},${direction.y}`);
            queue.push(path.concat([direction]));
        }
    }

    return [];
}

const part1 = async input => {
    let nodes = input.split('\n').slice(2).reduce((array, line) => {
        let tokens = line.split(' ').filter(value => value != '');

        let position = { x: parseInt(tokens[0].split('-')[1].replace('x', '')), y: parseInt(tokens[0].split('-')[2].replace('y', '')) };
        let size = parseInt(tokens[1].replace('T', ''));
        let used = parseInt(tokens[2].replace('T', ''));

        array.push({ position, size, used });
        return array;
    }, []);

    let valid = 0;
    for (let a = 0; a < nodes.length; a++) {
        for (let b = 0; b < nodes.length; b++) {
            if (a == b) continue;

            if (nodes[a].used != 0 && (nodes[b].size - nodes[b].used) >= nodes[a].used) valid++;
        }
    }
    return valid;
}

const part2 = async input => {
    let nodes = input.split('\n').slice(2).reduce((obj, line) => {
        let tokens = line.split(' ').filter(value => value != '');

        let position = { x: parseInt(tokens[0].split('-')[1].replace('x', '')), y: parseInt(tokens[0].split('-')[2].replace('y', '')) };
        let size = parseInt(tokens[1].replace('T', ''));
        let used = parseInt(tokens[2].replace('T', ''));

        obj[`${position.x},${position.y}`] = { size, used };
        return obj;
    }, {});

    let coords = Object.keys(nodes).map(element => element.split(',').map(num => parseInt(num)));
    let minX = coords.reduce((min, coord) => Math.min(coord[0], min), Infinity);
    let minY = coords.reduce((min, coord) => Math.min(coord[1], min), Infinity);
    let maxX = coords.reduce((max, coord) => Math.max(coord[0], max), -Infinity);
    let maxY = coords.reduce((max, coord) => Math.max(coord[1], max), -Infinity);

    let starting = { x: 0, y: 0 };
    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            if (nodes[`${x},${y}`].used == 0) starting = { x, y };
        }
    }

    let stepsToGoal = bfs(nodes, starting, { x: maxX - 1, y: 0 }).length - 1;
    // It takes a minimum of 5 steps to move goal one to the left
    // However, we can remove the last 4 as the goal is already in the corner
    return stepsToGoal + 5 * maxX - 4;
}

export { part1, part2 };