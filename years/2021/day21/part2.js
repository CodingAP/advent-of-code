module.exports = input => {
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
}