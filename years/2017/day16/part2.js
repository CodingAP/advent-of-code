const input = require('fs').readFileSync('./years/2017/day16/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let scrambler = 'abcde'.split('');

    let instructions = input.split(',');
    for (let count = 0; count < 1000000000; count++) {
        for (let i = 0; i < instructions.length; i++) {
            let temp = 0;
            switch (instructions[i].charAt(0)) {
                case 's':
                    for (let s = 0; s < parseInt(instructions[i].slice(1)); s++) scrambler.unshift(scrambler.pop());
                    break;
                case 'x':
                    let indices = instructions[i].slice(1).split(/\//).map(value => parseInt(value));

                    temp = scrambler[indices[0]];
                    scrambler[indices[0]] = scrambler[indices[1]];
                    scrambler[indices[1]] = temp;
                    break;
                case 'p':
                    let letterIndices = instructions[i].slice(1).split(/\//).map(value => scrambler.indexOf(value));

                    temp = scrambler[letterIndices[0]];
                    scrambler[letterIndices[0]] = scrambler[letterIndices[1]];
                    scrambler[letterIndices[1]] = temp;
                    break;
            }
        }
    }
    return scrambler.join('');
}