const fs = require('fs');
const Database = require('./database');

let final = fs.readFileSync('./scripts/md_template').toString().split('\n');
const line = final[0];
final = final.slice(1).join('\n');

let updateMD = async () => {
    let tables = {
        '2020': [],
        '2019': [],
        '2018': [],
        '2017': [],
        '2016': [],
        '2015': []
    }

    let answersDB = new Database('./scripts/answers.db');
    let allDays = Object.keys(answersDB.entries);
    for (let i = 0; i < allDays.length; i++) {
        let data = answersDB.get(allDays[i]);
        tables[data[1]].push(data);
    }

    let allYears = Object.keys(tables);
    for (let i = 0; i < allYears.length; i++) {
        tables[allYears[i]].sort((a, b) => a[0] - b[0]);

        let table = '';
        for (let day = 1; day <= 25; day++) {
            let data = null;
            for (let j = 0; j < tables[allYears[i]].length; j++) {
                if (!tables[allYears[i]][j]) continue;
                if (day == tables[allYears[i]][j][0]) data = tables[allYears[i]][j];
            }

            let newLine = line.replace(/\$year\$/g, allYears[i]).replace(/\$day\$/g, day);

            if (data) {
                newLine = newLine.replace(/\$part1\$/, data[2]);
                newLine = newLine.replace(/\$mark1\$/, '✔');
                newLine = newLine.replace(/\$time1\$/, ` (${data[3]} ms)`);
                newLine = newLine.replace(/\$part2\$/, data[4]);
                newLine = newLine.replace(/\$mark2\$/, '✔');
                newLine = newLine.replace(/\$time2\$/, ` (${data[5]} ms)`);
            } else {
                newLine = newLine.replace(/\$part1\$/, 'Not finished');
                newLine = newLine.replace(/\$mark1\$/, '❌');
                newLine = newLine.replace(/\$time1\$/, '');
                newLine = newLine.replace(/\$part2\$/, 'Not finished');
                newLine = newLine.replace(/\$mark2\$/, '❌');
                newLine = newLine.replace(/\$time2\$/, '');
            }
            newLine += '\n'
            table += newLine;
        }

        final = final.replace(`$${allYears[i]}table$`, table);
    }

    fs.writeFile('./README.md', final, (err) => {
        if (err) throw err;
        console.log(`Updated README.md!`);
    });
}

if (require.main === module) {
    updateMD();
} else {
    module.exports = updateMD;
}