const fs = require('fs');
const fetchDay = require('./fetcher');
const runDay = require('./runner');

(async () => {
    // for (let year = 2015; year <= 2019; year++) {
    //     for (let day = 1; day <= 25; day++) {
    //         if (!fs.existsSync(`./years/${year}/day${day}`)) await fetchDay(day, year);
    //     }
    // }
    for (let day = 1; day <= 9; day++) {
        runDay(day, 2020);
    }
})();