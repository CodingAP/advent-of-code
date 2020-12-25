const input = require('fs').readFileSync('./years/2015/day15/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let ingredients = [];
    input.replace(/[,]/g, '').split(/\r\n/).forEach(value => {
        let tokens = value.split(' ').slice(1);
        let ingredient = {};
        for (let i = 0; i < tokens.length; i += 2) {
            ingredient[tokens[i]] = parseInt(tokens[i + 1]);
        }
        ingredients.push(ingredient);
    });
    
    let calculateScore = (...args) => {
        let totals = { capacity: 0, durability: 0, flavor: 0, texture: 0 };
        Object.keys(totals).forEach(value => {
            for (let i = 0; i < args.length; i++) {
                totals[value] += ingredients[i][value] * args[i];
            }
        });

        return Math.max(totals.capacity, 0) * Math.max(totals.durability, 0) * Math.max(totals.flavor, 0) * Math.max(totals.texture, 0);
    }
    
    let highestScore = -Infinity;
    let amount = 100;
    for (let i = 0; i <= amount; i++) {
        for (let j = 0; j <= amount - i; j++) {
            for (let k = 0; k <= amount - i - j; k++) {
                for (let l = 0; l <= amount - i - j - k; l++) {
                    let score = calculateScore(i, j, l, k);
                    if (score > highestScore) highestScore = score; 
                }
            }
        }
    }
    return highestScore;
}