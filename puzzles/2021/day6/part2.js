const common = require('../../../scripts/common');

module.exports = input => {
    let lanternfish = common.parseListToInt(input, ',');

    let currentFish = { 6: 0, 7: 0, 8: 0, 9: 0 };

    for (let i = 0; i < lanternfish.length; i++) {
        if (!currentFish[lanternfish[i]]) currentFish[lanternfish[i]] = 0;
        currentFish[lanternfish[i]]++;
    }

    for (let d = 0; d < 256; d++) {
        let fish = Object.keys(currentFish);
        for (let i = 0; i < fish.length; i++) {
            if (parseInt(fish[i]) > 0) {
                currentFish[parseInt(fish[i]) - 1] = currentFish[parseInt(fish[i])];
                currentFish[parseInt(fish[i])] = 0;
            } else {
                currentFish[7] += currentFish[parseInt(fish[i])];
                currentFish[9] += currentFish[parseInt(fish[i])];
            }
        }
    }

    return Object.values(currentFish).reduce((a, b) => a + b);
}