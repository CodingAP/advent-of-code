const common = require('../../../scripts/common');
const input = common.readInput('./years/2017/day12/input.txt');

module.exports = () => {
    let connections = input.split('\n');
    let programs = [];

    for (let i = 0; i < connections.length; i++) {
        let tokens = connections[i].replace(/\s/g, '').split('<->');

        programs[parseInt(tokens[0])] = common.parseListToInt(tokens[1], ',');
    }

    let checkForProgram = (program, history) => {
        if (program == 0) return true;
        if (history.includes(program)) return false;
        history.push(program);
        for (let i = 0; i < programs[program].length; i++) {
            if (checkForProgram(programs[program][i], history)) return true;
        }
        return false;
    }

    let sum = 0;
    for (let i = 0; i < programs.length; i++) {
        if (checkForProgram(i, [])) sum++;
    }
    return sum;
}