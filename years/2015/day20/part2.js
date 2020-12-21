const input = require('fs').readFileSync('./years/2015/day20/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let limit = parseInt(input);

    let calculatePresents = house => {
        let sum = 0;
        let d = Math.floor(Math.sqrt(house) + 1);
        for (let i = 1; i <= d; i++) {
            if (house % i == 0) {
                sum += i;
                sum += house / i;
            }
        }
        return sum * 10;
    }

    let house = 1;

    while (true) {
        let presents = calculatePresents(house);
        if (presents >= limit) return house;
        house++;
    }
}