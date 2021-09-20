const common = require('../../../scripts/common');
const input = common.readInput('./years/2017/day6/input.txt');

module.exports = () => {
    let banks = common.parseListToInt(input, '\t');
    // banks = [0, 2, 7, 0];

    let findMax = banks => {
        let index = 0;
        for (let i = 0; i < banks.length; i++) {
            if (i == index) continue;
            if (banks[i] > banks[index]) index = i;
        }
        return index;
    }

    let redistribute = banks => {
        let max = findMax(banks);
        
        let count = banks[max];
        banks[max] = 0;

        while (count > 0) {
            max = (max + 1) % banks.length;
            banks[max]++;
            count--;
        }
    }

    let previous = [];
    let foundPrevious = false;

    while (!foundPrevious) {
        redistribute(banks);
        console.log(previous.length);

        for (let i = 0; i < previous.length; i++) {
            if (common.arrayEquals(banks, previous[i], true)) {
                foundPrevious = true;
                break;
            }
        }

        if (!foundPrevious) previous.push(common.copy(banks));
    }

    return previous.length + 1;
}