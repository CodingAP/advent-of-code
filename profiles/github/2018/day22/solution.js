const part1 = async input => {
    let [depth, target] = input.split('\n').map(element => element.split(': ')[1]);
    depth = parseInt(depth);
    target = target.split(',').map(num => parseInt(num));

    let cave = {};

    let risk = 0;
    for (let y = 0; y <= target[1]; y++) {
        for (let x = 0; x <= target[0]; x++) {
            let index = 0;
            if ((x == 0 && y == 0) || (x == target[0] && y == target[1])) index = 0;
            else if (x == 0) index = y * 48271;
            else if (y == 0) index = x * 16807;
            else index = cave[`${x - 1},${y}`] * cave[`${x},${y - 1}`];

            cave[`${x},${y}`] = (index + depth) % 20183;
            risk += cave[`${x},${y}`] % 3; 
        }
    }
    return risk;
}

const part2 = async input => {
    let [depth, target] = input.split('\n').map(element => element.split(': ')[1]);
    depth = parseInt(depth);
    target = target.split(',').map(num => parseInt(num));

    let cave = {};

    for (let y = 0; y < target[1] * 3; y++) {
        let row = ''
        for (let x = 0; x < target[0] * 3; x++) {
            let index = 0;
            if ((x == 0 && y == 0) || (x == target[0] && y == target[1])) index = 0;
            else if (x == 0) index = y * 48271;
            else if (y == 0) index = x * 16807;
            else index = cave[`${x - 1},${y}`] * cave[`${x},${y - 1}`];

            cave[`${x},${y}`] = (index + depth) % 20183;
            row += ['.', '=', '|'][cave[`${x},${y}`] % 3];
        }
        console.log(row);
    }

    let tools = [['torch', 'climbing_gear'], ['nothing', 'climbing_gear'], ['torch', 'nothing']];

    let shortest = Infinity;
    let queue = [];
    let visited = [`0,0`];

    queue.push({ path: [{ x: 0, y: 0 }], switches: 0, tool: 'torch' });

    while (queue.length > 0) {
        let current = queue.shift();
        let position = current.path[current.path.length - 1];

        let directions = [
            { x: position.x + 1, y: position.y },
            { x: position.x, y: position.y + 1 },
            { x: position.x - 1, y: position.y },
            { x: position.x, y: position.y - 1 }
        ];

        for (let direction of directions) {
            if (direction.x == target[0] && direction.y == target[1]) {
                if (current.tool != 'torch') current.switches++;
                console.log(current.path.length + current.switches * 7)
                shortest = Math.min(current.path.length + current.switches * 7, shortest);
            }

            if (direction.x < 0 || direction.x >= (target[0] * 3) ||
                direction.y < 0 || direction.y >= (target[1] * 3) ||
                visited.includes(`${direction.x},${direction.y}`)) {
                continue;
            }

            visited.push(`${direction.x},${direction.y}`);
            if (!tools[cave[`${direction.x},${direction.y}`] % 3].includes(current.tool)) {
                let newPath1 = JSON.parse(JSON.stringify(current));
                newPath1.tool = tools[cave[`${direction.x},${direction.y}`] % 3][0];
                newPath1.switches++;
                newPath1.path.push(direction);
                queue.push(newPath1);

                let newPath2 = JSON.parse(JSON.stringify(current));
                newPath2.tool = tools[cave[`${direction.x},${direction.y}`] % 3][1];
                newPath2.switches++;
                newPath2.path.push(direction);
                queue.push(newPath2);
            } else {
                let newPath = JSON.parse(JSON.stringify(current));
                newPath.path.push(direction);
                queue.push(newPath);
            }
        }
        // console.log(queue);
    }

    return shortest;
}

export { part1, part2 };