const fs = require('fs');

(async () => {
    for (let year = 2020; year <= 2020; year++) {
        for (let day = 1; day <= 9; day++) {
            fs.readFile(`./years/${year}/day${day}/part1.js`, 'utf8', function (err, data) {
                let formatted = data.replace(/const common = require\('..\/..\/..\/common'\);/g, `const common = require('../../../scripts/common');`);
                fs.writeFile(`./years/${year}/day${day}/part1.js`, formatted, 'utf8', function (err) {
                    if (err) return console.log(err);
                });    
            });

            fs.readFile(`./years/${year}/day${day}/part2.js`, 'utf8', function (err, data) {
                let formatted = data.replace(/const common = require\('..\/..\/..\/common'\);/g, `const common = require('../../../scripts/common');`);
                fs.writeFile(`./years/${year}/day${day}/part2.js`, formatted, 'utf8', function (err) {
                    if (err) return console.log(err);
                });
            })
        }
    }
})();