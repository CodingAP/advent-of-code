const input = require('fs').readFileSync('./years/2015/day12/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let checkForNumbers = element => {
        let sum = 0;
        if (element === Object(element)) {
            let keys = Object.keys(element);
            for (let i = 0; i < keys.length; i++) {
                sum += checkForNumbers(element[keys[i]]);
            }
        } else if (Array.isArray(element)) {
            for (let i = 0; i < element.length; i++) {
                sum += checkForNumbers(element[i]);
            }
        } else if (typeof element == 'number') {
            sum += element;
        } else if (typeof element == 'string') {
            //Do nothing right now
        }
        return sum;
    }

    return checkForNumbers(JSON.parse(input));
}