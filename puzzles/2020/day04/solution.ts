// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day04/solution.ts
 *
 * ~~ Passport Processing ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let processedPassports = [];
    let passports = input.split('\n');
    let currentPassport = '';
    for (let i = 0; i < passports.length; i++) {
        if (i == passports.length - 1) {
            currentPassport += passports[i] + ' ';
            processedPassports.push(currentPassport);
        } else {
            if (passports[i] == '') {
                processedPassports.push(currentPassport);
                currentPassport = '';
            } else {
                currentPassport += passports[i] + ' ';
            }
        }
    }

    let valid = 0;

    for (let i = 0; i < processedPassports.length; i++) {
        let info = processedPassports[i].split(' ').filter(value => value != '');
        let neededInfo = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
        let infoObject = {};
        for (let j = 0; j < info.length; j++) {
            let tokens = info[j].split(':');
            infoObject[tokens[0]] = tokens[1];
        }

        let validBool = true;
        for (let j = 0; j < neededInfo.length; j++) {
            if (infoObject[neededInfo[j]] == null) validBool = false;
        }

        if (validBool) valid++;
    }

    return valid;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let processedPassports = [];
    let passports = input.split('\n');
    let currentPassport = '';
    for (let i = 0; i < passports.length; i++) {
        if (i == passports.length - 1) {
            currentPassport += passports[i] + ' ';
            processedPassports.push(currentPassport);
        } else {
            if (passports[i] == '') {
                processedPassports.push(currentPassport);
                currentPassport = '';
            } else {
                currentPassport += passports[i] + ' ';
            }
        }
    }

    let valid = 0;

    for (let i = 0; i < processedPassports.length; i++) {
        let info = processedPassports[i].split(' ').filter(value => value != '');
        let neededInfo = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
        let infoObject = {};
        for (let j = 0; j < info.length; j++) {
            let tokens = info[j].split(':');
            infoObject[tokens[0]] = tokens[1];
        }

        let validBool = true;
        for (let j = 0; j < neededInfo.length; j++) {
            if (infoObject[neededInfo[j]] == null) {
                validBool = false;
                break;
            }
            let value = infoObject[neededInfo[j]];
            switch (neededInfo[j]) {
                case 'byr':
                    let birthYear = parseInt(value);
                    if (birthYear < 1920 || birthYear > 2002) validBool = false;
                    break;
                case 'iyr':
                    let issueBirth = parseInt(value);
                    if (issueBirth < 2010 || issueBirth > 2020) validBool = false;
                    break;
                case 'eyr':
                    let expYear = parseInt(value);
                    if (expYear < 2020 || expYear > 2030) validBool = false;
                    break;
                case 'hgt':
                    let height = parseInt(value.substring(0, value.length - 2));
                    if (value.endsWith('in')) {
                        if (height < 59 || height > 76) validBool = false;
                    } else if (value.endsWith('cm')) {
                        if (height < 150 || height > 193) validBool = false;
                    } else {
                        validBool = false;
                    }
                    break;
                case 'hcl':
                    if (value.charAt(0) != '#') {
                        validBool = false;
                    } else {
                        for (let i = 1; i <= 6; i++) {
                            if (!value.charAt(i).match(/[0-9a-f]/)) validBool = false;
                        }
                    }
                    break;
                case 'ecl':
                    let validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
                    validBool = false;
                    for (let i = 0; i < validEyeColors.length; i++) {
                        if (value == validEyeColors[i]) validBool = true;
                    }
                    break;
                case 'pid':
                    validBool = (value.length == 9);
                    break;
            }
            if (!validBool) break;
        }
        if (validBool) valid++;
    }

    return valid;
};

export { part1, part2 };
