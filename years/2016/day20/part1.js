const common = require('../../../scripts/common');
const input = common.readInput('./years/2016/day20/input.txt');

module.exports = () => {
    let ips = input.split('\n');
    let blacklist = [];
    
    for (let i = 0; i < ips.length; i++) {
        let min = parseInt(ips[i].split('-')[0]);
        let max = parseInt(ips[i].split('-')[1]);
        blacklist.push({ min, max });
    }
    
    let ip = 0;
    while (ip < 4294967295) {
        let contained = false;
        for (let i = 0; i < blacklist.length; i++) {
            if (ip >= blacklist[i].min && ip <= blacklist[i].max) {
                contained = true;
                ip = blacklist[i].max;
                break;
            }
        }
        if (!contained) return ip;
        ip++;
    }
}