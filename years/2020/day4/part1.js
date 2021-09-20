const common = require('../../../scripts/common');
const input = common.readInput('./years/2020/day4/input.txt');

module.exports = () => {
    let processedPassports = [];
    let passports = input.split('\n');
    let currentPassport = '';
    for (let i = 0; i < passports.length; i++) {
        if (i == passports.length - 1) {
            currentPassport += passports[i] + ' ';
            processedPassports.push(currentPassport);
        } else {
            if (passports[i] == '') {
                processedPassports.push(currentPassport);
                currentPassport = '';
            } else {
                currentPassport += passports[i] + ' ';
            }
        }
    }

    let valid = 0;

    for (let i = 0; i < processedPassports.length; i++) {
        let info = processedPassports[i].split(' ').filter(value => value != '');
        let neededInfo = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
        let infoObject = {};
        for (let j = 0; j < info.length; j++) {
            let tokens = info[j].split(':');
            infoObject[tokens[0]] = tokens[1];
        }

        let validBool = true;
        for (let j = 0; j < neededInfo.length; j++) {
            if (infoObject[neededInfo[j]] == null) validBool = false;
        }

        if (validBool) valid++;
    }

    return valid;
}