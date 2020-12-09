const input = require('fs').readFileSync('./years/2017/day3/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let position = { x: 0, y: 0 };
    let dir = 0;
    let index = 1;
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
            index++;
            if (index == parseInt(input)) return Math.abs(position.x) + Math.abs(position.y);
        }

        dir = (dir + 1) % 4;
        stepCount++;
        if (stepCount == 2) {
            stepDistance++;
            stepCount = 0;
        }
    }
}