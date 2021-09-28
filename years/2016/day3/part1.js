const common = require('../../../scripts/common');

module.exports = input => {
    let valid = 0;
    let triangles = input.split('\n');
    triangles.forEach(element => {
        let tokens = element.split(' ').filter(value => value != '').map(value => parseInt(value));
        
        let sum = common.addAll(tokens);
        let max = Math.max(tokens[0], tokens[1], tokens[2]);

        if ((sum - max) > max) valid++;
    })
    return valid;
}