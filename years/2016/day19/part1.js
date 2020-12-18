const input = require('fs').readFileSync('./years/2016/day19/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    // thank you numberphile (https://www.youtube.com/watch?v=uCsD3ZGzMgE&ab_channel=Numberphile)
    let binary = parseInt(input).toString(2);
    return parseInt(binary.slice(1) + binary.charAt(0), 2);
}