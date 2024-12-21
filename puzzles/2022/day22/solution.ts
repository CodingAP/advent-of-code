/**
 * puzzles/2022/day22/solution.ts
 * 
 * ~~ Monkey Map ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
 */

type FaceChange = { direction: number, mapping: (x: number, y: number, faceSize: number) => { x: number, y: number } };

interface FaceMapping {
    [UP]: { face: number, direction: number };
    [DOWN]: { face: number, direction: number };
    [LEFT]: { face: number, direction: number };
    [RIGHT]: { face: number, direction: number };
}

const RIGHT = 0, DOWN = 1, LEFT = 2, UP = 3;
const DIRECTIONS: { x: number, y: number }[] = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];

const FACE_CHANGES: { [key: number]: { [key: number]: FaceChange } } = {
    [UP]: {
        [UP]: { direction: DOWN, mapping: (x, y, faceSize) => ({ x: faceSize - 1 - x, y: 0 }) },
        [DOWN]: { direction: UP, mapping: (x, y, faceSize) => ({ x, y: faceSize - 1 }) },
        [LEFT]: { direction: RIGHT, mapping: (x, y, faceSize) => ({ x: 0, y: x }) },
        [RIGHT]: { direction: LEFT, mapping: (x, y, faceSize) => ({ x: faceSize - 1, y: faceSize - 1 - x }) },
    },
    [DOWN]: {
        [UP]: { direction: DOWN, mapping: (x, y, faceSize) => ({ x, y: 0 }) },
        [DOWN]: { direction: UP, mapping: (x, y, faceSize) => ({ x: faceSize - 1 - x, y: faceSize - 1 }) },
        [LEFT]: { direction: RIGHT, mapping: (x, y, faceSize) => ({ x: 0, y: faceSize - 1 - x }) },
        [RIGHT]: { direction: LEFT, mapping: (x, y, faceSize) => ({ x: faceSize - 1, y: x }) },
    },
    [LEFT]: {
        [UP]: { direction: DOWN, mapping: (x, y, faceSize) => ({ x: y, y: 0 }) },
        [DOWN]: { direction: UP, mapping: (x, y, faceSize) => ({ x: faceSize - 1 - y, y: faceSize - 1 }) },
        [LEFT]: { direction: RIGHT, mapping: (x, y, faceSize) => ({ x: 0, y: faceSize - 1 - y }) },
        [RIGHT]: { direction: LEFT, mapping: (x, y, faceSize) => ({ x: faceSize - 1, y }) },
    },
    [RIGHT]: {
        [UP]: { direction: DOWN, mapping: (x, y, faceSize) => ({ x: faceSize - 1 - y, y: 0 }) },
        [DOWN]: { direction: UP, mapping: (x, y, faceSize) => ({ x: y, y: faceSize - 1 }) },
        [LEFT]: { direction: RIGHT, mapping: (x, y, faceSize) => ({ x: 0, y }) },
        [RIGHT]: { direction: LEFT, mapping: (x, y, faceSize) => ({ x: faceSize - 1, y: faceSize - 1 - y }) },
    }
}

/**
 * code for part 1 of the advent of code puzzle
 */
const part1 = (input: string) => {
    const [map, movement] = input.split('\n\n');

    const coords: { [key: string]: string } = {};
    map.split('\n').forEach((line, y) => line.split('').forEach((character, x) => {
        if (character != ' ') coords[`${x},${y}`] = character;
    }));

    const positions = Object.keys(coords).map(coord => coord.split(',').map(num => parseInt(num)));
    const smallest = positions.reduce((min, [x, y]) => (y == 0) ? Math.min(x, min) : min, Infinity);
    let position = { x: smallest, y: 0 };
    let direction = 0;

    let amount = '';
    for (let i = 0; i < movement.length; i++) {
        if (movement[i].match(/[LR]/g) || i == movement.length - 1) {
            for (let i = 0; i < parseInt(amount); i++) {
                const newPosition = { x: position.x + DIRECTIONS[direction].x, y: position.y + DIRECTIONS[direction].y };
                if (coords[`${newPosition.x},${newPosition.y}`] == null) {
                    if (direction == 0) newPosition.x = positions.reduce((min, [x, y]) => (y == newPosition.y) ? Math.min(x, min) : min, Infinity);
                    if (direction == 1) newPosition.y = positions.reduce((min, [x, y]) => (x == newPosition.x) ? Math.min(y, min) : min, Infinity);
                    if (direction == 2) newPosition.x = positions.reduce((max, [x, y]) => (y == newPosition.y) ? Math.max(x, max) : max, -Infinity);
                    if (direction == 3) newPosition.y = positions.reduce((max, [x, y]) => (x == newPosition.x) ? Math.max(y, max) : max, -Infinity);
                }

                if (coords[`${newPosition.x},${newPosition.y}`] != '#') position = newPosition;
                else break;
            }

            if (i != movement.length - 1) direction = (direction + ((movement[i] == 'L') ? 3 : 1)) % DIRECTIONS.length;
            amount = '';
        } else amount += movement[i];
    }

    return 1000 * (position.y + 1) + 4 * (position.x + 1) + direction;
}

/**
 * code for part 2 of the advent of code puzzle
 */
