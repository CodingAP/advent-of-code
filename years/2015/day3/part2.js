module.exports = input => {
    let santa = { x: 0, y: 0 }, robo = { x: 0, y: 0 };
    let locations = { '0,0': 1 };

    for (let i = 0; i < input.length; i++) {
        let current = (i % 2 == 0) ? santa : robo;
        switch (input.charAt(i)) {
            case '>':
                current.x++;
                break;
            case '^':
                current.y++;
                break;
            case 'v':
                current.y--;
                break;
            case '<':
                current.x--;
                break;
        }
        let newLocation = `${current.x},${current.y}`;
        if (locations[newLocation] == null) locations[newLocation] = 0;
        locations[newLocation]++;
    }

    return Object.keys(locations).length;
}