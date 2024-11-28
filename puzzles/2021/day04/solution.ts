// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2021/day04/solution.ts
 *
 * ~~ Giant Squid ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let lines = input.trim().split('\n');
    let bingoNumbers = input.split(',').map(num => parseInt(num));
    let bingoCards = [];
    let currentBingoCard = [];

    lines = lines.slice(2);
    for (let i = 0; i <= lines.length; i++) {
        if (lines[i] == '' || i == lines.length) {
            bingoCards.push(currentBingoCard);
            currentBingoCard = [];
        } else {
            let bingoRow = lines[i].trim().split(/\s+/).map(num => parseInt(num));
            currentBingoCard.push(bingoRow);
        }
    }

    for (let i = 0; i < bingoNumbers.length; i++) {
        for (let j = 0; j < bingoCards.length; j++) {
            for (let k = 0; k < bingoCards[j].length; k++) {
                for (let l = 0; l < bingoCards[j][k].length; l++) {
                    if (bingoCards[j][k][l] == bingoNumbers[i]) bingoCards[j][k][l] = true;
                }
            }

            let bingo = false;
            // Horizontal checking
            for (let k = 0; k < bingoCards[j].length; k++) {
                let horizontal = true;
                for (let l = 0; l < bingoCards[j][k].length; l++) {
                    if (typeof bingoCards[j][k][l] !== 'boolean') horizontal = false;
                }
                if (horizontal) bingo = true;
            }

            // Vertical checking
            for (let k = 0; k < bingoCards[j].length; k++) {
                let vertical = true;
                for (let l = 0; l < bingoCards[j][k].length; l++) {
                    if (typeof bingoCards[j][l][k] !== 'boolean') vertical = false;
                }
                if (vertical) bingo = true;
            }

            if (bingo) {
                let sum = 0;
                for (let k = 0; k < bingoCards[j].length; k++) {
                    for (let l = 0; l < bingoCards[j][k].length; l++) {
                        if (typeof bingoCards[j][k][l] === 'number') {
                            sum += bingoCards[j][k][l];
                        }
                    }
                }
                return sum * bingoNumbers[i];
            }
        }
    }
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let lines = input.trim().split('\n');
    let bingoNumbers = input.split(',').map(num => parseInt(num));
    let bingoCards = [];
    let currentBingoCard = [];

    lines = lines.slice(2);
    for (let i = 0; i <= lines.length; i++) {
        if (lines[i] == '' || i == lines.length) {
            bingoCards.push(currentBingoCard);
            currentBingoCard = [];
        } else {
            let bingoRow = lines[i].trim().split(/\s+/).map(num => parseInt(num));
            currentBingoCard.push(bingoRow);
        }
    }

    let remove = [];
    for (let i = 0; i < bingoNumbers.length; i++) {
        for (let j = 0; j < bingoCards.length; j++) {
            for (let k = 0; k < bingoCards[j].length; k++) {
                for (let l = 0; l < bingoCards[j][k].length; l++) {
                    if (bingoCards[j][k][l] == bingoNumbers[i]) bingoCards[j][k][l] = true;
                }
            }

            let bingo = false;
            // Horizontal checking
            for (let k = 0; k < bingoCards[j].length; k++) {
                let horizontal = true;
                for (let l = 0; l < bingoCards[j][k].length; l++) {
                    if (typeof bingoCards[j][k][l] !== 'boolean') horizontal = false;
                }
                if (horizontal) bingo = true;
            }

            // Vertical checking
            for (let k = 0; k < bingoCards[j].length; k++) {
                let vertical = true;
                for (let l = 0; l < bingoCards[j][k].length; l++) {
                    if (typeof bingoCards[j][l][k] !== 'boolean') vertical = false;
                }
                if (vertical) bingo = true;
            }

            if (bingo) {
                if (bingoCards.length == 1) {
                    let sum = 0;
                    for (let k = 0; k < bingoCards[0].length; k++) {
                        for (let l = 0; l < bingoCards[0][k].length; l++) {
                            if (typeof bingoCards[0][k][l] === 'number') {
                                sum += bingoCards[0][k][l];
                            }
                        }
                    }
                    return sum * bingoNumbers[i];
                } else remove.push(j);
            }
        }

        for (let j = 0; j < remove.length; j++) {
            bingoCards[remove[j]] = null;
        }
        bingoCards = bingoCards.filter(element => element != null);
        remove = [];
    }
};

export { part1, part2 };
