const part1 = async input => {
    let direction = 0;
    let directions = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }];
    
    let position = input.split(', ').reduce((position, line) => {
        direction = (direction + ((line[0] == 'L') ? directions.length - 1 : 1)) % directions.length;

        position.x += directions[direction].x * parseInt(line.slice(1));
        position.y += directions[direction].y * parseInt(line.slice(1));
        return position;
    }, { x: 0, y: 0 });

    return Math.abs(position.x) + Math.abs(position.y);
}

const part2 = async input => {
    let position = { x: 0, y: 0 };
    let direction = 0;
    let directions = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }];

    let previous = [];
    let moves = input.split(', ');
    for (let move of moves) {
        direction = (direction + ((move[0] == 'L') ? directions.length - 1 : 1)) % directions.length;

        for (let step = 0; step < parseInt(move.slice(1)); step++) {
            position.x += directions[direction].x;
            position.y += directions[direction].y;
        
            if (previous.includes(`${position.x},${position.y}`)) return Math.abs(position.x) + Math.abs(position.y);
            else previous.push(`${position.x},${position.y}`);
        }
    }
}

export { part1, part2 };