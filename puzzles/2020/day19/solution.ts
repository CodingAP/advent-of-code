// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day19/solution.ts
 *
 * ~~ Monster Messages ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let rules = {}, strings = '';

    let info = input.split(/\n/);
    let mode = 0;
    info.forEach(value => {
        if (value == '') {
            mode++;
            return;
        }

        if (mode == 0) {
            let tokens = value.split(': ');
            rules[tokens[0]] = tokens[1];
        } else if (mode == 1) {
            strings += value + '\n';
        } 
    });

    let findString = rule => {
        if (rule.charAt(0) == '"') return rule.charAt(1);
        return '(' + rule.split(' ').reduce((rule, part) => rule + (part == '|' ? '|' : findString(rules[part])), '') + ')';
    }
    
    let rule = new RegExp('^' + findString(rules[0]) + '$', 'gm');

    return strings.match(rule).length;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let rules = {}, strings = '';

    let info = input.split(/\n/);
    let mode = 0;
    info.forEach(value => {
        if (value == '') {
            mode++;
            return;
        }

        if (mode == 0) {
            let tokens = value.split(': ');
            rules[tokens[0]] = tokens[1];
        } else if (mode == 1) {
            strings += value + '\n';
        }
    });

    rules['8'] = '42 | 42 8';
    rules['11'] = '42 31 | 42 11 31'

    let findString = (i, rule, count8, count11) => {
        if (i == 8 && count8 == 5) return '(' + findString(42, rules[42], count8, count11) + ')';
        if (i == 11 && count11 == 5) return '(' + findString(42, rules[42], count8, count11) + findString(31, rules[31], count8, count11) + ')';

        if (i == 8) count8++;
        if (i == 11) count11++;

        if (rule.charAt(0) == '"') return rule.charAt(1);
        return '(' + rule.split(' ').reduce((rule, part) => rule + (part == '|' ? '|' : findString(part, rules[part], count8, count11)), '') + ')';
    }

    let rule = new RegExp('^' + findString(0, rules[0], 0, 0) + '$', 'gm');
    return strings.match(rule).length;
};

export { part1, part2 };
