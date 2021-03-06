const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config();

const currentDay = new Date();

let options = {
    day: '' + currentDay.getDate(),
    year: '' + currentDay.getFullYear()
};

const commandArgs = process.argv.slice(2);
for (let i = 0; i < commandArgs.length; i++) {
    let parts = commandArgs[i].split('=');
    switch (parts[0]) {
        case '--d':
        case '--day':
            options.day = parts[1];
            break;
        case '--y':
        case '--year':
            options.year = parts[1];
            break;
    }
}

let fetchDay = async (day, year) => {
    const template = fs.readFileSync('./scripts/template').toString().replace(/\$year\$/, year).replace(/\$day\$/, day);

    const response = await fetch(
        `https://adventofcode.com/${year}/day/${day}/input`, { headers: { cookie: `session=${process.env.SESSION_ID}` } }
    );

    let body = await response.text();

    let dir = `./years/${year}/day${day}`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    fs.writeFile(dir + '/input.txt', body, (err) => {
        if (err) throw err;
        console.log(`Saved input for day ${day}, year ${year}!`);
    });

    fs.writeFile(dir + '/part1.js', template, (err) => {
        if (err) throw err;
        console.log(`Saved part 1 of day ${day}, year ${year}!`);
    });

    fs.writeFile(dir + '/part2.js', template, (err) => {
        if (err) throw err;
        console.log(`Saved part 2 of day ${day}, year ${year}!`);
    });
}

if (require.main === module) {
    fetchDay(options.day, options.year);
} else {
    module.exports = fetchDay;
}