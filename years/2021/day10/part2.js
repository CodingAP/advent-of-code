const common = require('../../../scripts/common');

module.exports = input => {
    let lines = input.split('\n');
    let opening = /[\(\[\{\<]/;
    let closing = /[\)\]\}\>]/;

    let pairs = { '(': ')', '[': ']', '{': '}', '<': '>' };
    let values = { '(': 1, '[': 2, '{': 3, '<': 4 };
    let scores = [];
    lines.forEach(element => {
        let characterStack = [];
        let score = 0;
        for (let i = 0; i < element.length; i++) {
            if (element[i].match(opening)) characterStack.push(element[i]);
            if (element[i].match(closing)) {
                let last = characterStack.pop();
                if (pairs[last] != element[i]) return;
            }
        }

        for (let i = characterStack.length - 1; i >= 0; i--) {
            score *= 5;
            score += values[characterStack[i]];
        }
        scores.push(score);
    });

    scores.sort((a, b) => a - b)
    return scores[Math.floor(scores.length / 2)];
}