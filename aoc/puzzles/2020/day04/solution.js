/**
 * aoc/puzzles/2020/day04/solution.js
 * 
 * ~~ Passport Processing ~~
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
    // parse input
    const passports = input.split(/\n\n/g).map(passport => {
        return passport.split(/\n| /).reduce((obj, prop) => {
            let [key, value] = prop.split(/:/g);
            obj[key] = value;
            return obj;
        }, {});
    });

    // check for all required fields
    let required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    return passports.reduce((sum, passport) => {
        if (Object.keys(passport).filter(key => required.includes(key)).length == required.length) sum++;
        return sum;
    }, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // parse input
    const passports = input.split(/\n\n/g).map(passport => {
        return passport.split(/\n| /).reduce((obj, prop) => {
            let [key, value] = prop.split(/:/g);
            obj[key] = value;
            return obj;
        }, {});
    });

    /**
     * required values and validators
     * 
     * @type {Record<string, (value: string) => boolean>}
     */
    let required = {
        byr: value => {
            return (parseInt(value) >= 1920 && parseInt(value) <= 2002);
        },
        iyr: value => {
            return (parseInt(value) >= 2010 && parseInt(value) <= 2020);
        },
        eyr: value => {
            return (parseInt(value) >= 2020 && parseInt(value) <= 2030);
        },
        hgt: value => {
            if (value.includes('in')) return (parseInt(value) >= 59 && parseInt(value) <= 76);
            else return (parseInt(value) >= 150 && parseInt(value) <= 193);
        },
        hcl: value => {
            return (value.startsWith('#') && value.slice(1).match(/^[a-fA-F0-9]+$/));
        },
        ecl: value => {
            return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
        },
        pid: value => {
            return (!isNaN(value) && value.length == 9);
        }
    };

    // check for all required fields
    let requiredKeys = Object.keys(required);

    return passports.reduce((sum, passport) => {
        let properties = Object.entries(passport);
        if (properties.filter(([key, value]) => {
            if (!requiredKeys.includes(key)) return false;
            return required[key](value);
        }).length == requiredKeys.length) sum++;
        return sum;
    }, 0);
}

export { part1, part2 };