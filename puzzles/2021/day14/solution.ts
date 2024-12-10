/**
 * puzzles/2021/day14/solution.ts
 *
 * ~~ Extended Polymerization ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

const expandPolymer = (polymer: string, replacements: { [key: string]: string }, steps: number): { [key: string]: number } => {
    const pairs: { [key: string]: number } = {};
    const occurences: { [key: string]: number } = {};
    for (let i = 1; i < polymer.length; i++) {
        const pair = polymer[i - 1] + polymer[i];
        pairs[pair] = (pairs[pair] || 0) + 1;
        occurences[pair[0]] = (occurences[pair[0]] || 0) - 1;
    }

    for (let step = 0; step < steps; step++) {
        Object.entries(pairs).forEach(([pair, frequency]) => {
            if (replacements[pair] && pairs[pair] != 0) {
                const left = pair[0] + replacements[pair];
                pairs[left] = (pairs[left] || 0) + frequency;

                const right = replacements[pair] + pair[1];
                pairs[right] = (pairs[right] || 0) + frequency;

                pairs[pair] -= frequency;
                occurences[replacements[pair]] = (occurences[replacements[pair]] || 0) - frequency;
            }
        });
    }

    Object.keys(pairs).forEach(element => {
        occurences[element[0]] = (occurences[element[0]] || 0) + pairs[element];
        occurences[element[1]] = (occurences[element[1]] || 0) + pairs[element];
    });

    return occurences;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const [initalPolymer, rules] = input.split('\n\n');

    const replacements = rules.split('\n').reduce<{ [key: string]: string }>((obj, element) => {
        const [left, right] = element.split(' -> ');
        obj[left] = right;
        return obj;
    }, {});

    const occurences = expandPolymer(initalPolymer, replacements, 10);

    const sorted = Object.values(occurences).sort((a, b) => a - b);
    return sorted[sorted.length - 1] - sorted[0] - 1;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const [initalPolymer, rules] = input.split('\n\n');

    const replacements = rules.split('\n').reduce<{ [key: string]: string }>((obj, element) => {
        const [left, right] = element.split(' -> ');
        obj[left] = right;
        return obj;
    }, {});

    const occurences = expandPolymer(initalPolymer, replacements, 40);

    const sorted = Object.values(occurences).sort((a, b) => a - b);
    return sorted[sorted.length - 1] - sorted[0] - 1;
};

export { part1, part2 };
