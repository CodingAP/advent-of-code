// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2015/day19/solution.ts
 * 
 * ~~ Medicine for Rudolph ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/28/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    // parse input
    let [rules, chemical] = input.split(/\n\n/g);
    rules = rules.split(/\n/g).reduce((array, line) => {
        let [product, result] = line.split(' => ');
        array.push({ product, result });
        return array;
    }, []);

    // try one replacement on every rule with every match it sees
    const allPossible = new Set();
    for (let i = 0; i < rules.length; i++) {
        let splitChemical = chemical.split(rules[i].product);
        for (let j = 0; j < splitChemical.length - 1; j++) {
            let newChemical = [...splitChemical].flatMap((chemical, index) => {
                if (index == j) return [chemical, rules[i].result];
                else return [chemical, rules[i].product];
            }).slice(0, -1);

            allPossible.add(newChemical.join(''));
        }
    }

    return allPossible.size;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    // parse input
    let [rules, chemical] = input.split(/\n\n/g);
    rules = rules.split(/\n/g).reduce((array, line) => {
        let [result, product] = line.split(' => ');
        array.push({ product, result });
        return array;
    }, []);

    /**
     * recursive function that replaces a result back to product until it gets to 'e', return depth or -1 is 'e' isn't possible
     * 
     * @param {string} chemical chemical to try and get to 'e' 
     * @param {number} depth the current depth of the recursion 
     * @returns {number}
     */
    const replaceChemical = (chemical, depth) => {
        if (chemical == 'e') return depth;

        // try all replacements until 'e' is returned
        let modified = false;
        for (let i = 0; i < rules.length; i++) {
            let splitChemical = chemical.split(rules[i].product);

            for (let j = 0; j < splitChemical.length - 1; j++) {
                let newChemical = [...splitChemical].flatMap((chemical, index) => {
                    if (index == j) return [chemical, rules[i].result];
                    else return [chemical, rules[i].product];
                }).slice(0, -1);

                modified = true;
                let result = replaceChemical(newChemical.join(''), depth + 1);
                if (result) return result;
            }
        }

        // couldn't get to 'e', return fail
        if (!modified) return null;
    }

    // replace the main string until it returns 'e'
    return replaceChemical(chemical, 0);
}

export { part1, part2 };