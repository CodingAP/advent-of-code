const common = require('../../../scripts/common');

module.exports = input => {
    let i = 0;

    while (true) {
        let hash = common.md5(input + i);
        if (hash.startsWith('000000')) break;
        i++;
    }

    return i;
}