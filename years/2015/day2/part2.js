const input = require('fs').readFileSync('./years/2015/day2/input.txt').toString().trim();
const common = require('../../../common');

module.exports = () => {
    let sum = 0;

    let dimensions = input.split('\n');
    for (let i = 0; i < dimensions.length; i++) {
        let numbers = dimensions[i].split('x');
        let length = parseInt(numbers[0]), width = parseInt(numbers[1]), height = parseInt(numbers[2]);

        let volume = length * width * height;
        let decoration = (2 * length + 2 * width + 2 * height) - (Math.max(length, width, height) * 2);

        sum += volume + decoration;
    }
        
    return sum;
}