module.exports = input => {
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
}