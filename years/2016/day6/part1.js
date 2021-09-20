const common = require('../../../scripts/common');
const input = common.readInput('./years/2016/day6/input.txt');

module.exports = () => {
    let message = '';
    
    let messages = input.split('\n');
    for (let x = 0; x < messages[0].length; x++) {
        let counts = {};
        for (let y = 0; y < messages.length; y++) {
            if (!counts[messages[y].charAt(x)]) counts[messages[y].charAt(x)] = 0;
            counts[messages[y].charAt(x)]++;
        }

        let highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
        message += highest;
    }

    return message;
}