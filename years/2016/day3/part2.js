const input = require('fs').readFileSync('./years/2016/day3/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let valid = 0;
    let triangles = input.split('\n');
    
    for (let i = 0; i < triangles.length; i += 3) {
        let tokens = [triangles[i].split(' ').filter(value => value != '').map(value => parseInt(value)), triangles[i + 1].split(' ').filter(value => value != '').map(value => parseInt(value)), triangles[i + 2].split(' ').filter(value => value != '').map(value => parseInt(value))];

        for (let j = 0; j < 3; j++) {
            let sum = tokens[0][j] + tokens[1][j] + tokens[2][j];
            let max = Math.max(tokens[0][j], tokens[1][j], tokens[2][j]);

            if ((sum - max) > max) valid++;
        }
    }

    return valid;
}