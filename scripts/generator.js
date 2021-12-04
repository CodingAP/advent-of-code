const fetchDay = require('./fetcher');

for (let i = 4; i <= 25; i++) {
    fetchDay(i, 2021);
}