// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2015/day15/solution.ts
 * 
 * ~~ Science for Hungry People ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

/**
 * Gets all possible combination of numbers
 * 
 * @param {number[]} indices 
 * @param {(args: number[]) => void} callback
 * @param {number[]} args
 * @param {number} index 
 */
const getAllPossible = (indices, callback, args = [], index = 0) => {
    if (indices.length == 0) callback(args);
    else {
        let rest = indices.slice(1);
        for (args[index] = 0; args[index] < indices[0]; ++args[index]) getAllPossible(rest, callback, args, index + 1);
    }
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    // parse input
    let ingredients = input.split(/\n/g).reduce((array, line) => {
        let [_, info] = line.split(/: /g);
        array.push(info.split(/, /g).reduce((ob, detail) => {
            let [name, amount] = detail.split(/ /g);
            ob[name] = parseInt(amount);
            return ob;
        }, {}));
        
        return array;
    }, []);

    // try all possible combinations that add up to 100 (more inefficient but it works)
    const total = 100;
    let max = -Infinity;
    getAllPossible(new Array(ingredients.length).fill(total), args => {
        if (args.reduce((sum, num) => sum + num, 0) != total) return;
        let scores = { capacity: 0, durability: 0, flavor: 0, texture: 0 };
        
        Object.keys(scores).forEach(info => {
            for (let i = 0; i < ingredients.length; i++) {
                scores[info] += args[i] * ingredients[i][info];
            }
            scores[info] = Math.max(0, scores[info]);
        });

        max = Math.max(max, Object.values(scores).reduce((mul, num) => mul * num, 1));
    });

    return max;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    // parse input
    let ingredients = input.split(/\n/g).reduce((array, line) => {
        let [_, info] = line.split(/: /g);
        array.push(info.split(/, /g).reduce((ob, detail) => {
            let [name, amount] = detail.split(/ /g);
            ob[name] = parseInt(amount);
            return ob;
        }, {}));

        return array;
    }, []);

    // try all possible combinations that add up to 100 (more inefficient but it works)
    const total = 100;
    let max = -Infinity;
    getAllPossible(new Array(ingredients.length).fill(total), args => {
        if (args.reduce((sum, num) => sum + num, 0) != total) return;
        let scores = { capacity: 0, durability: 0, flavor: 0, texture: 0, calories: 0 };

        Object.keys(scores).forEach(info => {
            for (let i = 0; i < ingredients.length; i++) {
                scores[info] += args[i] * ingredients[i][info];
            }
            scores[info] = Math.max(0, scores[info]);
        });

        if (scores.calories == 500) max = Math.max(max, Object.values(scores).reduce((mul, num) => mul * num, 1) / scores.calories);
    });

    return max;
}

export { part1, part2 };