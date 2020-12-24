const input = require('fs').readFileSync('./years/2020/day22/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let playGame = players => {
        let previous = [];
        
        while (true) {
            let hasPrevious = false;
            previous.forEach(value => {
                if (common.arrayEquals(players[0], value[0]) && common.arrayEquals(players[1], value[1])) hasPrevious = true;
            });
            if (hasPrevious) return { winner: true, cards: [] };
            
            previous.push(common.copy(players));
            
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
    let lines = input.split(/\r\n/); //Laptop has \r from some reason
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
}