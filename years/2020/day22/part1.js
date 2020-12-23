const input = require('fs').readFileSync('./years/2020/day22/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let players = [[], []];
    
    let player = -1;
    let lines = input.split(/\n/);
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

    console.log(players);
    return 0;
}