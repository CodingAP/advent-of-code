/**
 * puzzles/2018/day12/solution.ts
 *
 * ~~ Subterranean Sustainability ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/2/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const [initial, transforms] = input.trim().split('\n\n');

    // intitialize state
    let state: { [key: number]: boolean } = {};
    initial.split(': ')[1].split('').forEach((char, i) => {
        state[i] = char === '#';
    });

    // parse rules
    const rules = transforms.split('\n').reduce<{ [key: string]: string }>((obj, line) => {
        const [left, right] = line.split(' => ');
        obj[left] = right;
        return obj;
    }, {});

    for (let gen = 0; gen < 1; gen++) {
        const min = Math.min(...Object.keys(state).map(num => parseInt(num)));
        const max = Math.max(...Object.keys(state).map(num => parseInt(num)));
        const newState: { [key: number]: boolean } = {};

        let debug = '';
        for (let i = min; i <= max; i++) {
            // let current = '';
            // for (let j = -2; j <= 2; j++) {
            //     if (state[i + j] === undefined) {
            //         state[i + j] = false;
            //         newState[i + j] = false;
            //     }
            //     current += state[i + j] ? '.' : '#';
            // }

            // newState[i] = rules[current] === '#';
            // debug += rules[current] ? '#' : '.';
            debug += state[i] ? '#' : '.';
        }

        state = newState;
        console.log(debug);
    }

    return Object.values(state).map((plant, i) => plant ? i : 0).reduce((sum, num) => sum + num, 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    return 0;
};

export { part1, part2 };
