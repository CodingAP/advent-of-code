const common = require('../../../scripts/common');
const input = common.readInput('./years/2019/day4/input.txt');

module.exports = () => {
    let [min, max] = input.split('-').map(element => parseInt(element));
    
    let count = 0;
    for (let i = min; i <= max; i++) {
        let password = i.toString();
        let double = false, neverDecreasing = true;
        for (let i = 1; i < password.length; i++) {
            if (password[i] == password[i - 1]) double = true;
            if (parseInt(password[i]) < parseInt(password[i - 1])) neverDecreasing = false;
        }
        if (double && neverDecreasing) count++;
    }
    return count;
}