const common = require('../../../scripts/common');

module.exports = input => {
    let lines = input.split('\n');
    
    let rules = {};
    let state = lines[0].split(' ')[2].split('');
    
    for (let i = 2; i < lines.length; i++) {
        let tokens = lines[i].split(' => ');
        rules[tokens[0]] = tokens[1];
    }

    for (let i = 2; i < state.length - 2; i++) {
        for (let j = 0; j < 5; j++) {

        }
    }
    return 0;
}