const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config();

const currentDay = new Date();

let options = {
    day: '' + currentDay.getDate(),
    year: '' + currentDay.getFullYear(),
    out: `${currentDay.getDate()}.in`,
    modified: false
};

const commandArgs = process.argv.slice(2);
for (let i = 0; i < commandArgs.length; i++) {
    let parts = commandArgs[i].split('=');
    options.modified = true;
    switch (parts[0]) {
        case '--day':
            options.day = parts[1];
            options.out = parts[1] + '.in';
            break;
        case '--year':
            options.year = parts[1];
            break;
    }
}

const template = fs.readFileSync('./template.tpl').toString().replace('$year', options.year).replace('$out', options.out);

(async () => {
    if (options.day > 0 && options.day <= 25 && (options.modified || currentDay.getMonth() == 11)) {
        const response = await fetch(
            `https://adventofcode.com/${options.year}/day/${options.day}/input`, { headers: { cookie: `session=${process.env.SESSION_ID}` } }
        );
        
        let body = await response.text();
        fs.writeFile(`inputs/${options.year}/${options.out}`, body, (err) => {
            if (err) throw err;
            console.log(`Saved input to ${options.out}!`);
        });
            
        fs.writeFile(`solutions/${options.year}/day${options.day}.js`, template, (err) => {
            if (err) throw err;
            console.log(`Saved program to day${options.day}.js!`);
        });
    }
})();