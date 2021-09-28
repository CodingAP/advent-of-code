const fs = require('fs');

let editScript = (day, year, part) => {
    fs.readFile(`./years/${year}/day${day}/part${part}.js`, (rerror, result) => {
        if (rerror) throw rerror;
        let lines = result.toString().replace(/\r/g, '').split('\n');

        let defaultFile = lines[4] == '    return 0;';

        let commonWordOccurence = 0;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('const input')) lines[i] = '';
            if (lines[i] == 'module.exports = () => {') lines[i] = 'module.exports = input => {';

            let occurence = lines[i].split('common').length - 1;
            commonWordOccurence += occurence;
        }

        if (commonWordOccurence == 2 && !defaultFile) {
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].startsWith('const common')) lines[i] = '';
            }
        }

        for (let i = lines.length - 1; i >= 1; i--) {
            if (lines[i - 1] == '' && lines[i] == '') lines.splice(i, 1)
        }

        let final = lines.join('\n').trim();
        fs.writeFile(`./years/${year}/day${day}/part${part}.js`, final, werror => {
            if (werror) throw werror;
        });
    });
}

for (let year = 2015; year <= 2020; year++) {
    for (let day = 1; day <= 25; day++) {
        editScript(day, year, 1);
        editScript(day, year, 2);
    }
}