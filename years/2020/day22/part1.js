module.exports = input => {
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
}