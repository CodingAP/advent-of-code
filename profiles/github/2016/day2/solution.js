const part1 = async input => {
    let keyPad = [
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9'
    ];

    let directions = {
        L: { x: -1, y: 0 },
        R: { x: 1, y: 0 },
        U: { x: 0, y: -1 },
        D: { x: 0, y: 1 }
    }

    return input.split('\n').reduce((string, line) => {
        let final = line.split('').reduce((position, direction) => {
            position.x = Math.min(Math.max(position.x + directions[direction].x, 0), Math.sqrt(keyPad.length) - 1);
            position.y = Math.min(Math.max(position.y + directions[direction].y, 0), Math.sqrt(keyPad.length) - 1);
            return position;
        }, { x: keyPad.indexOf('5') % Math.sqrt(keyPad.length), y: Math.floor(keyPad.indexOf('5') / Math.sqrt(keyPad.length)) })
        
        string += keyPad[final.y * Math.sqrt(keyPad.length) + final.x];
        return string;
    }, '');
}

const part2 = async input => {
    let keyPad = [
        ' ', ' ', '1', ' ', ' ',
        ' ', '2', '3', '4', ' ',
        '5', '6', '7', '8', '9',
        ' ', 'A', 'B', 'C', ' ',
        ' ', ' ', 'D', ' ', ' '
    ];

    let directions = {
        L: { x: -1, y: 0 },
        R: { x: 1, y: 0 },
        U: { x: 0, y: -1 },
        D: { x: 0, y: 1 }
    }

    return input.split('\n').reduce((string, line) => {
        let final = line.split('').reduce((position, direction) => {
            let newX = Math.min(Math.max(position.x + directions[direction].x, 0), Math.sqrt(keyPad.length) - 1);
            let newY = Math.min(Math.max(position.y + directions[direction].y, 0), Math.sqrt(keyPad.length) - 1);

            if (keyPad[newY * Math.sqrt(keyPad.length) + newX] != ' ') position = { x: newX, y: newY };
            return position;
        }, { x: keyPad.indexOf('5') % Math.sqrt(keyPad.length), y: Math.floor(keyPad.indexOf('5') / Math.sqrt(keyPad.length)) })

        string += keyPad[final.y * Math.sqrt(keyPad.length) + final.x];
        return string;
    }, '');
}

export { part1, part2 };