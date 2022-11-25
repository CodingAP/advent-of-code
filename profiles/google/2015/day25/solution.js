const part1 = async input => {
    let tokens = input.split(' ');
    let neededPosition = { x: parseInt(tokens[18]), y: parseInt(tokens[16]) };
    let position = { x: 1, y: 1 };
    let level = 1;
    let num = 20151125;

    while (true) {
        if (position.y == 1) {
            level++;
            position.x = 1;
            position.y = level;
        } else {
            position.x++;
            position.y--;
        }

        num = (num * 252533) % 33554393;

        if (position.x == neededPosition.x && position.y == neededPosition.y) return num;
    }
}

const part2 = async input => {
    return '2015 DONE!';
}

export { part1, part2 }; 