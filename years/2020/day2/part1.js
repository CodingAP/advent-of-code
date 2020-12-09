const input = require('fs').readFileSync('./years/2020/day2/input.txt').toString().trim();
const common = require('../../../common');

module.exports = () => {
    let passwords = input.split('\n');
    let valid = 0;

    for (let i = 0; i < passwords.length; i++) {
        let tokens = passwords[i].split(' ');
        let min = parseInt(tokens[0].split('-')[0]);
        let max = parseInt(tokens[0].split('-')[1]);
        let count = 0;
        let letter = tokens[1].replace(':', '');
        let password = tokens[2];
        for (let j = 0; j < password.length; j++) {
            if (password.charAt(j) == letter) count++;
        }

        if (count >= min && count <= max) valid++;
    }

    return valid;
}