const common = require('../../../scripts/common');
const input = common.readInput('./years/2016/day21/input.txt');

module.exports = () => {
    let scrambler = 'abcdefgh'.split('');

    let instructions = input.split('\n');
    for (let i = 0; i < instructions.length; i++) {
        let tokens = instructions[i].split(' ');
        if (tokens[0] == 'swap') {
            if (tokens[1] == 'position') {
                let first = parseInt(tokens[2]);
                let second = parseInt(tokens[5]);

                let temp = scrambler[first];
                scrambler[first] = scrambler[second];
                scrambler[second] = temp;
            } else if (tokens[1] == 'letter') {
                let first = scrambler.indexOf(tokens[2]);
                let second = scrambler.indexOf(tokens[5]);

                let temp = scrambler[first];
                scrambler[first] = scrambler[second];
                scrambler[second] = temp;
            }
        } else if (tokens[0] == 'rotate') {
            if (tokens[1] == 'left') {
                for (let s = 0; s < parseInt(tokens[2]); s++) scrambler.push(scrambler.shift());
            } else if (tokens[1] == 'right') {
                for (let s = 0; s < parseInt(tokens[2]); s++) scrambler.unshift(scrambler.pop());
            } else if (tokens[1] == 'based') {
                let index = scrambler.indexOf(tokens[6]);
                let times = 1 + index + ((index >= 4) ? 1 : 0);
                for (let s = 0; s < times; s++) scrambler.unshift(scrambler.pop());
            }
        } else if (tokens[0] == 'reverse') {
            let first = parseInt(tokens[2]);
            let second = parseInt(tokens[4]);

            let part = scrambler.slice(first, second + 1).reverse();
            for (let i = 0; i < part.length; i++) {
                scrambler[first + i] = part[i];
            }
        } else if (tokens[0] == 'move') {
            let first = parseInt(tokens[2]);
            let second = parseInt(tokens[5]);

            let removed = scrambler.splice(first, 1);
            scrambler.splice(second, 0, removed[0]);
        }
    }
    return scrambler.join('');
}