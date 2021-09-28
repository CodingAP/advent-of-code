module.exports = input => {
    let x = 0, y = 0;
    let locations = { '0,0': 1 };

    for (let i = 0; i < input.length; i++) {
        switch (input.charAt(i)) {
            case '>':
                x++;
                break;
            case '^':
                y++;
                break;
            case 'v':
                y--;
                break;
            case '<':
                x--;
                break;
        }
        if (locations[`${x},${y}`] == null) locations[`${x},${y}`] = 0;
        locations[`${x},${y}`]++;
    }

    return Object.keys(locations).length;
}