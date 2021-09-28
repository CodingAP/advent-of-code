const common = require('../../../scripts/common');

module.exports = input => {
    let information = input.split('\n');
    let allRanges = {};
    let otherTickets = [];
    let mode = 0;
    let myTicket = [];

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
                myTicket = common.parseListToInt(information[i], ',');
                break;
            case 2:
                if (information[i].charAt(0) == 'n') continue;
                otherTickets.push(common.parseListToInt(information[i], ','));
                break;
        }
    }

    for (let i = otherTickets.length - 1; i >= 0; i--) {
        for (let j = 0; j < otherTickets[i].length; j++) {
            let valid = false;
            for (let rangeNames in allRanges) {
                for (let k = 0; k < allRanges[rangeNames].length; k++) {
                    if (otherTickets[i][j] >= allRanges[rangeNames][k][0] && otherTickets[i][j] <= allRanges[rangeNames][k][1]) valid = true;
                }
            }
            if (!valid) {
                otherTickets.splice(i, 1);
                break;
            }
        }
    }

    let chosen = {};
    for (let rangeNames in allRanges) {
        let allCorrect = [];
        for (let j = 0; j < otherTickets[0].length; j++) {
            let correct = true;
            for (let i = 0; i < otherTickets.length; i++) {
                if ((otherTickets[i][j] < allRanges[rangeNames][0][0] || otherTickets[i][j] > allRanges[rangeNames][0][1]) && (otherTickets[i][j] < allRanges[rangeNames][1][0] || otherTickets[i][j] > allRanges[rangeNames][1][1])) {
                    correct = false;
                    break;
                }
            }

            if (correct) allCorrect.push(j);
        }
        chosen[rangeNames] = allCorrect;
    }

    let sorted = Object.fromEntries(
        Object.entries(chosen).sort(([, a], [, b]) => a.length - b.length)
    );

    let taken = [];
    for (let rangeName in sorted) {
        for (let i = 0; i < taken.length; i++) {
            sorted[rangeName].splice(sorted[rangeName].indexOf(taken[i]), 1);
        }
        taken.push(sorted[rangeName][0]);
    }

    let sum = 1;
    for (let rangeNames in sorted) {
        if (rangeNames.startsWith('departure')) sum *= myTicket[sorted[rangeNames]];
    }
    return sum;
}