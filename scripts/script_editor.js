const fs = require('fs');
for (let year = 2015; year <= 2020; year++) {
    for (let day = 1; day <= 25; day++) {
        fs.readFile(`./years/${year}/day${day}/part1.js`, (rerror, result) => {
            if (rerror) throw rerror;
            let lines = result.toString().replace(/\r/g, '').split('\n');
            lines[0] = `const common = require('../../../scripts/common');`;
            lines[1] = `const input = common.readInput('./years/${year}/day${day}/input.txt');`;

            let final = lines.join('\n');
            fs.writeFileSync(`./years/${year}/day${day}/part1.js`, final, werror => {
                if (werror) throw werror;
            });
        });
    }
}