const input = require('fs').readFileSync('./years/2020/day5/input.txt').toString().trim();
const common = require('../../../common');

module.exports = () => {
    let highestID = -Infinity;
    let ids = input.split('\n');
    for (let i = 0; i < ids.length; i++) {
        let row = parseInt(ids[i].substring(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2);
        let column = parseInt(ids[i].substring(7, ids[i].length).replace(/L/g, '0').replace(/R/g, '1'), 2);
        let id = row * 8 + column;
        if (id > highestID) highestID = id;
    }
    return highestID;
}