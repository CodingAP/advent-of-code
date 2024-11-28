// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2021/day18/solution.ts
 *
 * ~~ Snailfish ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let snailfishAll = [];
    input.trim().split('\n').forEach(element => {
        let snailfish = [];
        let number = '';
        for (let i = 0; i < element.length; i++) {
            if (element[i].match(/[0-9]/)) number += element[i];
            else if (number != '') {
                snailfish.push({ type: 'number', value: parseInt(number) });
                number = '';
            }

            if (element[i] == '[') snailfish.push({ type: 'opening' });
            if (element[i] == ']') snailfish.push({ type: 'closing' });
        }

        snailfishAll.push(snailfish);
    });

    let toString = array => {
        let arrayString = '';
        for (let i = 0; i < array.length; i++) {
            if (array[i].type == 'opening') arrayString += '[';
            if (array[i].type == 'closing') arrayString += ']';
            if (array[i].type == 'number') arrayString += array[i].value;
            if (array[i + 1] && array[i + 1].type != 'closing' && array[i].type != 'opening') arrayString += ',';
        }
        return arrayString; 
    }

    let reduceSnailfish = current => {
        let reduceAgain = false;
        do {
            let nestLevel = 0;
            reduceAgain = false;
            for (let i = 0; i < current.length; i++) {
                if (current[i].type == 'opening') {
                    if (nestLevel == 4) {
                        let pair = current.splice(i, 4);
                        let left = pair[1].value;
                        let right = pair[2].value;

                        for (let j = i - 1; j >= 0; j--) {
                            if (current[j].type == 'number') {
                                current[j].value += left;
                                break;
                            }
                        }

                        for (let j = i; j < current.length; j++) {
                            if (current[j].type == 'number') {
                                current[j].value += right;
                                break;
                            }
                        }

                        current.splice(i, 0, { type: 'number', value: 0 });
                        reduceAgain = true;
                        break;
                    } else nestLevel++;
                }
                if (current[i].type == 'closing') nestLevel--;
            }

            if (!reduceAgain) {
                for (let i = 0; i < current.length; i++) {
                    if (current[i].type == 'number' && current[i].value > 9) {
                        let value = current.splice(i, 1)[0].value;

                        let left = { type: 'number', value: Math.floor(value / 2) };
                        let right = { type: 'number', value: Math.ceil(value / 2) };

                        current.splice(i, 0, { type: 'opening' }, left, right, { type: 'closing' });
                        reduceAgain = true;
                        break;
                    }
                }
            }
        } while (reduceAgain);
        return current;
    }

    let current = [];
    let first = true;
    for (let i = 0; i < snailfishAll.length; i++) {
        if (!first) current.unshift({ type: 'opening' });
        current.push(...snailfishAll[i]);
        if (!first) current.push({ type: 'closing' });
        else first = false;

        current = reduceSnailfish(current);
    }
    
    let findMagnitude = pair => {
        let left = pair[0];
        if (typeof left != 'number') left = findMagnitude(left);

        let right = pair[1];
        if (typeof right != 'number') right = findMagnitude(right);

        return 3 * left + 2 * right;
    }

    return findMagnitude(JSON.parse(toString(current)));
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let snailfishAll = [];
    input.trim().split('\n').forEach(element => {
        let snailfish = [];
        let number = '';
        for (let i = 0; i < element.length; i++) {
            if (element[i].match(/[0-9]/)) number += element[i];
            else if (number != '') {
                snailfish.push({ type: 'number', value: parseInt(number) });
                number = '';
            }

            if (element[i] == '[') snailfish.push({ type: 'opening' });
            if (element[i] == ']') snailfish.push({ type: 'closing' });
        }

        snailfishAll.push(snailfish);
    });

    let toString = array => {
        let arrayString = '';
        for (let i = 0; i < array.length; i++) {
            if (array[i].type == 'opening') arrayString += '[';
            if (array[i].type == 'closing') arrayString += ']';
            if (array[i].type == 'number') arrayString += array[i].value;
            if (array[i + 1] && array[i + 1].type != 'closing' && array[i].type != 'opening') arrayString += ',';
        }
        return arrayString;
    }

    let reduceSnailfish = current => {
        let reduceAgain = false;
        do {
            let nestLevel = 0;
            reduceAgain = false;
            for (let i = 0; i < current.length; i++) {
                if (current[i].type == 'opening') {
                    if (nestLevel == 4) {
                        let pair = current.splice(i, 4);
                        let left = pair[1].value;
                        let right = pair[2].value;

                        for (let j = i - 1; j >= 0; j--) {
                            if (current[j].type == 'number') {
                                current[j].value += left;
                                break;
                            }
                        }

                        for (let j = i; j < current.length; j++) {
                            if (current[j].type == 'number') {
                                current[j].value += right;
                                break;
                            }
                        }

                        current.splice(i, 0, { type: 'number', value: 0 });
                        reduceAgain = true;
                        break;
                    } else nestLevel++;
                }
                if (current[i].type == 'closing') nestLevel--;
            }

            if (!reduceAgain) {
                for (let i = 0; i < current.length; i++) {
                    if (current[i].type == 'number' && current[i].value > 9) {
                        let value = current.splice(i, 1)[0].value;

                        let left = { type: 'number', value: Math.floor(value / 2) };
                        let right = { type: 'number', value: Math.ceil(value / 2) };

                        current.splice(i, 0, { type: 'opening' }, left, right, { type: 'closing' });
                        reduceAgain = true;
                        break;
                    }
                }
            }
        } while (reduceAgain);
        return current;
    }

    let findMagnitude = pair => {
        let left = pair[0];
        if (typeof left != 'number') left = findMagnitude(left);

        let right = pair[1];
        if (typeof right != 'number') right = findMagnitude(right);

        return 3 * left + 2 * right;
    }

    let maxMagnitude = -Infinity;
    for (let i = 0; i < snailfishAll.length; i++) {
        for (let j = 0; j < snailfishAll.length; j++) {
            if (i == j) continue;
            let current = [{ type: 'opening' }];
            current.push(...structuredClone(snailfishAll[i]));
            current.push(...structuredClone(snailfishAll[j]));
            current.push({ type: 'closing' });

            current = reduceSnailfish(current);

            maxMagnitude = Math.max(maxMagnitude, findMagnitude(JSON.parse(toString(current))));
        }
    }

    return maxMagnitude;
};

export { part1, part2 };
