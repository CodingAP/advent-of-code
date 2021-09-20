const common = require('../../../scripts/common');
const input = common.readInput('./years/2015/day2/input.txt');

module.exports = () => {
    let sum = 0;

    let dimensions = input.split('\n');
    for (let i = 0; i < dimensions.length; i++) {
        let numbers = dimensions[i].split('x');
        let length = parseInt(numbers[0]), width = parseInt(numbers[1]), height = parseInt(numbers[2]);
            
        let surfaceArea = (2 * length * width) + (2 * width * height) + (2 * length * height);
        let slack = Math.min(length * width, width * height, length * height);
            
        sum += surfaceArea + slack;
    }
        
    return sum;
}