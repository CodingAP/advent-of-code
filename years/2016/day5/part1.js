const input = require('fs').readFileSync('./years/2016/day5/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let password = '';

    let i = 0;
    while (true) {
        let hash = common.md5(input + i);
        if (hash.startsWith('00000')) {
            password += hash.charAt(5);
            if (password.length == 8) break;
        }
        i++;
    }

    return password;
}