const input = require('fs').readFileSync('inputs/2017/1.in').toString().trim();

module.exports = {
    part1: () => {
        let sum = 0;
        
        for (let i = 0; i < input.length; i++) {
            let current = input.charAt(i);
            let next = input.charAt((i + 1) % input.length);
            if (current == next) sum += parseInt(current);
        }
        
        return sum;
    },
    part2: () => {
        let sum = 0;

        for (let i = 0; i < input.length; i++) {
            let current = input.charAt(i);
            let next = input.charAt((i + Math.floor(input.length / 2)) % input.length);
            if (current == next) sum += parseInt(current);
        }

        return sum;
    }
}