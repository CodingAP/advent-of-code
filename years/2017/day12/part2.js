const input = require('fs').readFileSync('./years/2017/day12/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let connections = input.split('\n');
    let programs = [];
    let groups = [];

    for (let i = 0; i < connections.length; i++) {
        let tokens = connections[i].replace(/\s/g, '').split('<->');

        programs[parseInt(tokens[0])] = common.parseListToInt(tokens[1], ',');
    }

    let checkForGroup = program => {
        let isContained = false;
        for (let i = 0; i < groups.length; i++) {
            if (groups[i].includes(program)) {
                isContained = true;
                let allContained = true;
                for (let j = 0; j < programs[program].length; j++) {
                    if (!groups[i].includes(programs[program][j])) {
                        allContained = false;
                        groups[i].push(programs[program][j]);
                        checkForGroup(programs[program][j]);
                        break;
                    }
                }
                if (allContained) return;
                break;
            }
        }
        if (!isContained) {
            groups.push([program, ...programs[program]]);
            for (let i = 0; i < programs[program].length; i++) {
                checkForGroup(programs[program][i]);
            }
        }
    }
    
    for (let i = 0; i < programs.length; i++) {
        checkForGroup(i)
    }

    console.log(groups);

    return groups.length;
}