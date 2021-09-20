const common = require('../../../scripts/common');
const input = common.readInput('./years/2020/day13/input.txt');

module.exports = () => {
    let information = input.split('\n');
    let earliest = parseInt(information[0]);
    let busIDs = information[1].split(',').filter(value => value != 'x').map(value => parseInt(value));

    let smallest = Infinity;
    let smallestID = -1;
    for (let i = 0; i < busIDs.length; i++) {
        let amount = (Math.floor(earliest / busIDs[i]) + 1) * busIDs[i];
        if (amount < smallest) {
            smallest = amount;
            smallestID = busIDs[i];
        }
    }

    let minutesLate = smallest - earliest;
    return smallestID * minutesLate;
}