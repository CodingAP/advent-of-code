module.exports = input => {
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