const input = require('fs').readFileSync('inputs/2015/1.in').toString();
const common = require('../../common');

module.exports = {
    part1: () => {
        let floor = 0;
        for (let i = 0; i < input.length; i++) {
            if (input.charAt(i) == '(') floor++;
            if (input.charAt(i) == ')') floor--;
        }
        return floor;
    },
    part2: () => {
        let floor = 0;
        for (let i = 0; i < input.length; i++) {
            if (input.charAt(i) == '(') floor++;
            if (input.charAt(i) == ')') floor--;
            if (floor < 0) return i + 1;
        }
        return -1;
    }
}