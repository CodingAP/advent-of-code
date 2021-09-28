const common = require('../../../scripts/common');

module.exports = input => {
    let adapters = common.parseListToInt(input);
    adapters.push(0);
    adapters = adapters.sort((a, b) => a - b);
    adapters.push(adapters[adapters.length - 1] + 3);

    let diff1 = 0;
    let diff3 = 0;
    for (let i = 0; i < adapters.length - 1; i++) {
        let diff = adapters[i + 1] - adapters[i];
        if (diff == 1) diff1++;
        if (diff == 3) diff3++;
    }

    return diff1 * diff3;
}