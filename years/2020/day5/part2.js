const input = require('fs').readFileSync('./years/2020/day5/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let seats = new Array(128);
    for (let i = 0; i < seats.length; i++) {
        seats[i] = new Array(8);
        for (let j = 0; j < seats[i].length; j++) {
            seats[i][j] = false;
        }
    }

    let ids = input.split('\n');
    for (let i = 0; i < ids.length; i++) {
        let row = parseInt(ids[i].substring(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2);
        let column = parseInt(ids[i].substring(7, ids[i].length).replace(/L/g, '0').replace(/R/g, '1'), 2);
        seats[row][column] = true;
    }

    for (let y = 0; y < seats.length; y++) {
        for (let x = 0; x < seats[y].length; x++) {
            if (!seats[y][x] && seats[y][x - 1] && seats[y][x + 1]) return y * 8 + x;
        }
    }
}