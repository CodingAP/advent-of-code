/**
 * puzzles/2021/day21/solution.ts
 *
 * ~~ Dirac Dice ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

type Player = { space: number, score: number };

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const starting = input.split('\n').map(line => parseInt(line.split(': ')[1]));
    const player1: Player = { space: starting[0], score: 0 };
    const player2: Player = { space: starting[1], score: 0 };

    let die = 0, times = 0;
    
    const rollDie = () => {
        times++;

        die++;
        if (die > 100) die = 1;
        return die;
    }

    let turn = true;
    while (true) {
        const current = turn ? player1 : player2;
        const spaces = rollDie() + rollDie() + rollDie();

        current.space = (((current.space + spaces) - 1) % 10) + 1;
        current.score += current.space;

        if (current.score >= 1000) {
            const loser = turn ? player2 : player1;
            return loser.score * times;
        }

        turn = !turn;
    }
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const memo: { [key: string]: number[] } = {};

    /**
     * recursively try all dice combinations and see how many wins are gotten
     */
    const doTurn = (player1: Player, player2: Player): number[] => {
        if (player2.score >= 21) return [0, 1];
        
        const id = `${player1.space},${player2.space},${player1.score},${player2.score}`;
        if (memo[id]) return memo[id];

        let result = [0, 0];
        for (let die1 = 1; die1 <= 3; die1++) {
            for (let die2 = 1; die2 <= 3; die2++) {
                for (let die3 = 1; die3 <= 3; die3++) {
                    const totalDie = die1 + die2 + die3;
                    const newPlayer = structuredClone(player1);
                    newPlayer.space = (((player1.space + totalDie) - 1) % 10) + 1;
                    newPlayer.score += newPlayer.space;

                    const wins = doTurn(player2, newPlayer);
                    result[0] += wins[1];
                    result[1] += wins[0];
                }
            }
        }

        memo[id] = result;
        return result;
    }

    const starting = input.split('\n').map(line => parseInt(line.split(': ')[1]));
    const player1: Player = { space: starting[0], score: 0 };
    const player2: Player = { space: starting[1], score: 0 };

    return Math.max(...doTurn(player1, player2));
};

export { part1, part2 };
