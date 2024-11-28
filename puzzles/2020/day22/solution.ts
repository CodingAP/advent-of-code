// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day22/solution.ts
 *
 * ~~ Crab Combat ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

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
    let players = [[], []];
    
    let player = -1;
    let lines = input.trim().split('\n');
    lines.forEach(value => {
        if (value.startsWith('Player')) {
            player++;
            return;
        }
        if (value == '') return;

        players[player].push(parseInt(value));
    });

    while (true) {
        let player1Card = players[0].shift();
        let player2Card = players[1].shift();

        let cards = [player1Card, player2Card].sort((a, b) => b - a);

        if (player1Card > player2Card) players[0].push(cards[0], cards[1]);
        if (player2Card > player1Card) players[1].push(cards[0], cards[1]);

        if (players[0].length == 0 || players[1].length == 0) break;
    }

    let score = 0;
    for (let i = 0; i < players.length; i++) {
        if (players[i].length != 0) {
            for (let j = 0; j < players[i].length; j++) {
                score += (players[i].length - j) * players[i][j];
            }
        }
    }
    return score;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let playGame = players => {
        let previous = [];
        
        while (true) {
            let hasPrevious = false;
            previous.forEach(value => {
                if (arrayEquals(players[0], value[0]) && arrayEquals(players[1], value[1])) hasPrevious = true;
            });
            if (hasPrevious) return { winner: true, cards: [] };
            
            previous.push(structuredClone(players));
            
            let player1Card = players[0].shift();
            let player2Card = players[1].shift();
            
            if (player1Card <= players[0].length && player2Card <= players[1].length) {
                let win = playGame([players[0].slice(0, player1Card), players[1].slice(0, player2Card)]).winner;
                
                if (win) players[0].push(player1Card, player2Card);
                else players[1].push(player2Card, player1Card);
            } else {
                
                if (player1Card > player2Card) players[0].push(player1Card, player2Card);
                if (player2Card > player1Card) players[1].push(player2Card, player1Card);
            }

            if (players[0].length == 0) return { winner: false, cards: players };
            if (players[1].length == 0) return { winner: true, cards: players };
        }
    }
    
    let players = [[], []];

    let player = -1;
    let lines = input.trim().split('\n');
    lines.forEach(value => {
        if (value.startsWith('Player')) {
            player++;
            return;
        }
        if (value == '') return;

        players[player].push(parseInt(value));
    });
    
    let ending = playGame(players).cards;

    let score = 0;
    for (let i = 0; i < ending.length; i++) {
        if (ending[i].length != 0) {
            for (let j = 0; j < ending[i].length; j++) {
                score += (ending[i].length - j) * ending[i][j];
            }
        }
    }
    return score;
};

export { part1, part2 };
