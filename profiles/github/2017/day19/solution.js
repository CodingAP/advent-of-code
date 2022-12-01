const part1 = async input => {
    let rows = input.split('\n');
    let position = { x: rows[0].indexOf('|'), y: 0 };
    let directionVectors = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
    let direction = 2;
    
    let string = '';
    while (rows[position.y][position.x] != ' ') {
        position.x += directionVectors[direction].x;
        position.y += directionVectors[direction].y;

        if (rows[position.y][position.x] == '+') {
            let otherDirection = { x: position.x + directionVectors[(direction + 1) % directionVectors.length].x, y: position.y + directionVectors[(direction + 1) % directionVectors.length].y };
            if (otherDirection.x >= 0 && otherDirection.x < rows[position.y].length && otherDirection.y >= 0 && otherDirection.y < rows.length &&
                rows[otherDirection.y][otherDirection.x] != ' ') {
                direction = (direction + 1) % directionVectors.length;
            } else {
                direction--;
                if (direction < 0) direction = directionVectors.length - 1;
            }
        } else if (rows[position.y][position.x].match(/[A-Z]/g)) string += rows[position.y][position.x];
    }
    return string;
}

const part2 = async input => {
    let rows = input.split('\n');
    let position = { x: rows[0].indexOf('|'), y: 0 };
    let directionVectors = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
    let direction = 2;

    let steps = 0;
    while (rows[position.y][position.x] != ' ') {
        position.x += directionVectors[direction].x;
        position.y += directionVectors[direction].y;
        steps++;

        if (rows[position.y][position.x] == '+') {
            let otherDirection = { x: position.x + directionVectors[(direction + 1) % directionVectors.length].x, y: position.y + directionVectors[(direction + 1) % directionVectors.length].y };
            if (otherDirection.x >= 0 && otherDirection.x < rows[position.y].length && otherDirection.y >= 0 && otherDirection.y < rows.length &&
                rows[otherDirection.y][otherDirection.x] != ' ') {
                direction = (direction + 1) % directionVectors.length;
            } else {
                direction--;
                if (direction < 0) direction = directionVectors.length - 1;
            }
        }
    }
    return steps;
}

export { part1, part2 };