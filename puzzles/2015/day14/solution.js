/**
 * aoc/puzzles/2015/day14/solution.js
 * 
 * ~~ Reindeer Olympics ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // parse input
    const reindeer = input.split(/\n/g).reduce((obj, line) => {
        let words = line.split(' ');
        obj[words[0]] = {
            speed: parseInt(words[3]),
            stamina: parseInt(words[6]),
            rest: parseInt(words[13]),
            distance: 0,
            timer: 0,
            isResting: false
        }
        return obj;
    }, {});

    // simulate reindeer racing for 2503 seconds
    for (let time = 0; time < 2503; time++) {
        Object.keys(reindeer).forEach(name => {
            if (!reindeer[name].isResting) reindeer[name].distance += reindeer[name].speed;

            reindeer[name].timer++;
            if (!reindeer[name].isResting && reindeer[name].timer == reindeer[name].stamina) {
                reindeer[name].isResting = true;
                reindeer[name].timer = 0;
            } else if (reindeer[name].isResting && reindeer[name].timer == reindeer[name].rest) {
                reindeer[name].isResting = false;
                reindeer[name].timer = 0;
            }
        });
    }

    // find reindeer that went the furthest
    return Object.values(reindeer).sort((a, b) => b.distance - a.distance)[0].distance;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // parse input
    const reindeer = input.split(/\n/g).reduce((obj, line) => {
        let words = line.split(' ');
        obj[words[0]] = {
            speed: parseInt(words[3]),
            stamina: parseInt(words[6]),
            rest: parseInt(words[13]),
            distance: 0,
            points: 0,
            timer: 0,
            isResting: false
        }
        return obj;
    }, {});

    // simulate reindeer racing for 2503 seconds
    for (let time = 0; time < 2503; time++) {
        Object.keys(reindeer).forEach(name => {
            if (!reindeer[name].isResting) reindeer[name].distance += reindeer[name].speed;

            reindeer[name].timer++;
            if (!reindeer[name].isResting && reindeer[name].timer == reindeer[name].stamina) {
                reindeer[name].isResting = true;
                reindeer[name].timer = 0;
            } else if (reindeer[name].isResting && reindeer[name].timer == reindeer[name].rest) {
                reindeer[name].isResting = false;
                reindeer[name].timer = 0;
            }
        });

        // give points to the furthest reindeer
        const distances = Object.keys(reindeer).sort((a, b) => reindeer[b].distance - reindeer[a].distance);
        distances.filter(name => reindeer[name].distance == reindeer[distances[0]].distance)
            .forEach(name => reindeer[name].points++);
    }

    // find reindeer that has the most points
    return Object.values(reindeer).sort((a, b) => b.points - a.points)[0].points;
}

export { part1, part2 };