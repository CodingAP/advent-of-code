const common = require('../../../scripts/common');
const input = common.readInput('./years/2015/day14/input.txt');

module.exports = () => {
    let reindeer = {};

    let splitInput = input.split('\n');
    for (let i = 0; i < splitInput.length; i++) {
        let tokens = splitInput[i].split(' ');
        reindeer[tokens[0]] = {
            speed: parseInt(tokens[3]),
            duration: parseInt(tokens[6]),
            rest: parseInt(tokens[13]),
            timer: 0,
            state: 0,
            distance: 0
        }
    }

    let reindeerKeys = Object.keys(reindeer);

    for (let i = 0; i < 2503; i++) {
        for (let j = 0; j < reindeerKeys.length; j++) {
            let currentReindeer = reindeer[reindeerKeys[j]];
            if (currentReindeer.state == 0) {
                currentReindeer.distance += currentReindeer.speed;
            }
            currentReindeer.timer++;
            if (currentReindeer.timer == currentReindeer.duration && currentReindeer.state == 0) {
                currentReindeer.timer = 0;
                currentReindeer.state = 1;
            } else if (currentReindeer.timer == currentReindeer.rest && currentReindeer.state == 1) {
                currentReindeer.timer = 0;
                currentReindeer.state = 0;
            }
        }
    }

    let bestDistance = -Infinity;
    for (let i = 0; i < reindeerKeys.length; i++) {
        bestDistance = Math.max(bestDistance, reindeer[reindeerKeys[i]].distance);
    }

    return bestDistance;
}