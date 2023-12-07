/**
 * aoc/puzzles/2023/day07/solution.js
 * 
 * ~~ Camel Cards ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/6/2023
 */

const ranks = {
    FIVE_KIND: 6,
    FOUR_KIND: 5,
    FULL_HOUSE: 4,
    THREE_KIND: 3,
    TWO_PAIR: 2,
    ONE_PAIR: 1,
    HIGH_CARD: 0
}

/**
 * returns value of the hand, allows for sorting
 * 
 * @param {string} hand string representation of the hand (length 5 containing only AKQJT98765432)
 * @returns {number}
 */
const getHandRank = hand => {
    // count all cards
    const counts = Object.values(hand.split('').reduce((obj, character) => {
        if (obj[character] == null) obj[character] = 0;
        obj[character]++;
        return obj;
    }, {}));

    if (counts.includes(5)) return ranks.FIVE_KIND;
    else if (counts.includes(4)) return ranks.FOUR_KIND;
    else if (counts.includes(3) && counts.includes(2)) return ranks.FULL_HOUSE;
    else if (counts.includes(3)) return ranks.THREE_KIND;
    else if (counts.filter(num => num == 2).length == 2) return ranks.TWO_PAIR;
    else if (counts.includes(2)) return ranks.ONE_PAIR;
    return ranks.HIGH_CARD;
}

/**
 * produces the cartesian product of the arguments
 * 
 * @param  {...string[]} a any amount of arrays
 * @returns {string[][]}
 */
const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // parse input
    const hands = input.split(/\n/g).map(line => {
        const [hand, bid] = line.split(/ /g);
        return { hand, rank: getHandRank(hand), bid: parseInt(bid) };
    });

    const cards = 'AKQJT98765432';

    // sort all hands based of value, then by highest card
    // add up all cards by rank * bid
    return hands.sort((a, b) => {
        if (a.rank != b.rank) return a.rank - b.rank;

        for (let i = 0; i < a.hand.length; i++) {
            if (a.hand[i] != b.hand[i]) {
                return cards.indexOf(b.hand[i]) - cards.indexOf(a.hand[i]);
            }
        }
        return 0;
    }).reduce((sum, hand, index) => sum + hand.bid * (index + 1), 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // parse input
    const hands = input.split(/\n/g).map(line => {
        const [hand, bid] = line.split(/ /g);

        // count how many Js and try all possible if one is a J
        let jCount = 0;
        const cards = hand.split('').map(card => {
            if (card == 'J') {
                jCount++;
                return 'AKQT98765432'.split('');
            } else return [card];
        });

        // if there are 4 or 5 J's, then we know the best is a FIVE_KIND
        // else try all possible replacements for J's
        let rank = ranks.FIVE_KIND;
        if (jCount < 4) {
            rank = cartesian(...cards).reduce((max, hand) => {
                return Math.max(max, getHandRank(hand.join('')));
            }, -Infinity);
        }

        return { hand, rank, bid: parseInt(bid) };
    });

    const cards = 'AKQT98765432J';

    // sort all hands based of value, then by highest card
    // add up all cards by rank * bid
    return hands.sort((a, b) => {
        if (a.rank != b.rank) return a.rank - b.rank;

        for (let i = 0; i < a.hand.length; i++) {
            if (a.hand[i] != b.hand[i]) {
                return cards.indexOf(b.hand[i]) - cards.indexOf(a.hand[i]);
            }
        }
        return 0;
    }).reduce((sum, hand, index) => sum + hand.bid * (index + 1), 0);
}

export { part1, part2 };