const part2 = (input: string) => {
    const parts = input.split('\n\n');
    const map = parts[0].split('\n');
    const movement = parts[1].trim();
    const FACE_SIZE = 50;
    const width = Math.max(...map.map(line => line.length)) / FACE_SIZE, height = map.length / FACE_SIZE;

    const faces = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (map[y * FACE_SIZE][x * FACE_SIZE] && map[y * FACE_SIZE][x * FACE_SIZE] != ' ') {
                let face = [];
                for (let j = 0; j < FACE_SIZE; j++) {
                    let row = [];
                    for (let i = 0; i < FACE_SIZE; i++) {
                        row.push(map[y * FACE_SIZE + j][x * FACE_SIZE + i]);
                    }
                    face.push(row);
                }

                faces.push(face);
            }
        }
    }

    const RULES: { [key: number]: FaceMapping } = {
        0: {
            [UP]: { face: 5, direction: LEFT },
            [DOWN]: { face: 2, direction: UP },
            [LEFT]: { face: 3, direction: LEFT },
            [RIGHT]: { face: 1, direction: LEFT },
        },
        1: {
            [UP]: { face: 5, direction: DOWN },
            [DOWN]: { face: 2, direction: RIGHT },
            [LEFT]: { face: 0, direction: RIGHT },
            [RIGHT]: { face: 4, direction: RIGHT },
        },
        2: {
            [UP]: { face: 0, direction: DOWN },
            [DOWN]: { face: 4, direction: UP },
            [LEFT]: { face: 3, direction: UP },
            [RIGHT]: { face: 1, direction: DOWN },
        },
        3: {
            [UP]: { face: 2, direction: LEFT },
            [DOWN]: { face: 5, direction: UP },
            [LEFT]: { face: 0, direction: LEFT },
            [RIGHT]: { face: 4, direction: LEFT },
        },
        4: {
            [UP]: { face: 2, direction: DOWN },
            [DOWN]: { face: 5, direction: RIGHT },
            [LEFT]: { face: 3, direction: RIGHT },
            [RIGHT]: { face: 1, direction: RIGHT },
        },
        5: {
            [UP]: { face: 3, direction: DOWN },
            [DOWN]: { face: 1, direction: UP },
            [LEFT]: { face: 0, direction: UP },
            [RIGHT]: { face: 4, direction: DOWN },
        },
    };

    let current = {
        position: { x: 0, y: 0 },
        direction: 0,
        face: 0
    };

    let amount = '';
    for (let i = 0; i < movement.length; i++) {
        if (movement[i].match(/[LR]/g) || i === movement.length - 1) {
            if (i === movement.length - 1) amount += movement[i];
            for (let i = 0; i < parseInt(amount); i++) {
                let updated = {
                    position: { x: current.position.x + DIRECTIONS[current.direction].x, y: current.position.y + DIRECTIONS[current.direction].y },
                    direction: current.direction,
                    face: current.face
                };

                if (updated.position.x < 0) {
                    updated.direction = FACE_CHANGES[LEFT][RULES[updated.face][LEFT].direction].direction;
                    updated.position = FACE_CHANGES[LEFT][RULES[updated.face][LEFT].direction].mapping(updated.position.x, updated.position.y, FACE_SIZE);
                    updated.face = RULES[updated.face][LEFT].face;
                } else if (updated.position.x >= FACE_SIZE) {
                    updated.direction = FACE_CHANGES[RIGHT][RULES[updated.face][RIGHT].direction].direction;
                    updated.position = FACE_CHANGES[RIGHT][RULES[updated.face][RIGHT].direction].mapping(updated.position.x, updated.position.y, FACE_SIZE);
                    updated.face = RULES[updated.face][RIGHT].face;
                } else if (updated.position.y < 0) {
                    updated.direction = FACE_CHANGES[UP][RULES[updated.face][UP].direction].direction;
                    updated.position = FACE_CHANGES[UP][RULES[updated.face][UP].direction].mapping(updated.position.x, updated.position.y, FACE_SIZE);
                    updated.face = RULES[updated.face][UP].face;
                } else if (updated.position.y >= FACE_SIZE) {
                    updated.direction = FACE_CHANGES[DOWN][RULES[updated.face][DOWN].direction].direction;
                    updated.position = FACE_CHANGES[DOWN][RULES[updated.face][DOWN].direction].mapping(updated.position.x, updated.position.y, FACE_SIZE);
                    updated.face = RULES[updated.face][DOWN].face;
                }

                if (faces[updated.face][updated.position.y][updated.position.x] === '.') current = updated;
                else break;
            }

            if (i != movement.length - 1) current.direction = (current.direction + ((movement[i] === 'L') ? 3 : 1)) % DIRECTIONS.length;
            amount = '';
        } else amount += movement[i];
    }

    const OFFSETS: { [key: number]: { x: number, y: number } } = {
        0: { x: FACE_SIZE, y: 0 },
        1: { x: FACE_SIZE * 2, y: 0 },
        2: { x: FACE_SIZE, y: FACE_SIZE },
        3: { x: 0, y: FACE_SIZE * 2 },
        4: { x: FACE_SIZE, y: FACE_SIZE * 2 },
        5: { x: 0, y: FACE_SIZE * 3 },
    }

    return 1000 * (OFFSETS[current.face].y + current.position.y + 1) + 4 * (OFFSETS[current.face].x + current.position.x + 1) + current.direction;
}

export { part1, part2 };