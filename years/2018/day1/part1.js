const common = require('../../../scripts/common');
const input = common.readInput('./years/2018/day1/input.txt');

module.exports = () => {
    return common.addAll(common.parseListToInt(input));
}