const part1 = async input => {
    let clay = input.split('\n').reduce((set, line) => {
        let [solid, range] = line.split(', ');
        solid = solid.split('=');
        range = range.split('=');
        let [min, max] = range[1].split('..').map(num => parseInt(num));
        
        for (let i = min; i <= max; i++) {
            let position = { x: 0, y: 0 };
            position[solid[0]] = parseInt(solid[1]);
            position[range[0]] = i;
            set.add(`${position.x},${position.y}`);
        }

        return set;
    }, new Set());

    let water = { x: 0, y: 0 };
    while (true) {
        while (true) {
            
        }
    }
    return 0;
}

const part2 = async input => {
    return 0;
}

export { part1, part2 };