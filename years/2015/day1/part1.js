const common = require('../../../scripts/common');
const input = common.readInput('./years/2015/day1/input.txt');

module.exports = () => {
    let floor = 0;
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) == '(') floor++;
        if (input.charAt(i) == ')') floor--;
    }
    return floor;
}