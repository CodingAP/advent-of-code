const part1 = async input => {
    let [map, movement] = input.split('\n\n');

    let coords = {};
    map.split('\n').forEach((line, row) => line.split('').forEach((character, col) => {
        if (character != ' ') coords[`${col},${row}`] = character;
    }));

    let coordKeys = Object.keys(coords).map(coord => coord.split(',').map(num => parseInt(num)));
    let smallest = coordKeys.reduce((min, [x, y]) => (y == 0) ? Math.min(x, min) : min, Infinity);
    let position = { x: smallest, y: 0 };
    let direction = 0;

    let directions = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];

    let amount = '';
    for (let i = 0; i < movement.length; i++) {
        if (movement[i].match(/[LR]/g) || i == movement.length - 1) {
            for (let i = 0; i < parseInt(amount); i++) {
                let newPosition = { x: position.x + directions[direction].x, y: position.y + directions[direction].y };
                if (coords[`${newPosition.x},${newPosition.y}`] == null) {
                    if (direction == 0) newPosition.x = coordKeys.reduce((min, [x, y]) => (y == newPosition.y) ? Math.min(x, min) : min, Infinity);
                    if (direction == 1) newPosition.y = coordKeys.reduce((min, [x, y]) => (x == newPosition.x) ? Math.min(y, min) : min, Infinity);
                    if (direction == 2) newPosition.x = coordKeys.reduce((max, [x, y]) => (y == newPosition.y) ? Math.max(x, max) : max, -Infinity);
                    if (direction == 3) newPosition.y = coordKeys.reduce((max, [x, y]) => (x == newPosition.x) ? Math.max(y, max) : max, -Infinity);
                }

                if (coords[`${newPosition.x},${newPosition.y}`] != '#') position = newPosition;
                else break;
            }

            if (i != movement.length - 1) direction = (direction + ((movement[i] == 'L') ? 3 : 1)) % directions.length;
            amount = '';
        } else amount += movement[i];
    }

    return 1000 * (position.y + 1) + 4 * (position.x + 1) + direction;
}

