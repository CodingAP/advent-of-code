const input = require('fs').readFileSync('./years/2020/day23/input.txt').toString().trim();
const common = require('../../../scripts/common');

var DLL = require('doubly-linked-list.js');

module.exports = () => {
    let array = input.split('');
    let cups = new DLL.DoublyLinkedList();
    for (let i = 0; i < 1000000; i++) {
        if (!array[i]) cups.append(i + 1 + '');
        else cups.append(array[i])
    }
    let current = 0;

    for (let i = 0; i < 10000000; i++) {
        let clockwise = [];
        let currentCup = cups.item(current);

        for (let i = 0; i < 3; i++) {
            clockwise.push(currentCup.next.data);
            currentCup.next.remove();
        }

        let destination = cups.item(current);
        do {
            destination.data = (parseInt(destination.data) - 1) + '';
            if (destination.data == '0') destination.data = '1000000';
        } while (clockwise.includes(destination.data))

        current = (current + 1) % cups.size();

        for (let i = 0; i < 3; i++) {
            destination.append(clockwise[i]);
        }

        if (i % 100000 == 0) console.log(i);
    }

    console.log(cups);
    return 0;
}