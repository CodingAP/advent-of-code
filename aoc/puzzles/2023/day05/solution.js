/**
 * aoc/puzzles/2023/day05/solution.js
 * 
 * ~~ If You Give A Seed A Fertilizer ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/4/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    let [seeds, ...maps] = input.split(/\n\n/g);

    seeds = seeds.split(/: /)[1].split(/ /g).map(num => parseInt(num));
    maps = maps.reduce((obj, map) => {
        let [name, ...locations] = map.split(/\n/g);
        obj[name.split(/ /)[0]] = locations.map(numbers => numbers.split(/ /).map(num => parseInt(num)));
        return obj;
    }, {});

    let mapNames = Object.keys(maps);

    let source = seeds;
    for (let i = 0; i < mapNames.length; i++) {
        let destination = maps[mapNames[i]];

        for (let i = 0; i < source.length; i++) {
            let newNumber = source[i];
            for (let j = 0; j < destination.length; j++) {
                if (newNumber >= destination[j][1] && newNumber <= destination[j][1] + destination[j][2]) {
                    newNumber = (newNumber - destination[j][1]) + destination[j][0];
                    break;
                }
            }
            source[i] = newNumber;
        }
    }

    return source.reduce((min, num) => Math.min(min, num), Infinity);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    let [seeds, ...maps] = input.split(/\n\n/g);

    seeds = seeds.split(/: /)[1].split(/ /g).map(num => parseInt(num));

    maps = maps.reduce((obj, map) => {
        let [name, ...locations] = map.split(/\n/g);
        obj[name.split(/ /)[0]] = locations.map(numbers => numbers.split(/ /).map(num => parseInt(num)));
        return obj;
    }, {});

    const mapNames = Object.keys(maps);

    const findMinimum = range => {
        let min = Infinity;
        for (let num = range.start; num < range.end; num++) {
            let newNumber = num;
            for (let i = 0; i < mapNames.length; i++) {
                let destination = maps[mapNames[i]];
                for (let j = 0; j < destination.length; j++) {
                    if (newNumber >= destination[j][1] && newNumber <= destination[j][1] + destination[j][2]) {
                        newNumber = (newNumber - destination[j][1]) + destination[j][0];
                        break;
                    }
                }
            }
            min = Math.min(min, newNumber);
        }
        return min;
    }

    let min = Infinity;
    for (let i = 0; i < seeds.length; i += 2) {
        min = Math.min(min, findMinimum({ start: seeds[i], end: seeds[i] + seeds[i + 1] }));
    }
    return min;
}

export { part1, part2 };