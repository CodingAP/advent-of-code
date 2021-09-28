const common = require('../../../scripts/common');

module.exports = input => {
    let information = input.split('\n');
    let allRanges = {};
    let otherTickets = [];
    let mode = 0;
    let sum = 0;

    for (let i = 0; i < information.length; i++) {
        if (information[i] == '') {
            mode++;
            continue;
        }

        switch (mode) {
            case 0:
                let tokens = information[i].replace(/\s/g, '').split(':');
                let ranges = tokens[1].split('or').map(value => value.split('-').map(value => parseInt(value)));
                allRanges[tokens[0]] = ranges;
                break;
            case 1:
                break;
            case 2:
                if (information[i].charAt(0) == 'n') continue;
                Array.prototype.push.apply(otherTickets, common.parseListToInt(information[i], ','));
                break;
        }
    }

    for (let i = 0; i < otherTickets.length; i++) {
        let valid = false;
        for (let rangeNames in allRanges) {
            for (let j = 0; j < allRanges[rangeNames].length; j++) {
                if (otherTickets[i] >= allRanges[rangeNames][j][0] && otherTickets[i] <= allRanges[rangeNames][j][1]) valid = true;
            }
        }
        if (!valid) sum += otherTickets[i];
    }
    return sum;
}