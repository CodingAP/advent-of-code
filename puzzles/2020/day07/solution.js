/**
 * aoc/puzzles/2020/day07/solution.js
 * 
 * ~~ Handy Haversacks ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/30/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    /**
     * parsed input to find all bag and what they contain
     * 
     * @type {Record<string, {count: number, name: string}[]>}
     */
    const bagRules = input.split(/\n/g).reduce((obj, line) => {
        let [bigBag, others] = line.replace(/\.|bags|bag/g, '').split(/contain/g);
        obj[bigBag.trim()] = [];
        if (others.trim() != 'no other') {
            others.split(/,/g).forEach(bag => {
                let [count, ...name] = bag.trim().split(/ /g);
                obj[bigBag.trim()].push({ count: parseInt(count), name: name.join(' ') });
            });
        }
        return obj;
    }, {});

    /**
     * searches the specified bag to see if another bag eventually contains it
     * 
     * @param {string} bag bag to search through
     * @param {string} searchBag bag to find
     * @returns {boolean} 
     */
    const findBag = (bag, searchBag) => {
        for (let i = 0; i < bagRules[bag].length; i++) {
            if (bagRules[bag][i].name == searchBag || findBag(bagRules[bag][i].name, searchBag)) return true;
        }
        return false;
    }

    // look through all bags to see if it has 'shiny gold' bag in it
    return Object.keys(bagRules).reduce((sum, bagName) => sum + (findBag(bagName, 'shiny gold') ? 1 : 0), 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    /**
     * parsed input to find all bag and what they contain
     * 
     * @type {Record<string, {count: number, name: string}[]>}
     */
    const bagRules = input.split(/\n/g).reduce((obj, line) => {
        let [bigBag, others] = line.replace(/\.|bags|bag/g, '').split(/contain/g);
        obj[bigBag.trim()] = [];
        if (others.trim() != 'no other') {
            others.split(/,/g).forEach(bag => {
                let [count, ...name] = bag.trim().split(/ /g);
                obj[bigBag.trim()].push({ count: parseInt(count), name: name.join(' ') });
            });
        }
        return obj;
    }, {});

    /**
     * searches the specified bag to count all bags in it
     * 
     * @param {string} bag bag to search through
     * @returns {number} 
     */
    const countBags = bag => {
        let total = 0;
        for (let i = 0; i < bagRules[bag].length; i++) {
            total += bagRules[bag][i].count + bagRules[bag][i].count * countBags(bagRules[bag][i].name);
        }
        return total;
    }

    // look through all bags to see if it has 'shiny gold' bag in it
    return countBags('shiny gold');
}

export { part1, part2 };