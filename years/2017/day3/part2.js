const input = require('fs').readFileSync('./years/2017/day3/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let values = { '0,0': 1 };
    let position = { x: 0, y: 0 };
    let dir = 0;
    let stepCount = 0;
    let stepDistance = 1;

    while (true) {
        for (let i = 0; i < stepDistance; i++) {
            switch (dir) {
                case 0:
                    position.x++;
                    break;
                case 1:
                    position.y++;
                    break;
                case 2:
                    position.x--;
                    break;
                case 3:
                    position.y--;
                    break;
            }

            let value = 0;
            for (let y = -1; y <= 1; y++) {
                for (let x = -1; x <= 1; x++) {
                    if (x == 0 && y == 0) continue;
                    let positionCoord = `${position.x + x},${position.y + y}`;
                    if (values[positionCoord] != null) value += values[positionCoord];
                }
            }
            values[`${position.x},${position.y}`] = value;

            if (value > parseInt(input)) return value;
        }

        dir = (dir + 1) % 4;
        stepCount++;
        if (stepCount == 2) {
            stepDistance++;
            stepCount = 0;
        }
    }
}