const fs = require('fs');

let statFile = fs.readFileSync('./scripts/stats.txt').toString();

let dayStats = {};
statFile = statFile.replace(/\r\n/g, '\n').split(/[\n\s]/).filter(value => value != '');

for (let i = 0; i < statFile.length; i += 7) {
    dayStats[statFile[i + 0]] = {
        part1: {
            time: statFile[i + 1],
            rank: statFile[i + 2]
        },
        part2: {
            time: statFile[i + 4],
            rank: statFile[i + 5]
        }
    }
}

let lowest = Infinity;
let highest = -Infinity;
Object.entries(dayStats).forEach(value => {
    if (parseInt(value[1].part1.rank) < lowest) lowest = parseInt(value[1].part1.rank);
    if (parseInt(value[1].part2.rank) < lowest) lowest = parseInt(value[1].part2.rank);
    
    if (parseInt(value[1].part1.rank) > highest) highest = parseInt(value[1].part1.rank);
    if (parseInt(value[1].part2.rank) > highest) highest = parseInt(value[1].part2.rank);
});

console.log(lowest, highest);