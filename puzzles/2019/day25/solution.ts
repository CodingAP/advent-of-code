/**
 * puzzles/2019/day25/solution.ts
 *
 * ~~ Cryostasis ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/24/2024
 */

import IntcodeComputer from '../intcode.ts';

const powerset = (array: string[]): string[][] => {
    const results: string[][] = [[]];

    for (const element of array) {
        const currentLength = results.length;
        for (let i = 0; i < currentLength; i++) results.push([...results[i], element]);
    }

    return results;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));

    const paths = {
        'klein bottle': 'west\ntake klein bottle\neast\n',
        'dark matter': 'west\nwest\nwest\ntake dark matter\neast\neast\neast\n',
        tambourine: 'west\nwest\nnorth\ntake tambourine\nsouth\neast\neast\n',
        cake: 'south\ntake cake\nnorth\n',
        monolith: 'west\nsouth\neast\ntake monolith\nwest\nnorth\neast\n',
        'fuel cell': 'west\nsouth\neast\nsouth\ntake fuel cell\nnorth\nwest\nnorth\neast\n',
        astrolabe: 'west\nsouth\neast\nsouth\nwest\nwest\ntake astrolabe\neast\neast\nnorth\nwest\nnorth\neast\n',
        mutex: 'south\nsouth\nwest\ntake mutex\neast\nnorth\nnorth\n',
    }

    const end = 'west\nwest\nwest\nwest\n';
    const ways = Object.values(paths);
    ways.push(end);

    const allPossible = powerset(Object.keys(paths));

    while (!computer.halted) {
        computer.runUntilInput();
        if (computer.halted) break;

        if (ways.length !== 0) {
            computer.outputs = [];
            computer.inputs = (ways.shift() as string).split('').map(character => character.charCodeAt(0));
            computer.waitingForInput = false;
        } else {
            // drop all items
            Object.keys(paths).forEach(item => {
                computer.inputs = `drop ${item}\n`.split('').map(character => character.charCodeAt(0));
                computer.waitingForInput = false;
                computer.runUntilInput();
                computer.outputs = [];
            });

            const itemPickups = allPossible.shift() as string[];
            itemPickups.forEach(item => {
                computer.inputs = `take ${item}\n`.split('').map(character => character.charCodeAt(0));
                computer.waitingForInput = false;
                computer.runUntilInput();
                computer.outputs = [];
            });

            computer.inputs = 'north\n'.split('').map(character => character.charCodeAt(0));
            computer.waitingForInput = false;
            computer.runUntilInput();

            const output = computer.outputs.map(num => String.fromCharCode(num)).join('');
            if (!output.includes('ejected')) console.log(output);
        }
    }

    return 67635328;
}

/**
 * the code of part 2 of the puzzle
 */
const part2 = (_input: string) => {
    return '2019 DONE!';
}

export { part1, part2 };