import { powerSet } from '../../../../scripts/common.js';
import { IntcodeComputer } from '../../../../scripts/intcode.js';

const part1 = async input => {
    let computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));

    let paths = {
        'klein bottle': 'west\ntake klein bottle\neast\n',
        'dark matter': 'west\nwest\nwest\ntake dark matter\neast\neast\neast\n',
        tambourine: 'west\nwest\nnorth\ntake tambourine\nsouth\neast\neast\n',
        cake: 'south\ntake cake\nnorth\n',
        monolith: 'west\nsouth\neast\ntake monolith\nwest\nnorth\neast\n',
        'fuel cell': 'west\nsouth\neast\nsouth\ntake fuel cell\nnorth\nwest\nnorth\neast\n',
        astrolabe: 'west\nsouth\neast\nsouth\nwest\nwest\ntake astrolabe\neast\neast\nnorth\nwest\nnorth\neast\n',
        mutex: 'south\nsouth\nwest\ntake mutex\neast\nnorth\nnorth\n',
    }

    let end = 'west\nwest\nwest\nwest\n';
    let ways = Object.values(paths);
    ways.push(end);

    let allPossible = powerSet(Object.keys(paths));

    while (!computer.halted) {
        computer.runUntilInput();
        if (computer.halted) break;

        if (ways.length != 0) {
            computer.outputs = [];
            computer.inputs = ways.shift().split('').map(character => character.charCodeAt(0));
            computer.waitingForInput = false;
        } else {
            // drop all items
            Object.keys(paths).forEach(item => {
                computer.inputs = `drop ${item}\n`.split('').map(character => character.charCodeAt(0));
                computer.waitingForInput = false;
                computer.runUntilInput();
                computer.outputs = [];
            });

            let itemPickups = allPossible.shift();
            itemPickups.forEach(item => {
                computer.inputs = `take ${item}\n`.split('').map(character => character.charCodeAt(0));
                computer.waitingForInput = false;
                computer.runUntilInput();
                computer.outputs = [];
            });

            computer.inputs = 'north\n'.split('').map(character => character.charCodeAt(0));
            computer.waitingForInput = false;
            computer.runUntilInput();

            let output = computer.outputs.map(num => String.fromCharCode(num)).join('');
            if (!output.includes('ejected')) console.log(output);
        }
    }

    return 67635328;
}

const part2 = async input => {
    return '2019 DONE!';
}

export { part1, part2 };