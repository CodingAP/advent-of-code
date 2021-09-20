const common = require('../../../scripts/common');
const input = common.readInput('./years/2020/day15/input.txt');

module.exports = () => {
    let numbers = common.parseListToInt(input, ',');
    
    let past = [];
    for (let i = 0; i < 2020; i++) {
        if (numbers[i] != null) past[i] = numbers[i];
        else {
            let last = past[i - 1];
            let others = [...past.slice(0, i - 1), ...past.slice(i)];
            let index = others.lastIndexOf(last);

            if (index == -1) {
                past.push(0);
            } else {
                past.push((i - 1) - index);
            }
        }
    }
    return past[past.length - 1];
}