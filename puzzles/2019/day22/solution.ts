/**
 * puzzles/2019/day22/solution.ts
 *
 * ~~ Slam Shuffle ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/22/2024
 */

const powMod = (n: bigint, power: bigint, mod: bigint): bigint => {
    if (power === 0n) return 1n % mod;
    if (power % 2n === 1n) return n * powMod(n, power - 1n, mod) % mod;
    return powMod(n * n % mod, power / 2n, mod);
}

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
            const newCards: number[] = [];
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
    const DECK_SIZE = 119315717514047n;
    const SHUFFLE_COUNT = 101741582076661n;
    
    const INSTRUCTIONS: { [key: string]: (a: bigint, b: bigint, arg: bigint) => { a: bigint, b: bigint }} = {
        new: (a, b, _) => ({ a: (-a + DECK_SIZE) % DECK_SIZE, b: (DECK_SIZE - 1n - b) % DECK_SIZE }),
        increment: (a, b, arg) => ({ a: a * arg % DECK_SIZE, b: b * arg % DECK_SIZE }),
        cut: (a, b, arg) => ({ a, b: (b - arg) % DECK_SIZE })
    }

    const instructions = input.trim().split('\n').map(line => {
        const tokens = line.split(' ');
        if (tokens[1] === 'into') return { instruction: 'new', arg: 0n };
        else if (tokens[1] === 'with') return { instruction: 'increment', arg: BigInt(tokens[3]) };
        else return { instruction: 'cut', arg: BigInt(tokens[1]) };
    });

    let a = 1n, b = 0n;
    instructions.forEach(instruction => {
        const results = INSTRUCTIONS[instruction.instruction](a, b, instruction.arg);
        a = results.a;
        b = results.b;
    });

    const r = (b * powMod(1n - a, DECK_SIZE - 2n, DECK_SIZE)) % DECK_SIZE;
    return ((2020n - r) * powMod(a, SHUFFLE_COUNT * (DECK_SIZE - 2n), DECK_SIZE) + r) % DECK_SIZE;
};

export { part1, part2 };
