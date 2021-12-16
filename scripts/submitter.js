const Database = require('./database');
const runDay = require('./runner');
let currentDay = new Date();

let options = {
    day: '' + currentDay.getDate(),
    year: '' + currentDay.getFullYear(),
    iterations: 10,
    trimming: true
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
        case '--i':
        case '--iter':
        case '--iterations':
            options.iterations = parseInt(parts[1]);
            break;
        case '--t':
        case '--trimming':
            options.trimming = parts[1] == 'true';
            break;
    }
}

let answersDB = new Database('./scripts/answers.db');

let submitDay = async (day, year, iterations = 10, needsTrimming = true) => {
    let averageTime1 = 0;
    let averageTime2 = 0;
    let firstAnswers = { part1: '', part2: '' };
    
    for (let i = 0; i < iterations; i++) {
        let answers = runDay(day, year, 'both', needsTrimming);
        firstAnswers.part1 = answers.part1;
        firstAnswers.part2 = answers.part2;
        averageTime1 += answers.time1;
        averageTime2 += answers.time2;
    }
    answersDB.add(`d${day}y${year}`, parseInt(day), parseInt(year), firstAnswers.part1 + '', (averageTime1 / times).toFixed(3), firstAnswers.part2 + '', (averageTime2 / times).toFixed(3));

    console.log(`Submitted day ${day}, year ${year}!`);
}

if (require.main === module) {
    submitDay(options.day, options.year, options.iterations, options.needsTrimming);
} else {
    module.exports = submitDay;
}