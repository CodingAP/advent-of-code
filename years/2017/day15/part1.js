const common = require('../../../scripts/common');

module.exports = input => {
    let generators = {
        a: parseInt(input.split('\n')[0].split(' ')[4]),
        b: parseInt(input.split('\n')[1].split(' ')[4])
    };

    let pairs = 0;
    for (let i = 0; i < 40000000; i++) {
        generators.a = (generators.a * 16807) % 2147483647;
        generators.b = (generators.b * 48271) % 2147483647;

        if ((generators.a & 0xffff) == (generators.b & 0xffff)) pairs++;
    }
    return pairs;
}