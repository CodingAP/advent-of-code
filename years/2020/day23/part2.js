const common = require('../../../scripts/common');

module.exports = input => {
    let originalCups = common.parseListToInt(input, '');
    let inputCups = originalCups.map(data => ({ data, next: null, previous: null }));
    let max = originalCups.reduce((max, curr) => Math.max(max, curr), 0);
    let length = 1000000;
    
    for (let i = 0; i < (length - originalCups.length); i++) {
        let data = max + 1 + i;
        inputCups.push({ data, next: null, previous: null });
    }
    
    inputCups.forEach((cup, i) => {
        let nextCup = inputCups[(i + 1) < inputCups.length ? (i + 1) : 0];
        let previousCup = inputCups[(i - 1) >= 0 ? (i - 1) : (inputCups.length - 1)];

        cup.next = nextCup;
        nextCup.previous = cup;
        cup.previous = previousCup;
        previousCup.next = cup;
    });

    let dllGet = value => {
        if (value < 1) value = length - value;

        if (value <= max) return inputCups.find(cup => cup.data == value);
        return inputCups[value - 1];
    }

    let dllInsertAfter = (cup, data) => {
        data.next = cup.next;
        data.previous = cup;
        
        cup.next.previous = data;
        cup.next = data;
    }

    let dllRemove = cup => {
        cup.next.previous = cup.previous;
        cup.previous.next = cup.next;
    }

    let current = inputCups[0];

    for (let i = 0; i < 10000000; i++) {
        let removed = [];
        for (let i = 0; i < 3; i++) {
            let remove = current.next;
            dllRemove(remove);
            removed.push(remove);
        }

        let destination = current.data;

        do {
            destination--;
            if (destination < 1) destination = length;
        } while (removed.some(rCup => rCup.data == destination));

        let destinationCup = dllGet(destination);

        let dCup = destinationCup;
        for (let current of removed) {
            dllInsertAfter(dCup, current);
            dCup = current;
        }

        current = current.next;
    }
    
    let one = dllGet(1);
    let first = one.next;
    let second = first.next;
    
    return first.data * second.data;
}