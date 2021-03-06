const input = require('fs').readFileSync('./years/2018/day7/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let steps = {};
    
    input.split(/\r\n/).forEach(value => {
        let tokens = value.split(' ');
        
        if (steps[tokens[1]] == null) steps[tokens[1]] = [];
        if (steps[tokens[7]] == null) steps[tokens[7]] = [];
        steps[tokens[7]].push(tokens[1]);
    });
    
    let finished = [];
    
    
    return finished.join('');
}