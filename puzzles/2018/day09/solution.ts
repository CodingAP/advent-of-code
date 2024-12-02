/**
 * puzzles/2018/day09/solution.ts
 *
 * ~~ Marble Mania ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/1/2024
 */

/**
 * doubly linked list node
 */
interface Node {
    value: number;
    prev?: Node;
    next?: Node;
}

/**
 * simulates the marble game with the given settings
 * 
 * @param maxPlayers - player count
 * @param lastMarble - the score of the last marble
 * @returns the maximum score of any player
 */
const playGame = (maxPlayers: number, lastMarble: number): number => {
    // initialize doubly linked list
    let current: Node = { value: 0 };
    current.prev = current;
    current.next = current;

    // player scores
    const players = new Array(maxPlayers).fill(0);
    let currentPlayer = maxPlayers - 1;

    for (let marble = 1; marble <= lastMarble; marble++) {
        currentPlayer = (currentPlayer + 1) % maxPlayers;
        if (marble % 23 === 0) {
            players[currentPlayer] += marble;

            // go back 7 marbles
            let target = current;
            for(let i = 0; i < 7; i++) {
                if (target.prev !== undefined) target = target.prev;
            }

            // having to do undefined checks because next and prev uses ?
            if (target.next !== undefined && target.prev !== undefined) {
                // remove marble
                players[currentPlayer] += target.value;
                target.next.prev = target.prev;
                target.prev.next = target.next;
                current = target.next;
            }
        } else {
            const target = current.next;
            // having to do undefined checks because next and prev uses ?
            if (target !== undefined && target.next !== undefined && target.prev !== undefined) {
                // insert new marble
                const newMarble = { value: marble, prev: target, next: target.next };
                target.next.prev = newMarble;
                target.next = newMarble;
                current = newMarble;
            }
        }
    }

    // return maximum of all players
    return Math.max(...players);
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const tokens = input.trim().split(' ');
    const maxPlayers = parseInt(tokens[0]);
    const maxScore = parseInt(tokens[6]);

    return playGame(maxPlayers, maxScore);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const tokens = input.trim().split(' ');
    const maxPlayers = parseInt(tokens[0]);
    const maxScore = parseInt(tokens[6]) * 100;

    return playGame(maxPlayers, maxScore);
};

export { part1, part2 };
