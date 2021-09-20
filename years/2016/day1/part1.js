const common = require('../../../scripts/common');
const input = common.readInput('./years/2016/day1/input.txt');

module.exports = () => {
    let position = { x: 0, y: 0 };
    let currentDirection = 0;
    let directions = input.replace(/\s/g, '').split(',');
    for (let i = 0; i < directions.length; i++) {
        if (directions[i].charAt(0) == 'L') {
            currentDirection--;
        } else if (directions[i].charAt(0) == 'R') {
            currentDirection++;
        }

        if (currentDirection > 3) currentDirection = 0;
        if (currentDirection < 0) currentDirection = 3;

        switch (currentDirection) {
            case 0:
                position.y += parseInt(directions[i].slice(1));
                break;
            case 1:
                position.x += parseInt(directions[i].slice(1));
                break;
            case 2:
                position.y -= parseInt(directions[i].slice(1));
                break;
            case 3:
                position.x -= parseInt(directions[i].slice(1));
                break;
        }
    }

    return Math.abs(position.x) + Math.abs(position.y);
}