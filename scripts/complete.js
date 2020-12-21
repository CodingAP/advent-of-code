const submitDay = require('./submitter');
const fetchMD = require('./md_fetcher');
const updateMD = require('./update_md');

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

let completeDay = async (day, year) => {
    await submitDay(day, year);
    await fetchMD(day, year);
    await updateMD();
}

if (require.main === module) {
    completeDay(options.day, options.year);
} else {
    module.exports = completeDay;
}