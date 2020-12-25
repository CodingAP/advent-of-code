const input = require('fs').readFileSync('./years/2015/day20/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let limit = parseInt(input);

    let calculatePresents = house => {
        let sum = house;
        if (house < 50) sum++;
        
        let sqrt = Math.sqrt(house);

        for (let i = 2; i <= sqrt; i++) {
            if (house % i == 0) {
                if (house / i <= 50) sum += i;
                if (house / (house / i) <= 50) sum += house / i;
            }
        }

        if (sqrt % 1 == 0) sum -= sqrt;
        return sum * 11;
    }

    let house = 1;

    while (true) {
        let presents = calculatePresents(house);
        if (presents >= limit) return house;
        house++;
    }
}