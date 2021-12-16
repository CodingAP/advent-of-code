const common = require('../../../scripts/common');

module.exports = input => {
    let rows = input.split('\n');
    let wires = common.create2DArray(rows[0].length, rows.length, (x, y) => {
        return rows[y][x];
    });
    console.log(rows);
    
    let position = { x: 5, y: 0 };
    let direction = 2;
    let letters = '';

    console.log(wires)
    for (let i = 0; i < 10000000; i++) {
        switch (direction) {
            case 0:
                position.y--;
                break;
            case 1:
                position.x++;
                break;
            case 2:
                position.y++;
                break;
            case 3:
                position.x--;
                break;
        }

        // console.log(wires[position.y][position.x]);
        // console.log(direction);

        if (wires[position.y][position.x] == '+') {
            // console.log(position.x, position.y, direction);
            // console.log(`U: ${wires[position.y - 1][position.x]}, D: ${wires[position.y + 1][position.x]}, L: ${wires[position.y][position.x - 1]}, R: ${wires[position.y][position.x + 1]}`);
            if (position.y - 1 >= 0 && wires[position.y - 1][position.x] == '|' && direction != 2) direction = 0;
            if (position.y + 1 < rows.length && wires[position.y + 1][position.x] == '|' && direction != 0) direction = 2;
            if (position.x - 1 >= 0 && wires[position.y][position.x - 1] == '-' && direction != 1) direction = 3;
            if (position.x + 1 < rows[0].length && wires[position.y][position.x + 1] == '-' && direction != 3) direction = 1;
            // console.log(direction);
        } else if (wires[position.y][position.x] != '-' && wires[position.y][position.x] != '|') {
            console.log(wires[position.y][position.x]);
            letters += wires[position.y][position.x];
        }
    }
    return letters;
}