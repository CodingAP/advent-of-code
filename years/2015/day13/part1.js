const common = require('../../../scripts/common');

module.exports = input => {
    let combinations = {};

    let splitInput = input.split('\n');
    for (let i = 0; i < splitInput.length; i++) {
        let tokens = splitInput[i].split(' ');
        let sitter = tokens[0];
        let sittenBy = tokens[10].replace('.', '');
        let sign = tokens[2];
        let amount = tokens[3];
        if (combinations[sitter] == null) combinations[sitter] = {};
        combinations[sitter][sittenBy] = parseInt(amount) * ((sign == 'gain') ? 1 : -1);
    }

    let bestScore = -Infinity;
    let bestSeats = [];
    let permutations = common.permutator(Object.keys(combinations));
    for (let i = 0; i < permutations.length; i++) {
        let score = 0;
        for (let j = 0; j < permutations[i].length; j++) {
            let sitter = permutations[i][j];
            let leftSitter = permutations[i][(j == 0) ? permutations[i].length - 1 : j - 1];
            let rightSitter = permutations[i][(j + 1) % permutations[i].length];
            score += combinations[sitter][leftSitter] + combinations[sitter][rightSitter];
        }
        if (score > bestScore) {
            bestScore = score;
            bestSeats = permutations[i];
        }
    }

    return bestScore;
}