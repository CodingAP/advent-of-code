// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2021/day21/solution.ts
 *
 * ~~ Dirac Dice ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let player1 = { space: 10, score: 0 };
    let player2 = { space: 4, score: 0 };

    let die = 0, times = 0;;
    let rollDie = () => {
        times++;

        die++;
        if (die > 100) die = 1;
        return die;
    }

    let turn = true;
    while (true) {
        let current = turn ? player1 : player2;

        let spaces = rollDie();
        spaces += rollDie();
        spaces += rollDie();

        current.space = (((current.space + spaces) - 1) % 10) + 1;
        current.score += current.space;

        if (current.score >= 1000) {
            let loser = turn ? player2 : player1;

            return loser.score * times;
        }
        turn = !turn;
    }
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let memoizedWins = {};

    let doTurn = (p1, p2, s1, s2) => {
        if (s2 >= 21) return [0, 1];
        
        let id = `${p1},${p2},${s1},${s2}`;
        if (memoizedWins[id]) return memoizedWins[id];

        let result = [0, 0];
        for (let die1 = 1; die1 <= 3; die1++) {
            for (let die2 = 1; die2 <= 3; die2++) {
                for (let die3 = 1; die3 <= 3; die3++) {
                    let totalDie = die1 + die2 + die3;
                    let n1 = (((p1 + totalDie) - 1) % 10) + 1;
                    let ns1 = s1 + n1;

                    let wins = doTurn(p2, n1, s2, ns1);
                    result[0] += wins[1];
                    result[1] += wins[0];
                }
            }
        }

        memoizedWins[id] = result;
        return result;
    }

    let [player1, player2] = doTurn(10, 4, 0, 0);
    
    if (player1 > player2) return player1;
    return player2;
};

export { part1, part2 };
