const common = require('../../../scripts/common');
const input = common.readInput('./years/2016/day19/input.txt');

module.exports = () => {
    // thank you numberphile (https://www.youtube.com/watch?v=uCsD3ZGzMgE&ab_channel=Numberphile)
    let binary = parseInt(input).toString(2);
    return parseInt(binary.slice(1) + binary.charAt(0), 2);
}