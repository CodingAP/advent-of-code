const part1 = async input => {
    let houses = { '0,0': 1 };
    let position = { x: 0, y: 0 };

    for (let i = 0; i < input.length; i++) {
        switch (input[i]) {
            case '^':
                position.y++;
                break;
            case '>':
                position.x++;
                break;
            case 'v':
                position.y--;
                break;
            case '<':
                position.x--;
                break;
        }

        if (houses[`${position.x},${position.y}`] == null) houses[`${position.x},${position.y}`] = 0;
        houses[`${position.x},${position.y}`]++;
    }

    return Object.keys(houses).length;
}

const part2 = async input => {
    let houses = { '0,0': 1 };
    let position1 = { x: 0, y: 0 };
    let position2 = { x: 0, y: 0 };

    for (let i = 0; i < input.length; i++) {
        let position = (i % 2 == 0) ? position1 : position2;
        switch (input[i]) {
            case '^':
                position.y++;
                break;
            case '>':
                position.x++;
                break;
            case 'v':
                position.y--;
                break;
            case '<':
                position.x--;
                break;
        }

        if (houses[`${position.x},${position.y}`] == null) houses[`${position.x},${position.y}`] = 0;
        houses[`${position.x},${position.y}`]++;
    }

    return Object.keys(houses).length;
}

export { part1, part2 }; 