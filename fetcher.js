const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config();

const currentDay = new Date();

let options = {
    day: '' + currentDay.getDate(),
    year: '' + currentDay.getFullYear(),
    modified: false
};

const commandArgs = process.argv.slice(2);
for (let i = 0; i < commandArgs.length; i++) {
    let parts = commandArgs[i].split('=');
    options.modified = true;
    switch (parts[0]) {
        case '--day':
            options.day = parts[1];
            break;
        case '--year':
            options.year = parts[1];
            break;
    }
}

const template = fs.readFileSync('./template.tpl').toString().replace(/\$year\$/, options.year).replace(/\$day\$/, options.day);

(async () => {
    if (options.day > 0 && options.day <= 25 && (options.modified || currentDay.getMonth() == 11)) {
        const response = await fetch(
            `https://adventofcode.com/${options.year}/day/${options.day}/input`, { headers: { cookie: `session=${process.env.SESSION_ID}` } }
        );
        
        let body = await response.text();

        let dir = `./years/${options.year}/day${options.day}`;
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);

        fs.writeFile(dir + '/input.txt', body, (err) => {
            if (err) throw err;
            console.log(`Saved input for day ${options.day}!`);
        });
            
        fs.writeFile(dir + '/part1.js', template, (err) => {
            if (err) throw err;
            console.log(`Saved part 1 of day ${options.day}!`);
        });

        fs.writeFile(dir + '/part2.js', template, (err) => {
            if (err) throw err;
            console.log(`Saved part 2 of day ${options.day}!`);
        });

        fs.writeFile(dir + '/README.md', '', (err) => {
            if (err) throw err;
            console.log(`Saved the README of day ${options.day}!`);
        });
    }
})();