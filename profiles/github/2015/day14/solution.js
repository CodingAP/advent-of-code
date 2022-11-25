const part1 = async input => {
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

const part2 = async input => {
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
            distance: 0,
            points: 0
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
        let bestDistance = -Infinity;
        let bestReindeer = [];
        for (let j = 0; j < reindeerKeys.length; j++) {
            if (reindeer[reindeerKeys[j]].distance > bestDistance) {
                bestDistance = reindeer[reindeerKeys[j]].distance;
                bestReindeer = [reindeerKeys[j]];
            } else if (reindeer[reindeerKeys[j]].distance == bestDistance) {
                bestReindeer.push(reindeerKeys[j]);
            }
        }

        bestReindeer.forEach(value => {
            reindeer[value].points++;
        });
    }

    let bestScore = -Infinity;

    for (let i = 0; i < reindeerKeys.length; i++) {
        bestScore = Math.max(bestScore, reindeer[reindeerKeys[i]].points)
    }

    return bestScore;
}

export { part1, part2 };