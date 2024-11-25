// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2016/day15/solution.ts
 * 
 * ~~ Timing is Everything ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    let disks = input.split('\n').reduce((array, line) => {
        let tokens = line.split(' ');
        array.push({ size: parseInt(tokens[3]), starting: parseInt(tokens[11].replace('.', '')) });
        return array;
    }, []);

    let time = 0;
    while (true) {
        let success = true;

        for (let i = 0; i < disks.length; i++) {
            if ((disks[i].starting + time + i + 1) % disks[i].size != 0) success = false;
        }

        if (success) return time;
        time++;
    }
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let disks = input.split('\n').reduce((array, line) => {
        let tokens = line.split(' ');
        array.push({ size: parseInt(tokens[3]), starting: parseInt(tokens[11].replace('.', '')) });
        return array;
    }, []);
    disks.push({ size: 11, starting: 0 });

    let time = 0;
    while (true) {
        let success = true;

        for (let i = 0; i < disks.length; i++) {
            if ((disks[i].starting + time + i + 1) % disks[i].size != 0) success = false;
        }

        if (success) return time;
        time++;
    }
}

export { part1, part2 };