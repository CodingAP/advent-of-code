const input = require('fs').readFileSync('./years/2020/day12/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let instructions = input.split('\n');
    let position = { x: 0, y: 0 };
    let waypoint = { x: 10, y: 1 };
    let dir = 1;

    for (let i = 0; i < instructions.length; i++) {
        let amount = parseInt(instructions[i].slice(1));
        let temp = 0;
        switch (instructions[i].charAt(0)) {
            case 'N':
                waypoint.y += amount;
                break;
            case 'S':
                waypoint.y -= amount;
                break;
            case 'E':
                waypoint.x += amount;
                break;
            case 'W':
                waypoint.x -= amount;
                break;
            case 'L':
                for (let i = 0; i < amount / 90; i++) {
                    temp = waypoint.x;
                    waypoint.x = -waypoint.y;
                    waypoint.y = temp;
                }
                break;
            case 'R':
                for (let i = 0; i < amount / 90; i++) {
                    temp = waypoint.x;
                    waypoint.x = waypoint.y;
                    waypoint.y = -temp;
                }
                break;
            case 'F':
                for (let j = 0; j < amount; j++) {
                    position.x += waypoint.x;
                    position.y += waypoint.y;
                }
                break;
        }
    }

    return Math.abs(position.x) + Math.abs(position.y);
}