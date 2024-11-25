const input = require('fs').readFileSync('./years/2020/day18/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let sum = 0;
    let expressions = input.split('\n');

    let calculate = math => {
        let tokens = math.split(' ');
        let result = eval(`${parseInt(tokens[0])} ${tokens[1]} ${parseInt(tokens[2])}`);
        if (tokens.length == 3) return result;
        return calculate(result + ' ' + tokens.slice(3).join(' '));
    }

    expressions.forEach(value => {
        let parenthesisStack = [];

        while (value.includes('(')) {
            for (let i = 0; i < value.length; i++) {
                if (value.charAt(i) == '(') parenthesisStack.push(i);
                if (value.charAt(i) == ')') {
                    let other = parenthesisStack.pop();
                    let result = calculate(value.substring(other + 1, i));
                    value = value.substring(0, other) + result + value.substring(i + 1);
                    i = other;
                }
            }
        }
        
        sum += calculate(value);
    });

    return sum;
}