const input = require('fs').readFileSync('./years/2020/day23/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let array = input.split('');
    let current = 0;

    for (let i = 0; i < 100; i++) {
        let clockwise = [];
        for (let i = 0; i < 3; i++) {
            let number = array[(current + 1) % array.length];
            clockwise.push(number);
            array.splice(array.indexOf(number), 1);
        }

        let destination = array[current];
        do {
            destination = (parseInt(destination) - 1) + '';
            if (destination == '0') destination = '9';
        } while (clockwise.includes(destination))

        current = (current + 1) % array.length;

        let stabilizer = array[current];

        array.splice(array.indexOf(destination) + 1, 0, clockwise[0], clockwise[1], clockwise[2]);

        let rotate = array.indexOf(stabilizer) - current;
        for (let i = 0; i < rotate; i++) array.push(array.shift());
    }

    array = array.join('');
    return array.slice(array.indexOf('1') + 1) + array.slice(0, array.indexOf('1'));
}