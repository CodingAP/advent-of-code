// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day18/solution.ts
 *
 * ~~ Operation Order ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let sum = 0;
    let expressions = input.trim().split('\n');

    let calculate = math => {
        let tokens = math.split(' ');
        let result = eval(`${parseInt(tokens[0])} ${tokens[1]} ${parseInt(tokens[2])}`);
        if (tokens.length == 3) return result;
        return calculate(result + ' ' + tokens.slice(3).join(' '));
    }

    expressions.forEach(value => {
        let parenthesisStack = [];

        while (value.includes('(')) {
            for (let i = 0; i < value.length; i++) {
                if (value.charAt(i) == '(') parenthesisStack.push(i);
                if (value.charAt(i) == ')') {
                    let other = parenthesisStack.pop();
                    let result = calculate(value.substring(other + 1, i));
                    value = value.substring(0, other) + result + value.substring(i + 1);
                    i = other;
                }
            }
        }
        
        sum += calculate(value);
    });

    return sum;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let sum = 0;
    let expressions = input.trim().split('\n');

    let calculate = math => {
        let tokens = math.split(' ');
        let index = tokens.indexOf('+');
        let result = 0;
        if (index != -1) {
            result = eval(`${parseInt(tokens[index - 1])} ${tokens[index]} ${parseInt(tokens[index + 1])}`);
        } else {
            index = 1;
            result = eval(`${parseInt(tokens[0])} ${tokens[1]} ${parseInt(tokens[2])}`);
        }
        
        if (tokens.length == 3) return result;

        tokens.splice(index - 1, 3, result);
        return calculate(tokens.join(' '));
    }

    expressions.forEach(value => {
        let parenthesisStack = [];

        while (value.includes('(')) {
            for (let i = 0; i < value.length; i++) {
                if (value.charAt(i) == '(') parenthesisStack.push(i);
                if (value.charAt(i) == ')') {
                    let other = parenthesisStack.pop();
                    let result = calculate(value.substring(other + 1, i));
                    value = value.substring(0, other) + result + value.substring(i + 1);
                    i = other;
                }
            }
        }

        sum += calculate(value);
    });

    return sum;
};

export { part1, part2 };
