const input = require('fs').readFileSync('./years/2016/day5/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let password = new Array(8);

    let i = 0;
    while (true) {
        let hash = common.md5(input + i);
        if (hash.startsWith('00000')) {
            if (parseInt(hash.charAt(5), 16) <= 7) {
                if (!password[parseInt(hash.charAt(5))]) {
                    password[parseInt(hash.charAt(5))] = hash.charAt(6);
                    let valid = true;
                    for (let j = 0; j < password.length; j++) {
                        if (!password[j]) valid = false;
                    }
                    if (valid) break;
                }
            }
        }
        i++;
    }

    return password.join('');
}