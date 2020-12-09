const input = require('fs').readFileSync('./years/2019/day1/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let sum = 0;

    let fuels = input.split('\n').map(value => parseInt(value));
    for (let i = 0; i < fuels.length; i++) {
        let fuel = Math.floor(fuels[i] / 3) - 2;
        while (fuel > 0) {
            sum += fuel;
            fuel = Math.floor(fuel / 3) - 2;
        }
    }

    return sum;
}