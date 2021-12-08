const common = require('../../../scripts/common');

module.exports = input => {
    let lines = [];
    input.split('\n').forEach(element => {
        let tokens = element.split(' | ');
        lines.push({ pattern: tokens[0].split(' '), output: tokens[1].split(' ') });
    });

    let one = 0, four = 0, seven = 0, eight = 0;

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].output.length; j++) {
            if (lines[i].output[j].length == 2) one++;
            if (lines[i].output[j].length == 4) four++;
            if (lines[i].output[j].length == 3) seven++;
            if (lines[i].output[j].length == 7) eight++;
        }
    }
    return one + four + seven + eight;
}