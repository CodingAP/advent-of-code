const input = require('fs').readFileSync('./years/2015/day12/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let checkForNumbers = element => {
        let sum = 0;
        if (Array.isArray(element)) {
            for (let i = 0; i < element.length; i++) {
                sum += checkForNumbers(element[i]);
            }
        } else if (element === Object(element)) {
            let keys = Object.keys(element);
            let objSum = 0;
            for (let i = 0; i < keys.length; i++) {
                if (element[keys[i]] == 'red') {
                    objSum = 0;
                    break;
                }
                objSum += checkForNumbers(element[keys[i]]);
            }
            sum += objSum;
        } else if (typeof element == 'number') {
            sum += element;
        } else if (typeof element == 'string') {
            //Do nothing right now
        }
        return sum;
    }

    return checkForNumbers(JSON.parse(input));
}