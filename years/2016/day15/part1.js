const common = require('../../../scripts/common');
const input = common.readInput('./years/2016/day15/input.txt');
const common = require('../../../scripts/common');

module.exports = () => {
    let diskInfo = input.split('\n');
    let disks = [];

    for (let i = 0; i < diskInfo.length; i++) {
        let tokens = diskInfo[i].split(' ');
        let disk = { positions: parseInt(tokens[3]), current: parseInt(tokens[11].replace('.', '')) };
        disks.push(disk);
    }

    let time = 0;
    while (true) {
        let allZero = true;
        for (let i = 0; i < disks.length; i++) {
            if ((disks[i].current + time + i + 1) % disks[i].positions != 0) allZero = false;
        }
        if (allZero) return time;
        time++;
    }
}