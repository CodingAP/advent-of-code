const fs = require('fs');
const runDay = require('./runner');

let final = fs.readFileSync('./scripts/md_template').toString().split('\n');
const line = final[0];
final = final.slice(1).join('\n');

for (let year = 2015; year <= 2020; year++) {
    let table = '';
    for (let day = 1; day <= 25; day++) {
        let answers = runDay(day, year);
        if (answers != null) {
            let newLine = '';
            newLine = line.replace(/\$year\$/g, year).replace(/\$day\$/g, day);
            if (answers.part1 != 0) {
                newLine = newLine.replace(/\$part1\$/, answers.part1);
                newLine = newLine.replace(/\$mark1\$/, '✔');
                newLine = newLine.replace(/\$time1\$/, ` (${answers.time1} ms)`);
            } else {
                newLine = newLine.replace(/\$part1\$/, 'Not finished');
                newLine = newLine.replace(/\$mark1\$/, '❌');
                newLine = newLine.replace(/\$time1\$/, ``);
            }

            if (answers.part2 != 0) {
                newLine = newLine.replace(/\$part2\$/, answers.part2);
                newLine = newLine.replace(/\$mark2\$/, '✔');
                newLine = newLine.replace(/\$time2\$/, ` (${answers.time2} ms)`);
            } else {
                newLine = newLine.replace(/\$part2\$/, 'Not finished');
                newLine = newLine.replace(/\$mark2\$/, '❌');
                newLine = newLine.replace(/\$time2\$/, ``);
            }
            newLine += '\n'
            table += newLine;
        }
    }
    final = final.replace(`$${year}table$`, table);
}

fs.writeFile('./README.md', final, (err) => {
    if (err) throw err;
    console.log(`Updated README.md!`);
});