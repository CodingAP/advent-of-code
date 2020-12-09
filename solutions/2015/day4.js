const input = require('fs').readFileSync('inputs/2015/4.in').toString().trim();
const common = require('../../common');

module.exports = {
    part1: () => {
        let i = 0;
        
        while (true) {
            let hash = common.md5(input + i);
            if (hash.startsWith('00000')) break;
            i++;
        }
        
        return i;
    },
    part2: () => {
        let i = 0;
        
        while (true) {
            let hash = common.md5(input + i);
            if (hash.startsWith('000000')) break;
            i++;
        }
        
        return i;
    }
}