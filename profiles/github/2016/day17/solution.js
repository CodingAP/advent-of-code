import crypto from 'crypto';

const part1 = async input => {
    let finalPath = '';
    let queue = [{ path: [{ x: 0, y: 0 }], hash: input }];

    while (queue.length > 0 && finalPath == '') {
        let current = queue.shift();
        let position = current.path[current.path.length - 1];

        let directionMappings = { U: { x: 0, y: -1 }, D: { x: 0, y: 1 }, L: { x: -1, y: 0 }, R: { x: 1, y: 0 } };
        let directions = crypto.createHash('md5').update(current.hash).digest('hex').slice(0, 4).split('').map((letter, index) => {
            if (letter.match(/[bcdef]/g)) return ['U', 'D', 'L', 'R'][index];
            return null;
        });

        for (let direction of directions) {
            if (direction == null) continue;
            let newPosition = { x: position.x + directionMappings[direction].x, y: position.y + directionMappings[direction].y };
            if (newPosition.x == 3 && newPosition.y == 3) finalPath = (current.hash + direction).slice(input.length);

            if (newPosition.x < 0 || newPosition.x >= 4 ||
                newPosition.y < 0 || newPosition.y >= 4) {
                continue;
            }

            queue.push({ path: current.path.concat([newPosition]), hash: current.hash + direction });
        }
    }

    return finalPath;
}

const part2 = async input => {
    let queue = [{ path: [{ x: 0, y: 0 }], hash: input }];
    let longest = -Infinity;

    while (queue.length > 0) {
        let current = queue.shift();
        let position = current.path[current.path.length - 1];

        let directionMappings = { U: { x: 0, y: -1 }, D: { x: 0, y: 1 }, L: { x: -1, y: 0 }, R: { x: 1, y: 0 } };
        let directions = crypto.createHash('md5').update(current.hash).digest('hex').slice(0, 4).split('').map((letter, index) => {
            if (letter.match(/[bcdef]/g)) return ['U', 'D', 'L', 'R'][index];
            return null;
        });

        for (let direction of directions) {
            if (direction == null) continue;
            let newPosition = { x: position.x + directionMappings[direction].x, y: position.y + directionMappings[direction].y };
            if (newPosition.x == 3 && newPosition.y == 3) longest = Math.max((current.hash + direction).length - input.length, longest); else {
                if (newPosition.x < 0 || newPosition.x >= 4 ||
                    newPosition.y < 0 || newPosition.y >= 4) {
                    continue;
                }

                queue.push({ path: current.path.concat([newPosition]), hash: current.hash + direction });
            }
        }
    }

    return longest;
}

export { part1, part2 };