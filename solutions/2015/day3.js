const input = require('fs').readFileSync('inputs/2015/3.in').toString().trim();
const common = require('../../common');

module.exports = {
    part1: () => {
        let x = 0, y = 0;
        let locations = { '0,0': 1 };
        
        for (let i = 0; i < input.length; i++) {
            switch (input.charAt(i)) {
                case '>':
                    x++;
                    break;
                case '^':
                    y++;
                    break;
                case 'v':
                    y--;
                    break;
                case '<':
                    x--;
                    break;
            }
            if (locations[`${x},${y}`] == null) locations[`${x},${y}`] = 0;
            locations[`${x},${y}`]++;
        }
        
        return Object.keys(locations).length;
    },
    part2: () => {
        let santa = { x: 0, y: 0 }, robo = { x: 0, y: 0 };
        let locations = { '0,0': 1 };

        for (let i = 0; i < input.length; i++) {
            let current = (i % 2 == 0) ? santa : robo;
            switch (input.charAt(i)) {
                case '>':
                    current.x++;
                    break;
                case '^':
                    current.y++;
                    break;
                case 'v':
                    current.y--;
                    break;
                case '<':
                    current.x--;
                    break;
            }
            let newLocation = `${current.x},${current.y}`;
            if (locations[newLocation] == null) locations[newLocation] = 0;
            locations[newLocation]++;
        }

        return Object.keys(locations).length;
    }
}