const part2 = async input => {
    let [map, movement] = input.split('\n\n');
    map = map.split('\n');
    let faceSize = 50;

    let faces = [];
    for (let y = 0; y < map.length / faceSize; y++) {
        for (let x = 0; x < map[y].length / faceSize; x++) {
            if (map[y * faceSize][x * faceSize] && map[y * faceSize][x * faceSize] != ' ') {
                let face = [];
                for (let j = 0; j < faceSize; j++) {
                    let row = [];
                    for (let i = 0; i < faceSize; i++) {
                        row.push(map[y * faceSize + j][x * faceSize + i]);
                    }
                    face.push(row);
                }

                faces.push(face);
            }
        }
    }

    let rules = {
        0: {
            up: { face: 5, direction: 0, mapping: (x, y, faceSize) => { return { x: 0, y: faceSize - x } } },
            right: { face: 1, direction: 0, mapping: (x, y, faceSize) => { return { x: 0, y } } },
            down: { face: 2, direction: 1, mapping: (x, y, faceSize) => { return { x, y: 0 } } },
            left: { face: 3, direction: 0, mapping: (x, y, faceSize) => { return { x: 0, y } } },
        },
        1: {
            up: { face: 5, direction: 3, mapping: (x, y, faceSize) => { return { x, y: faceSize - 1 } } },
            right: { face: 4, direction: 2, mapping: (x, y, faceSize) => { return { x: faceSize - 1, y } } },
            down: { face: 2, direction: 2, mapping: (x, y, faceSize) => { return { x: faceSize - 1, y: faceSize - x } } },
            left: { face: 0, direction: 2, mapping: (x, y, faceSize) => { return { x: faceSize - 1, y } } },
        },
        2: {
            up: { face: 0, direction: 3, mapping: (x, y, faceSize) => { return { x, y: faceSize - 1 } } },
            right: { face: 1, direction: 3, mapping: (x, y, faceSize) => { return { x: y, y: faceSize - 1 } } },
            down: { face: 4, direction: 1, mapping: (x, y, faceSize) => { return { x, y: 0 } } },
            left: { face: 3, direction: 1, mapping: (x, y, faceSize) => { return { x: faceSize - y, y: 0 } } },
        },
        3: {
            up: { face: 2, direction: 0, mapping: (x, y, faceSize) => { return { x: 0, y: x } } },
            right: { face: 4, direction: 0, mapping: (x, y, faceSize) => { return { x: 0, y } } },
            down: { face: 5, direction: 1, mapping: (x, y, faceSize) => { return { x, y: 0 } } },
            left: { face: 0, direction: 0, mapping: (x, y, faceSize) => { return { x: 0, y } } },
        },
        4: {
            up: { face: 2, direction: 3, mapping: (x, y, faceSize) => { return { x, y: faceSize - 1 } } },
            right: { face: 1, direction: 2, mapping: (x, y, faceSize) => { return { x: faceSize - 1, y } } },
            down: { face: 5, direction: 2, mapping: (x, y, faceSize) => { return { x: faceSize - y, y: faceSize - 1 } } },
            left: { face: 3, direction: 2, mapping: (x, y, faceSize) => { return { x: faceSize - 1, y } } },
        },
        5: {
            up: { face: 3, direction: 3, mapping: (x, y, faceSize) => { return { x, y: faceSize - 1 } } },
            right: { face: 4, direction: 3, mapping: (x, y, faceSize) => { return { x: y, y: faceSize - 1 } } },
            down: { face: 1, direction: 1, mapping: (x, y, faceSize) => { return { x, y: 0 } } },
            left: { face: 0, direction: 1, mapping: (x, y, faceSize) => { return { x: y, y: 0 } } },
        }
    }

    let current = {
        position: { x: 0, y: 0 },
        direction: 0,
        face: 0
    };

    let directions = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];

    let amount = '';
    for (let i = 0; i < movement.length; i++) {
        if (movement[i].match(/[LR]/g) || i == movement.length - 1) {
            for (let i = 0; i < parseInt(amount); i++) {
                let updated = {
                    position: { x: current.position.x + directions[current.direction].x, y: current.position.y + directions[current.direction].y },
                    direction: current.direction,
                    face: current.face
                };

                if (updated.position.x < 0) {
                    updated.face = rules[updated.face].right.face;
                    updated.direction = rules[updated.face].right.direction;
                    updated.position = rules[updated.face].right.mapping(updated.position.x, updated.position.y, faceSize);
                } else if (updated.position.x >= faceSize) {
                    updated.face = rules[updated.face].left.face;
                    updated.direction = rules[updated.face].left.direction;
                    updated.position = rules[updated.face].left.mapping(updated.position.x, updated.position.y, faceSize);
                } else if (updated.position.y < 0) {
                    updated.face = rules[updated.face].up.face;
                    updated.direction = rules[updated.face].up.direction;
                    updated.position = rules[updated.face].up.mapping(updated.position.x, updated.position.y, faceSize);
                } else if (updated.position.y >= faceSize) {
                    updated.face = rules[updated.face].down.face;
                    updated.direction = rules[updated.face].down.direction;
                    updated.position = rules[updated.face].down.mapping(updated.position.x, updated.position.y, faceSize);
                }

                if (faces[updated.face][updated.position.y][updated.position.x] == '.') current = updated;
                else break;
            }

            if (i != movement.length - 1) current.direction = (current.direction + ((movement[i] == 'L') ? 3 : 1)) % directions.length;
            amount = '';
        } else amount += movement[i];
    }

    let offsets = {
        0: { x: faceSize, y: 0 },
        1: { x: faceSize * 2, y: 0 },
        2: { x: faceSize, y: faceSize },
        3: { x: 0, y: faceSize * 2 },
        4: { x: faceSize, y: faceSize * 2 },
        5: { x: 0, y: faceSize * 3 },
    }

    return 1000 * (offsets[current.face].y + current.position.y + 1) + 4 * (offsets[current.face].x + current.position.x + 1) + current.direction;
}

export { part1, part2 };