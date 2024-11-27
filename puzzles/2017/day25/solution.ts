/**
 * puzzles/2017/day25/solution.ts
 *
 * ~~ The Halting Problem ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // parse the input
    // first part holds the starting state and steps
    let [diagnostics, ...blueprints] = input.trim().split('\n\n');
    let [state, count] = diagnostics.split('\n');
    state = state.split(' ')[3].replace(/\./g, '');
    const steps = parseInt(count.split(' ')[5]);

    // the rest is the state instructions
    const instructions = blueprints.reduce<{ [key: string]: { value: number, movement: number, state: string }[] }>((obj, blueprint) => {
        const lines = blueprint.split('\n');
        const name = lines[0].split(' ')[2].replace(/:/g, '');
        obj[name] = [];

        for (let i = 0; i < 2; i++) {
            const value = parseInt(lines[2 + i * 4 + 0].trim().replace(/\./g, '').split(' ').at(-1)!);
            const movement = lines[2 + i * 4 + 1].trim().replace(/\./g, '').split(' ').at(-1) === 'left' ? -1 : 1;
            const state = lines[2 + i * 4 + 2].trim().replace(/\./g, '').split(' ').at(-1)!;
            obj[name].push({ value, movement, state });
        }
        
        return obj;
    }, {});

    // simulate a turing machine
    const tape: { [key: number]: number } = {};
    let position = 0;
    for (let i = 0; i < steps; i++) {
        if (tape[position] === undefined) tape[position] = 0;
        
        const next = instructions[state][tape[position]];
        tape[position] = next.value;
        position += next.movement;
        state = next.state;
    }

    return Object.values(tape).filter(num => num === 1).length;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    return '2017 DONE!';
};

export { part1, part2 };
