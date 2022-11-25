const part1 = async input => {
    const rows = input.split('\n');

    let position = { x: 0, y: 0 };
    let slope = { x: 3, y: 1 };

    let trees = 0;
    while (position.y < rows.length) {
        if (rows[position.y][position.x] == '#') trees++;

        position.x = (position.x + slope.x) % rows[position.y].length;
        position.y += slope.y;
    }

    return trees;
}

const part2 = async input => {
    const rows = input.split('\n');

    let slopes = [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 }, { x: 7, y: 1 }, { x: 1, y: 2 }];

    let treeCollisions = slopes.map(slope => {
        let trees = 0;
        let position = { x: 0, y: 0 };
        while (position.y < rows.length) {
            if (rows[position.y][position.x] == '#') trees++;

            position.x = (position.x + slope.x) % rows[position.y].length;
            position.y += slope.y;
        }
        return trees;
    });

    return treeCollisions.reduce((acc, num) => acc * num, 1);
}

export { part1, part2 }; 