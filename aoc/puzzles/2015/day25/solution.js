const part1 = async input => {
    let needed = { x: 3019, y: 3010 };
    let position = { x: 1, y: 1 };

    let layer = 1;
    let number = 20151125;
    while (true) {
        if (position.y == 1) {
            layer++;
            position = { x: 1, y: layer };
        } else {
            position.x++;
            position.y--;
        }

        number = (number * 252533) % 33554393;

        if (position.x == needed.x && position.y == needed.y) break;
    }
    return number;
}

const part2 = async input => {
    return '2015 DONE!';
}

export { part1, part2 };