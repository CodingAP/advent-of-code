// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day23/solution.ts
 *
 * ~~ Crab Cups ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let originalCups = input.trim().split('').map(num => parseInt(num));
    let inputCups = originalCups.map(data => ({ data, next: null, previous: null }));
    let max = originalCups.reduce((max, curr) => Math.max(max, curr), 0);
    let length = 9;

    inputCups.forEach((cup, i) => {
        let nextCup = inputCups[(i + 1) < inputCups.length ? (i + 1) : 0];
        let previousCup = inputCups[(i - 1) >= 0 ? (i - 1) : (inputCups.length - 1)];

        cup.next = nextCup;
        nextCup.previous = cup;
        cup.previous = previousCup;
        previousCup.next = cup;
    });

    let dllGet = value => {
        if (value < 1) value = length + 1 - value;

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

    for (let i = 0; i < 100; i++) {
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

    let string = '';
    let one = dllGet(1);
    let final = one.next;
    while (final != one) {
        string += final.data;
        final = final.next;
    }
    return string;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let originalCups = input.trim().split('').map(num => parseInt(num));
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
};

export { part1, part2 };
