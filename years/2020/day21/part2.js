const input = require('fs').readFileSync('./years/2020/day21/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let ingredients = input.split('\n');

    let unknownIngredients = [];
    let allergenArrays = {};
    let definitelyHasAllergen = {};
    let sum = 0;

    ingredients.forEach(ingredient => {
        let tokens = ingredient.split(/[\(\)]/).filter(v => v != '');
        let unknown = tokens[0].split(/\s/).filter(v => v != '');
        let allergens = tokens[1].split(/\s/).map(v => v.replace(/,/, '')).slice(1);

        unknownIngredients.push(unknown);
        allergens.forEach(allergen => {
            if (!allergenArrays[allergen]) allergenArrays[allergen] = [];
            allergenArrays[allergen].push(unknown);
        });
    });

    common.objectForEach(allergenArrays, (key, value) => {
        let counts = {};
        value.forEach(array => {
            array.forEach(unknown => {
                if (!counts[unknown]) counts[unknown] = 0;
                counts[unknown]++;
            });
        });
        definitelyHasAllergen[key] = Object.keys(counts).filter(v => counts[v] == value.length);
    });

    let taken = [];
    let sorted = Object.keys(definitelyHasAllergen).sort();
    let final = new Array(sorted.length);
    while (taken.length != sorted.length) {
        for (let i = sorted.length - 1; i >= 0; i--) {
            for (let j = 0; j < taken.length; j++) {
                let index = definitelyHasAllergen[sorted[i]].indexOf(taken[j])
                if (index != -1) definitelyHasAllergen[sorted[i]].splice(index, 1);
            }
            if (definitelyHasAllergen[sorted[i]].length == 1) {
                taken.push(definitelyHasAllergen[sorted[i]][0]);
                final[i] = definitelyHasAllergen[sorted[i]][0];
                definitelyHasAllergen[sorted[i]] = [];
            }
        }
    }

    return final.join(',');
}