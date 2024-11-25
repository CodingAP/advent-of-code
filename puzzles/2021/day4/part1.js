const common = require('../../../scripts/common');

module.exports = input => {
    let lines = input.split('\n');
    let bingoNumbers = common.parseListToInt(lines[0], ',');
    let bingoCards = [];
    let currentBingoCard = [];

    lines = lines.slice(2);
    for (let i = 0; i <= lines.length; i++) {
        if (lines[i] == '' || i == lines.length) {
            bingoCards.push(currentBingoCard);
            currentBingoCard = [];
        } else {
            let bingoRow = common.parseListToInt(lines[i].split(' ').filter(element => element != '').join(' '), ' ');
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
}