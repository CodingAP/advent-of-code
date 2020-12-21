const fs = require('fs');
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

let runDay = (day, year) => {
    if (fs.existsSync(`./years/${year}/day${day}`)) {
        let before1 = process.hrtime();
        let part1 = require(`../years/${year}/day${day}/part1.js`)();
        let after1 = process.hrtime(before1);
        let time1 = after1[1] / 1000000;

        let before2 = process.hrtime();
        let part2 = require(`../years/${year}/day${day}/part2.js`)();
        let after2 = process.hrtime(before2);
        let time2 = after2[1] / 1000000;
    
        return { part1, time1, part2, time2 };
    }
    return null;
}

if (require.main === module) {
    let answers = runDay(options.day, options.year);
    console.log(`Advent of Code ${options.year} - Day ${options.day}`);
    console.log(`Part 1: ${answers.part1}`);
    console.log(`Part 2: ${answers.part2}`);
} else {
    module.exports = runDay;
}