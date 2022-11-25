const part1 = async input => {
    let reindeer = [];
    input.split('\n').forEach(element => {
        let tokens = element.split(' ');
        let deer = {
            name: tokens[0],
            speed: parseInt(tokens[3]),
            stamina: parseInt(tokens[6]),
            rest: parseInt(tokens[13]),
            isResting: false,
            timer: 0,
            distance: 0
        };
        reindeer.push(deer);
    });

    for (let seconds = 0; seconds < 2503; seconds++) {
        reindeer.forEach(deer => {
            if (!deer.isResting) deer.distance += deer.speed;
            deer.timer++;

            if (deer.isResting && deer.timer == deer.rest) {
                deer.isResting = false;
                deer.timer = 0;
            } else if (!deer.isResting && deer.timer == deer.stamina) {
                deer.isResting = true;
                deer.timer = 0;
            }
        });
    }

    return reindeer.reduce((largest, deer) => Math.max(largest, deer.distance), -Infinity);
}

const part2 = async input => {
    let reindeer = [];
    input.split('\n').forEach(element => {
        let tokens = element.split(' ');
        let deer = {
            name: tokens[0],
            speed: parseInt(tokens[3]),
            stamina: parseInt(tokens[6]),
            rest: parseInt(tokens[13]),
            isResting: false,
            timer: 0,
            distance: 0,
            points: 0
        };
        reindeer.push(deer);
    });

    for (let seconds = 0; seconds < 2503; seconds++) {
        reindeer.forEach(deer => {
            if (!deer.isResting) deer.distance += deer.speed;
            deer.timer++;

            if (deer.isResting && deer.timer == deer.rest) {
                deer.isResting = false;
                deer.timer = 0;
            } else if (!deer.isResting && deer.timer == deer.stamina) {
                deer.isResting = true;
                deer.timer = 0;
            }
        });

        let farthest = reindeer.reduce((winner, deer) => {
            let winnerDeer = reindeer.find(element => element.name == winner[0]);

            if (deer.distance > winnerDeer.distance) return [deer.name];
            else if (deer.distance == winnerDeer.distance) {
                winner.push(deer.name);
            }

            return winner;
        }, [reindeer[0].name]);

        farthest.forEach(name => {
            reindeer.find(element => element.name == name).points++;
        });
    }

    return reindeer.reduce((largest, deer) => Math.max(largest, deer.points), -Infinity);
}

export { part1, part2 }; 