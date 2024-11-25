const part1 = async input => {
    let wires = input.split('\n').reduce((wires, element) => {
        wires.push(element.split(',').map(direction => {
            return { direction: direction[0], steps: parseInt(direction.slice(1)) };
        }));
        return wires;
    }, []);

    wires = wires.map(wire => {
        let locations = new Set();
        let position = { x: 0, y: 0 };
        for (let i = 0; i < wire.length; i++) {
            for (let step = 0; step < wire[i].steps; step++) {
                switch (wire[i].direction) {
                    case 'L':
                        position.x++;
                        break;
                    case 'D':
                        position.y--;
                        break;
                    case 'R':
                        position.x--;
                        break;
                    case 'U':
                        position.y++;
                        break;
                }
                locations.add(`${position.x},${position.y}`);
            }
        }
        return locations;
    });

    return [...wires[0]]
        .filter(i => wires[1].has(i))
        .reduce((smallest, intersection) => {
        let [x, y] = intersection.split(',').map(num => parseInt(num));
        return Math.min(smallest, Math.abs(x) + Math.abs(y));
    }, Infinity);
}

const part2 = async input => {
    let wires = input.split('\n').reduce((wires, element) => {
        wires.push(element.split(',').map(direction => {
            return { direction: direction[0], steps: parseInt(direction.slice(1)) };
        }));
        return wires;
    }, []);

    wires = wires.map(wire => {
        let locations = {};
        let position = { x: 0, y: 0 };
        let totalSteps = 0;
        for (let i = 0; i < wire.length; i++) {
            for (let step = 0; step < wire[i].steps; step++) {
                totalSteps++;
                switch (wire[i].direction) {
                    case 'L':
                        position.x++;
                        break;
                    case 'D':
                        position.y--;
                        break;
                    case 'R':
                        position.x--;
                        break;
                    case 'U':
                        position.y++;
                        break;
                }
                if (locations[`${position.x},${position.y}`] == null) locations[`${position.x},${position.y}`] = Infinity;
                locations[`${position.x},${position.y}`] = Math.min(locations[`${position.x},${position.y}`], totalSteps);
            }
        }
        return locations;
    });

    return Object.keys(wires[0])
        .filter(element => wires[1][element])
        .reduce((smallest, intersection) => Math.min(smallest, wires[0][intersection] + wires[1][intersection]), Infinity);
}

export { part1, part2 };