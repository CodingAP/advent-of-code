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
        case '--day':
            options.day = parts[1];
            break;
        case '--year':
            options.year = parts[1];
            break;
    }
}

let runDay = (day, year) => {
    if (fs.existsSync(`./years/${year}/day${day}`)) return { part1: require(`../years/${year}/day${day}/part1.js`)(), part2: require(`../years/${year}/day${day}/part2.js`)() };
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