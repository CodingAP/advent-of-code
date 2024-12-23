/**
 * puzzles/2019/day22/solution.ts
 *
 * ~~ Slam Shuffle ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/22/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let cards = new Array(10007).fill('').map((_, i) => i);

    input.trim().split('\n').forEach(line => {
        const tokens = line.split(' ');

        if (tokens[1] === 'into') {
            cards = cards.reverse();
        } else if (tokens[1] === 'with') {
            const newCards = [];
            const increment = parseInt(tokens[3]);
            let i = 0, index = 0;
            while (i !== cards.length) {
                newCards[index] = cards[i++];
                index = (index + increment) % cards.length;
            }
            cards = newCards;
        } else {
            const cut = parseInt(tokens[1]);
            cards = [...cards.slice(cut), ...cards.slice(0, cut)];
        }
    });

    return cards.findIndex(card => card === 2019);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    return 0;
};

export { part1, part2 };
