const Database = require('./database');
const runDay = require('./runner');
let currentDay = new Date();

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

let answersDB = new Database('./scripts/answers.db');

let submitDay = async (day, year) => {
    let averageTime1 = 0;
    let averageTime2 = 0;
    let times = 10;
    for (let i = 0; i < times; i++) {
        let answers = runDay(day, year);
        averageTime1 += answers.time1;
        averageTime2 += answers.time2;
    }

    let answers = runDay(day, year);
    answersDB.add(`d${day}y${year}`, parseInt(day), parseInt(year), answers.part1 + '', (averageTime1 / times).toFixed(3), answers.part2 + '', (averageTime2 / times).toFixed(3));

    console.log(`Submitted day ${day}, year ${year}!`);
}

if (require.main === module) {
    submitDay(options.day, options.year);
} else {
    module.exports = submitDay;
}