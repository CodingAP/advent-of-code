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

    // go for 20 generations
    for (let gen = 0; gen < 20; gen++) {
        // find first and last plant
        const min = Math.min(...Object.keys(state).filter(key => state[parseInt(key)]).map(num => parseInt(num)));
        const max = Math.max(...Object.keys(state).filter(key => state[parseInt(key)]).map(num => parseInt(num)));
        const newState: { [key: number]: boolean } = {};

        // go through all plants and find new plants from them
        for (let i = min - 4; i <= max + 4; i++) {
            let current = '';
            for (let j = -2; j <= 2; j++) {
                if (state[i + j] === undefined) state[i + j] = false;
                current += state[i + j] ? '#' : '.';
            }

            newState[i] = rules[current] === '#';
        }

        state = newState;
    }

    return Object.entries(state).map(([i, plant]) => plant ? parseInt(i) : 0).reduce((sum, num) => sum + num, 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
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

    // a pattern emerges after a certain time where the plants gain a specific amount each time
    // find the amount and extrapolate
    const differences: { [key: number]: number } = {};
    let current = 0, generation = 0;
    while (true) {
        // find first and last plant
        const min = Math.min(...Object.keys(state).filter(key => state[parseInt(key)]).map(num => parseInt(num)));
        const max = Math.max(...Object.keys(state).filter(key => state[parseInt(key)]).map(num => parseInt(num)));
        const newState: { [key: number]: boolean } = {};

        // go through all plants and find new plants from them
        for (let i = min - 4; i <= max + 4; i++) {
            let current = '';
            for (let j = -2; j <= 2; j++) {
                if (state[i + j] === undefined) state[i + j] = false;
                current += state[i + j] ? '#' : '.';
            }

            newState[i] = rules[current] === '#';
        }

        const newValue = Object.entries(state).map(([i, plant]) => plant ? parseInt(i) : 0).reduce((sum, num) => sum + num, 0);
        const difference = newValue - current;
        differences[difference] = (differences[difference] || 0) + 1;

        if (differences[difference] >= 100) return newValue + (50000000000 - generation) * difference;
        
        generation++;
        current = newValue;
        state = newState;
    }
};

export { part1, part2 };
