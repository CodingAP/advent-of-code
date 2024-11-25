// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2022/day2/solution.ts
 * 
 * ~~ Rock Paper Scissors ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
 */

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ OLD CODE ~~~~~~~~~~~~~~~~~~~~~~~~~~
// This was written during the actual challenge
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const part1_old = input => {
    let moves = input.split('\n').reduce((acc, line) => {
        let [opponent, player] = line.split(' ');

        let win = false;
        let draw = false;
        if (opponent == 'A' && player == 'Y') win = true;
        if (opponent == 'B' && player == 'Z') win = true;
        if (opponent == 'C' && player == 'X') win = true;
        if (opponent == 'A' && player == 'X') draw = true;
        if (opponent == 'B' && player == 'Y') draw = true;
        if (opponent == 'C' && player == 'Z') draw = true;

        if (win) acc += 6;
        if (draw) acc += 3;

        if (player == 'X') acc += 1;
        if (player == 'Y') acc += 2;
        if (player == 'Z') acc += 3;
        return acc;
    }, 0)
    return moves;
}

const part2_old = input => {
    let moves = input.split('\n').reduce((acc, line) => {
        let [opponent, player] = line.split(' ');

        let win = { A: 'Y', B: 'Z', C: 'X' };
        let lose = { A: 'Z', B: 'X', C: 'Y' };
        let draw = { A: 'X', B: 'Y', C: 'Z' };
        if (player == 'X') {
            if (lose[opponent] == 'X') acc += 1;
            if (lose[opponent] == 'Y') acc += 2;
            if (lose[opponent] == 'Z') acc += 3;
        } else if (player == 'Y') {
            if (draw[opponent] == 'X') acc += 1;
            if (draw[opponent] == 'Y') acc += 2;
            if (draw[opponent] == 'Z') acc += 3;
            acc += 3;
        } else {
            if (win[opponent] == 'X') acc += 1;
            if (win[opponent] == 'Y') acc += 2;
            if (win[opponent] == 'Z') acc += 3;
            acc += 6;
        }

        return acc;
    }, 0)
    return moves;
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    const win = { A: 'Y', B: 'Z', C: 'X' };
    const draw = { A: 'X', B: 'Y', C: 'Z' };
    const points = { X: 1, Y: 2, Z: 3 };  

    return input.split('\n').reduce((acc, line) => {
        let [opponent, player] = line.split(' ');

        if (player == win[opponent]) acc += 6;
        if (player == draw[opponent]) acc += 3;
        acc += points[player];
        return acc;
    }, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    const win = { A: 'Y', B: 'Z', C: 'X', points: 6 };
    const lose = { A: 'Z', B: 'X', C: 'Y', points: 0 };
    const draw = { A: 'X', B: 'Y', C: 'Z', points: 3 };
    const points = { X: 1, Y: 2, Z: 3 };

    return input.split('\n').reduce((acc, line) => {
        let [opponent, player] = line.split(' ');
        let outcome = [lose, draw, win][points[player] - 1];
        acc += outcome.points + points[outcome[opponent]];
        return acc;
    }, 0);
}

export { part1, part2 };