const common = require('../../../scripts/common');

module.exports = input => {
    let rows = input.split('\n');
    let seaCucumbers = {
        right: [],
        down: []
    };

    common.forEach2DArray(rows, (value, x, y) => {
        if (value != '.') seaCucumbers[(value == '>') ? 'right' : 'down'].push(`${x},${y}`);
    });

    let finished = false;
    let step = 0;
    while (!finished) {
        finished = true;
        let newSeaCucumbers = {
            right: [],
            down: []
        };
        
        for (let i = 0; i < seaCucumbers.right.length; i++) {
            let [x, y] = common.parseListToInt(seaCucumbers.right[i], ',');
            let newPosition = `${(x + 1) % rows[0].length},${y}`;
            if (!seaCucumbers.right.includes(newPosition) && !seaCucumbers.down.includes(newPosition)) newSeaCucumbers.right[i] = newPosition;
            else newSeaCucumbers.right[i] = seaCucumbers.right[i];
        }

        if (!common.arrayEquals(seaCucumbers.right, newSeaCucumbers.right, false)) finished = false;
        seaCucumbers.right = newSeaCucumbers.right;

        for (let i = 0; i < seaCucumbers.down.length; i++) {
            let [x, y] = common.parseListToInt(seaCucumbers.down[i], ',');
            let newPosition = `${x},${(y + 1) % rows.length}`;
            if (!seaCucumbers.right.includes(newPosition) && !seaCucumbers.down.includes(newPosition)) newSeaCucumbers.down[i] = newPosition;
            else newSeaCucumbers.down[i] = seaCucumbers.down[i];
        }

        if (!common.arrayEquals(seaCucumbers.down, newSeaCucumbers.down, false)) finished = false;
        seaCucumbers.down = newSeaCucumbers.down;

        step++;
    }

    return step;
}