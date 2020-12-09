const input = require('fs').readFileSync('./years/2015/day1/input.txt').toString();
const common = require('../../../common');

module.exports = () => {
    let floor = 0;
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) == '(') floor++;
        if (input.charAt(i) == ')') floor--;
    }
    return floor;
}