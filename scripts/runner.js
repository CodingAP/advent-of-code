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
    let part1 = require(`../years/${year}/day${day}/part1.js`);
    let part2 = require(`../years/${year}/day${day}/part2.js`);
    console.log(`Part 1: ${part1()}`);
    console.log(`Part 2: ${part2()}`);
}

if (require.main === module) {
    runDay(options.day, options.year);
} else {
    module.exports = runDay;
}