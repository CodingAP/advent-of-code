const common = require('../../../scripts/common');

module.exports = input => {
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

    unknownIngredients.forEach(array => {
        array.forEach(unknown => {
            let included = false;
            common.objectForEach(definitelyHasAllergen, (key, value) => {
                if (value.includes(unknown)) included = true;
            });
            if (!included) sum++;
        });
    })

    return sum;
}