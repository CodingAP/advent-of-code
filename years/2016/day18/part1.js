const common = require('../../../scripts/common');
const input = common.readInput('./years/2016/day18/input.txt');

module.exports = () => {
    let rows = new Array(40);
    rows[0] = input;

    let trapRules = ['^^.', '.^^', '^..', '..^'];

    for (let i = 1; i < rows.length; i++) {
        let newRow = '';
        for (let j = 0; j < rows[i - 1].length; j++) {
            let last = rows[i - 1].charAt(j - 1) || '.';
            let current = rows[i - 1].charAt(j);
            let next = rows[i - 1].charAt(j + 1) || '.';

            let isTrap = false;
            for (let k = 0; k < trapRules.length; k++) {
                if (last + current + next == trapRules[k]) isTrap = true;
            }

            newRow += (isTrap) ? '^' : '.';
        }
        rows[i] = newRow;
    }

    let safe = 0;
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            if (rows[i].charAt(j) == '.') safe++;
        }
    }
    return safe;
}