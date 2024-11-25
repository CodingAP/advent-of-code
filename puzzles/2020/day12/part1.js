const input = require('fs').readFileSync('./years/2020/day12/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let instructions = input.split('\n');
    let position = { x: 0, y: 0 };
    let dir = 1;
    
    for (let i = 0; i < instructions.length; i++) {
        let amount = parseInt(instructions[i].slice(1));
        switch (instructions[i].charAt(0)) {
            case 'N':
                position.y += amount;
                break;
            case 'S':
                position.y -= amount;
                break;
            case 'E':
                position.x += amount;
                break;
            case 'W':
                position.x -= amount;
                break;
            case 'L':
                dir -= amount / 90;
                if (dir < 0) dir = 4 + dir;
                break;
            case 'R':
                dir += amount / 90;
                dir = dir % 4;
                break;
            case 'F':
                switch (dir) {
                    case 0:
                        position.y += amount;
                        break;
                    case 1:
                        position.x += amount;
                        break;
                    case 2:
                        position.y -= amount;
                        break;
                    case 3:
                        position.x -= amount;
                        break;
                }
                break;
        }
    }

    return Math.abs(position.x) + Math.abs(position.y);
}