/**
 * puzzles/2023/day04/solution.ts
 * 
 * ~~ Scratchcards ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/3/2023
 */

interface Card {
    winning: number[];
    numbers: number[];
};

/**
 * code for part 1 of the advent of code puzzle
 */
const part1 = (input: string) => {
    // parses input to return a list of cards with winning numbers and numbers drawn
    const cards: Card[] = input.split(/\n/g).map(line => {
        let [winning, numbers] = line.split(/: /)[1].split(/ \| /).map(numbers => numbers.split(/ /).filter(number => number != '').map(num => parseInt(num)));
        return { winning, numbers };
    });

    // count all the winning numbers on each card and add them up (add using 2^(count-1)) 
    return cards.reduce((sum, card) => {
        let count = card.numbers.filter(num => card.winning.includes(num)).length;
        if (count > 0) sum += Math.pow(2, count - 1);
        return sum;
    }, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 */
const part2 = (input: string) => {
    // parses input to return a list of cards with winning numbers and numbers drawn
    const cards = input.split(/\n/g).map(line => {
        let [winning, numbers] = line.split(/: /)[1].split(/ \| /).map(numbers => numbers.split(/ /).filter(number => number != '').map(num => parseInt(num)));
        return { winning, numbers };
    });

    // use memoization to run the recursive function faster (skips cards already counted)
    let memoization: number[] = [];

    /**
     * returns the number of scratch cards that the card generates
     * 
     * @param card the card being counted
     * @param index index of card being counted
     */
    let countScratchCards = (card: Card, index: number): number => {
        if (memoization[index] != null) return memoization[index];

        let cardCount = 1;
        let wins = card.numbers.filter(num => card.winning.includes(num)).length;

        if (wins > 0) {
            for (let i = 0; i < wins; i++) {
                let nextIndex = index + i + 1;
                cardCount += countScratchCards(cards[nextIndex], nextIndex);
            }
        }
        
        memoization[index] = cardCount;
        return cardCount;
    }

    // count all cards
    return cards.reduce((sum, card, index) => {
        return sum + countScratchCards(card, index);
    }, 0);
}

export { part1, part2 };