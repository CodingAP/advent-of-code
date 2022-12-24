const part1 = async input => {
    let elves = input.split('\n').reduce((array, line, row) => {
        line.split('').forEach((character, col) => {
            if (character == '#') array.push(`${col},${row}`);
        });
        return array;
    }, []);

    let order = ['north', 'south', 'west', 'east'];
    let directions = {
        north: { direction: { x: 0, y: -1 }, check: [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }] },
        south: { direction: { x: 0, y: 1 }, check: [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }] },
        west: { direction: { x: -1, y: 0 }, check: [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }] },
        east: { direction: { x: 1, y: 0 }, check: [{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }] }
    };

    for (let i = 0; i < 10; i++) {
        let newElves = [];
        elves.forEach((elf, index) => {
            let [x, y] = elf.split(',').map(num => parseInt(num));
            let moved = false;

            let noone = true;
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    if (i == 0 && j == 0) continue;

                    if (elves.includes(`${x + i},${y + j}`)) noone = false;
                }
            }

            if (noone) {
                newElves[index] = elf;
                return;
            }

            for (let o = 0; o < order.length; o++) {
                let occupied = directions[order[o]].check.reduce((flag, direction) => {
                    if (elves.includes(`${x + direction.x},${y + direction.y}`)) return true;
                    return flag;
                }, false);

                if (!occupied) {
                    newElves[index] = `${x + directions[order[o]].direction.x},${y + directions[order[o]].direction.y}`;
                    moved = true;
                    break;
                }
            }
            if (!moved) newElves[index] = elf;
        });

        newElves = newElves.map((elf, index) => {
            if (newElves.filter(other => elf == other).length > 1) return elves[index];
            return elf;
        });

        elves = newElves;
        order.push(order.shift());
    }

    let coords = elves.map(elf => elf.split(',').map(num => parseInt(num)));
    let minX = coords.reduce((min, elf) => Math.min(elf[0], min), Infinity);
    let maxX = coords.reduce((max, elf) => Math.max(elf[0], max), -Infinity);
    let minY = coords.reduce((min, elf) => Math.min(elf[1], min), Infinity);
    let maxY = coords.reduce((max, elf) => Math.max(elf[1], max), -Infinity);
    return (maxX - minX + 1) * (maxY - minY + 1) - elves.length;
}

const part2 = async input => {
    let elves = input.split('\n').reduce((array, line, row) => {
        line.split('').forEach((character, col) => {
            if (character == '#') array.push(`${col},${row}`);
        });
        return array;
    }, []);

    let order = ['north', 'south', 'west', 'east'];
    let directions = {
        north: { direction: { x: 0, y: -1 }, check: [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }] },
        south: { direction: { x: 0, y: 1 }, check: [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }] },
        west: { direction: { x: -1, y: 0 }, check: [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }] },
        east: { direction: { x: 1, y: 0 }, check: [{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }] }
    };

    let round = 0;
    while (true) {
        round++;

        let newElves = [];
        elves.forEach((elf, index) => {
            let [x, y] = elf.split(',').map(num => parseInt(num));
            let moved = false;

            let noone = true;
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    if (i == 0 && j == 0) continue;

                    if (elves.includes(`${x + i},${y + j}`)) noone = false;
                }
            }

            if (noone) {
                newElves[index] = elf;
                return;
            }

            for (let o = 0; o < order.length; o++) {
                let occupied = directions[order[o]].check.reduce((flag, direction) => {
                    if (elves.includes(`${x + direction.x},${y + direction.y}`)) return true;
                    return flag;
                }, false);

                if (!occupied) {
                    newElves[index] = `${x + directions[order[o]].direction.x},${y + directions[order[o]].direction.y}`;
                    moved = true;
                    break;
                }
            }
            if (!moved) newElves[index] = elf;
        });

        newElves = newElves.map((elf, index) => {
            if (newElves.filter(other => elf == other).length > 1) return elves[index];
            return elf;
        });

        if (JSON.stringify(elves) == JSON.stringify(newElves)) return round;
        elves = newElves;
        order.push(order.shift());
    }
}

export { part1, part2 };