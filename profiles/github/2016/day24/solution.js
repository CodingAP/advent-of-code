import { permutation } from '../../../../scripts/common.js';

const bfs = (grid, starting, ending) => {
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
    let positions = [];
    let rows = input.split('\n').map((row, y) => row.split('').map((element, x) => {
        if (element.match(/[0-9]/g)) {
            positions[parseInt(element)] = { x, y };
            return '.';
        } else return element;
    }));

    let distances = new Array(positions.length).fill(0).map((element, index) => {
        let current = [];
        for (let i = 0; i < positions.length; i++) {
            current.push(bfs(rows, positions[index], positions[i]).length - 1);
        }
        return current;
    });

    return permutation(new Array(positions.length - 1).fill(0).map((element, index) => index + 1)).map(element => {
        element.unshift(0);
        return element;
    }).reduce((lowest, path) => {
        let steps = 0;
        for (let i = 1; i < path.length; i++) steps += distances[path[i - 1]][path[i]];
        return Math.min(steps, lowest);
    }, Infinity);
}

const part2 = async input => {
    let positions = [];
    let rows = input.split('\n').map((row, y) => row.split('').map((element, x) => {
        if (element.match(/[0-9]/g)) {
            positions[parseInt(element)] = { x, y };
            return '.';
        } else return element;
    }));

    let distances = new Array(positions.length).fill(0).map((element, index) => {
        let current = [];
        for (let i = 0; i < positions.length; i++) {
            current.push(bfs(rows, positions[index], positions[i]).length - 1);
        }
        return current;
    });

    return permutation(new Array(positions.length - 1).fill(0).map((element, index) => index + 1)).map(element => {
        element.unshift(0);
        element.push(0);
        return element;
    }).reduce((lowest, path) => {
        let steps = 0;
        for (let i = 1; i < path.length; i++) steps += distances[path[i - 1]][path[i]];
        return Math.min(steps, lowest);
    }, Infinity);
}

export { part1, part2 };