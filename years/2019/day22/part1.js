const input = require('fs').readFileSync('./years/2019/day22/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let deck = new Array(10007).fill().map((value, index) => { return index });

    input.split('\n').forEach(value => {
        let tokens = value.split(' ');
        if (tokens[1] == 'into') deck.reverse();
        if (tokens[1] == 'with') {
            let increment = parseInt(tokens[3]);
            let newDeck = [];

            let index = 0;
            for (let i = 0; i < deck.length; i++) {
                newDeck[index % deck.length] = deck[i];
                index += increment;
            }

            deck = newDeck;
        }
        if (tokens[0] == 'cut') {
            let rotate = parseInt(tokens[1]);
            for (let s = 0; s < Math.abs(rotate); s++) {
                if (rotate < 0) deck.unshift(deck.pop());
                else deck.push(deck.shift());
            }
        }
    });

    return deck[2019];
}