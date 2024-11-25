const input = require('fs').readFileSync('./years/2020/day18/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let sum = 0;
    let expressions = input.split('\n');

    let calculate = math => {
        let tokens = math.split(' ');
        let index = tokens.indexOf('+');
        let result = 0;
        if (index != -1) {
            result = eval(`${parseInt(tokens[index - 1])} ${tokens[index]} ${parseInt(tokens[index + 1])}`);
        } else {
            index = 1;
            result = eval(`${parseInt(tokens[0])} ${tokens[1]} ${parseInt(tokens[2])}`);
        }
        
        if (tokens.length == 3) return result;

        tokens.splice(index - 1, 3, result);
        return calculate(tokens.join(' '));
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