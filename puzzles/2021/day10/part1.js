const common = require('../../../scripts/common');

module.exports = input => {
    let lines = input.split('\n');
    let opening = /[\(\[\{\<]/;
    let closing = /[\)\]\}\>]/;

    let pairs = { '(': ')', '[': ']', '{': '}', '<': '>' };
    let values = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
    let sum = 0;
    lines.forEach(element => {
        let characterStack = [];
        for (let i = 0; i < element.length; i++) {
            if (element[i].match(opening)) characterStack.push(element[i]);
            if (element[i].match(closing)) {
                let last = characterStack.pop();
                if (pairs[last] != element[i]) {
                    sum += values[element[i]];
                    return;
                }
            }
        }
    });
    return sum;
}