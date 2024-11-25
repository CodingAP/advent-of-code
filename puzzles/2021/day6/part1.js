const common = require('../../../scripts/common');

module.exports = input => {
    let lanternfish = common.parseListToInt(input, ',');
    
    for (let d = 0; d < 80; d++) {
        let toBeAdded = [];
        for (let i = 0; i < lanternfish.length; i++) {
            lanternfish[i]--;
            if (lanternfish[i] == -1) {
                toBeAdded.push(8);
                lanternfish[i] = 6;
            }
        }
        lanternfish.push(...toBeAdded);
    }
    
    return lanternfish.length;
}