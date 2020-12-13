const input = require('fs').readFileSync('./years/2020/day13/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let information = input.split('\n');
    let busIDs = information[1].split(',').map(value => parseInt(value) || 0);

    let jump = 1;
    let timestamp = busIDs[0];
    while (true) {
        let valid = true;
        for (let i = 0; i < busIDs.length; i++) {
            if (busIDs[i] == 0) continue;
            if (((timestamp + i) % busIDs[i]) != 0) {
                valid = false;
                break;
            } else {
                jump *= busIDs[i];
            }
        }
        if (valid) return timestamp;
        timestamp += jump;
        jump = 1;
    }
}