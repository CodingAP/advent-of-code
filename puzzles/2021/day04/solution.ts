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
 * checks for a bingo while mutating the original card
 */
const checkBingo = (card: number[][], newNumber: number) => {
    // mark number
    for (let y = 0; y < card.length; y++) {
        for (let x = 0; x < card[y].length; x++) {
            if (card[y][x] === newNumber) card[y][x] = -1;
        }
    }

    let bingo = false;
    
    // horizontal checking
    for (let y = 0; y < card.length; y++) {
        let horizontal = true;
        for (let x = 0; x < card[y].length; x++) {
            if (card[y][x] !== -1) horizontal = false;
        }
        if (horizontal) bingo = true;
    }

    // vertical checking
    for (let x = 0; x < card[0].length; x++) {
        let vertical = true;
        for (let y = 0; y < card.length; y++) {
            if (card[y][x] !== -1) vertical = false;
        }
        if (vertical) bingo = true;
    }

    return bingo;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const lines = input.trim().split('\n');
    const bingoNumbers = lines[0].split(',').map(num => parseInt(num));
    const bingoCards: number[][][] = [];
    let currentBingoCard: number[][] = [];

    // parse bingo cards
    for (let i = 2; i <= lines.length; i++) {
        if (lines[i] == '' || i == lines.length) {
            bingoCards.push(currentBingoCard);
            currentBingoCard = [];
        } else {
            let bingoRow = lines[i].trim().split(/\s+/).map(num => parseInt(num));
            currentBingoCard.push(bingoRow);
        }
    }

    // go through all cards and see if there are any bingos
    for (let i = 0; i < bingoNumbers.length; i++) {
        for (let j = 0; j < bingoCards.length; j++) {
            const current = bingoCards[j];
            const bingo = checkBingo(current, bingoNumbers[i]);

            // if there is a bingo, sum up all unmarked spots
            if (bingo) {
                let sum = 0;
                for (let y = 0; y < current.length; y++) {
                    for (let x = 0; x < current[y].length; x++) {
                        if (current[y][x] !== -1) sum += current[y][x];
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
    const lines = input.trim().split('\n');
    const bingoNumbers = lines[0].split(',').map(num => parseInt(num));
    let bingoCards: number[][][] = [];
    let currentBingoCard: number[][] = [];

    // parse bingo cards
    for (let i = 2; i <= lines.length; i++) {
        if (lines[i] == '' || i == lines.length) {
            bingoCards.push(currentBingoCard);
            currentBingoCard = [];
        } else {
            let bingoRow = lines[i].trim().split(/\s+/).map(num => parseInt(num));
            currentBingoCard.push(bingoRow);
        }
    }

    let remove: number[] = [];
    // go through all cards and see if there are any bingos
    for (let i = 0; i < bingoNumbers.length; i++) {
        for (let j = 0; j < bingoCards.length; j++) {
            const current = bingoCards[j];
            const bingo = checkBingo(current, bingoNumbers[i]);

            // if there is a bingo, check to see if it is the last one
            if (bingo) {
                if (bingoCards.length === 1) {
                    let sum = 0;
                    for (let y = 0; y < current.length; y++) {
                        for (let x = 0; x < current[y].length; x++) {
                            if (current[y][x] !== -1) sum += current[y][x];
                        }
                    }

                    return sum * bingoNumbers[i];
                } else {
                    // if not last one, remove it from list
                    remove.push(j);
                }
            }
        }

        bingoCards = bingoCards.filter((_, i) => !remove.includes(i));
        remove = [];
    }
};

export { part1, part2 };
