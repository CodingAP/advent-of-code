// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2021/day25/solution.ts
 *
 * ~~ Sea Cucumber ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

const forEach2DArray = (array, callback) => {
    for (let y = 0; y < array.length; y++) {
        for (let x = 0; x < array[y].length; x++) {
            callback(array[y][x], x, y);
        }
    }
};

const arrayEquals = (a, b, matchOrder = false) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    let sortedA = JSON.parse(JSON.stringify(a)).sort();
    let sortedB = JSON.parse(JSON.stringify(b)).sort();

    for (var i = 0; i < a.length; ++i) {
        if ((matchOrder ? a : sortedA)[i] !== (matchOrder ? b : sortedB)[i]) return false;
    }
    return true;
};

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let rows = input.trim().split('\n');
    let seaCucumbers = {
        right: [],
        down: []
    };

    forEach2DArray(rows, (value, x, y) => {
        if (value != '.') seaCucumbers[(value == '>') ? 'right' : 'down'].push(`${x},${y}`);
    });

    let finished = false;
    let step = 0;
    while (!finished) {
        finished = true;
        let newSeaCucumbers = {
            right: [],
            down: []
        };
        
        for (let i = 0; i < seaCucumbers.right.length; i++) {
            let [x, y] = seaCucumbers.right[i].split(',').map(num => parseInt(num));
            let newPosition = `${(x + 1) % rows[0].length},${y}`;
            if (!seaCucumbers.right.includes(newPosition) && !seaCucumbers.down.includes(newPosition)) newSeaCucumbers.right[i] = newPosition;
            else newSeaCucumbers.right[i] = seaCucumbers.right[i];
        }

        if (!arrayEquals(seaCucumbers.right, newSeaCucumbers.right, false)) finished = false;
        seaCucumbers.right = newSeaCucumbers.right;

        for (let i = 0; i < seaCucumbers.down.length; i++) {
            let [x, y] = seaCucumbers.down[i].split(',').map(num => parseInt(num));
            let newPosition = `${x},${(y + 1) % rows.length}`;
            if (!seaCucumbers.right.includes(newPosition) && !seaCucumbers.down.includes(newPosition)) newSeaCucumbers.down[i] = newPosition;
            else newSeaCucumbers.down[i] = seaCucumbers.down[i];
        }

        if (!arrayEquals(seaCucumbers.down, newSeaCucumbers.down, false)) finished = false;
        seaCucumbers.down = newSeaCucumbers.down;

        step++;
    }

    return step;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    return '2021 DONE!';
};

export { part1, part2 };
