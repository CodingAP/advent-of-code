const fs = require('fs');
const common = require('./common');
let currentDay = new Date();

let options = {
    day: '' + currentDay.getDate(),
    year: '' + currentDay.getFullYear(),
    parts: 'both',
    trimming: 'true'
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
        case '--p':
        case '--parts':
            options.parts = parts[1];
            break;
        case '--t':
        case '--trimming':
            options.trimming = parts[1] == 'true';
            break;
    }
}

let runDay = (day, year, parts = 'both', needsTrimming = true) => {
    if (fs.existsSync(`./years/${year}/day${day}`)) {
        let before, after;
        let part1 = 0, time1 = 0, part2 = 0, time2 = 0;

        switch (parts) {
            case '1':
                before = process.hrtime();
                part1 = require(`../years/${year}/day${day}/part1.js`)(common.readInput(day, year, needsTrimming));
                after = process.hrtime(before);
                time1 = after[1] / 1000000;
                
                part2 = 'Not tested...';
                time2 = 0;
                break;
            case '2':
                part1 = 'Not tested...';
                time1 = 0;

                before = process.hrtime();
                part2 = require(`../years/${year}/day${day}/part2.js`)(common.readInput(day, year, needsTrimming));
                after = process.hrtime(before);
                time2 = after[1] / 1000000;
                break;
            default:
                before = process.hrtime();
                part1 = require(`../years/${year}/day${day}/part1.js`)(common.readInput(day, year, needsTrimming));
                after = process.hrtime(before);
                time1 = after[1] / 1000000;

                before = process.hrtime();
                part2 = require(`../years/${year}/day${day}/part2.js`)(common.readInput(day, year, needsTrimming));
                after = process.hrtime(before);
                time2 = after[1] / 1000000;
                break;
        }
        
    
        return { part1, time1, part2, time2 };
    }
    return null;
}

if (require.main === module) {
    let answers = runDay(options.day, options.year, options.parts, options.trimming);
    console.log(`Advent of Code ${options.year} - Day ${options.day}`);
    console.log(`Part 1: ${answers.part1}`);
    console.log(`Part 2: ${answers.part2}`);
} else {
    module.exports = runDay;
}