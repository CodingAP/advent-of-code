const getAllPossible = (indices, callback, args = [], index = 0) => {
    if (indices.length == 0) callback(args);
    else {
        let rest = indices.slice(1);
        for (args[index] = 0; args[index] < indices[0]; ++args[index]) getAllPossible(rest, callback, args, index + 1);
    }
}

const part1 = async input => {
    let ingredients = {};
    input.split('\n').forEach(element => {
        let tokens = element.split(' ');
        ingredients[tokens[0].replace(':', '')] = {
            capacity: parseInt(tokens[2].replace(',', '')),
            durability: parseInt(tokens[4].replace(',', '')),
            flavor: parseInt(tokens[6].replace(',', '')),
            texture: parseInt(tokens[8].replace(',', '')),
            calories: parseInt(tokens[10]),
        };
    });

    let maxScore = -Infinity;
    let allIngredients = Object.keys(ingredients);
    getAllPossible(new Array(allIngredients.length).fill(100), args => {
        if (args.reduce((acc, element) => acc + element, 0) != 100) return;
        let totals = { capacity: 0, durability: 0, flavor: 0, texture: 0 };

        for (let i = 0; i < allIngredients.length; i++) {
            totals.capacity += args[i] * ingredients[allIngredients[i]].capacity;
            totals.durability += args[i] * ingredients[allIngredients[i]].durability;
            totals.flavor += args[i] * ingredients[allIngredients[i]].flavor;
            totals.texture += args[i] * ingredients[allIngredients[i]].texture;
        }

        let score = Math.max(totals.capacity, 0) * Math.max(totals.durability, 0) * Math.max(totals.flavor, 0) * Math.max(totals.texture, 0);
        maxScore = Math.max(score, maxScore);
    });
    return maxScore;
}

const part2 = async input => {
    let ingredients = {};
    input.split('\n').forEach(element => {
        let tokens = element.split(' ');
        ingredients[tokens[0].replace(':', '')] = {
            capacity: parseInt(tokens[2].replace(',', '')),
            durability: parseInt(tokens[4].replace(',', '')),
            flavor: parseInt(tokens[6].replace(',', '')),
            texture: parseInt(tokens[8].replace(',', '')),
            calories: parseInt(tokens[10]),
        };
    });

    let maxScore = -Infinity;
    let allIngredients = Object.keys(ingredients);
    getAllPossible(new Array(allIngredients.length).fill(100), args => {
        if (args.reduce((acc, element) => acc + element, 0) != 100) return;
        let totals = { capacity: 0, durability: 0, flavor: 0, texture: 0, calories: 0 };

        for (let i = 0; i < allIngredients.length; i++) {
            totals.capacity += args[i] * ingredients[allIngredients[i]].capacity;
            totals.durability += args[i] * ingredients[allIngredients[i]].durability;
            totals.flavor += args[i] * ingredients[allIngredients[i]].flavor;
            totals.texture += args[i] * ingredients[allIngredients[i]].texture;
            totals.calories += args[i] * ingredients[allIngredients[i]].calories;
        }

        let score = Math.max(totals.capacity, 0) * Math.max(totals.durability, 0) * Math.max(totals.flavor, 0) * Math.max(totals.texture, 0);
        if (totals.calories == 500) maxScore = Math.max(score, maxScore);
    });
    return maxScore;
}

export { part1, part2 }; 