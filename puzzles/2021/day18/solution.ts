/**
 * puzzles/2021/day18/solution.ts
 *
 * ~~ Snailfish ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

type SnailfishNumber = { type: string, value: number }[];

const reduceSnailfish = (current: SnailfishNumber) => {
    while (true) {
        let nestLevel = 0;
        let noAction = true;

        for (let i = 0; i < current.length; i++) {
            if (current[i].type === 'opening') {
                // explode each left most pair if too much nesting
                if (nestLevel === 4) {
                    const pair = current.splice(i, 4);
                    const left = pair[1].value;
                    const right = pair[2].value;

                    // add to next left number
                    for (let j = i - 1; j >= 0; j--) {
                        if (current[j].type === 'number') {
                            current[j].value += left;
                            break;
                        }
                    }

                    // add to next right number
                    for (let j = i; j < current.length; j++) {
                        if (current[j].type === 'number') {
                            current[j].value += right;
                            break;
                        }
                    }

                    // replace pair with number 0
                    current.splice(i, 0, { type: 'number', value: 0 });
                    noAction = false;
                    break;
                } else nestLevel++;
            }
            if (current[i].type === 'closing') nestLevel--;
        }

        // if no explosions, check for any large numbers
        if (noAction) {
            for (let i = 0; i < current.length; i++) {
                if (current[i].type === 'number' && current[i].value > 9) {
                    let value = current.splice(i, 1)[0].value;

                    let left = { type: 'number', value: Math.floor(value / 2) };
                    let right = { type: 'number', value: Math.ceil(value / 2) };

                    current.splice(i, 0, { type: 'opening', value: -1 }, left, right, { type: 'closing', value: -1 });
                    noAction = false;
                    break;
                }
            }
        }

        if (noAction) break;
    }
}

/**
 * turn string to a snailfish object representation
 */
const snailfishParse = (line: string): SnailfishNumber => {
    const snailfish = [];
    let number = '';
    for (let i = 0; i < line.length; i++) {
        if (line[i].match(/\d/)) number += line[i];
        else if (number !== '') {
            snailfish.push({ type: 'number', value: parseInt(number) });
            number = '';
        }

        if (line[i] === '[') snailfish.push({ type: 'opening', value: -1 });
        if (line[i] === ']') snailfish.push({ type: 'closing', value: -1 });
    }

    return snailfish;
}

/**
 * turn snailfish object representation to a string
 */
const snailfishStringify = (snailfish: SnailfishNumber): string => {
    let result = '';
    for (let i = 0; i < snailfish.length; i++) {
        if (snailfish[i].type === 'opening') result += '[';
        if (snailfish[i].type === 'closing') result += ']';
        if (snailfish[i].type === 'number') result += snailfish[i].value;
        if (snailfish[i + 1] && snailfish[i + 1].type !== 'closing' && snailfish[i].type !== 'opening') result += ',';
    }
    return result; 
}

/**
 * find the magnitude of a snailfish pair recursively
 */
const findMagnitude = (pair: number[] | number[][]): number => {
    let left = pair[0];
    if (typeof left !== 'number') left = findMagnitude(left);

    let right = pair[1];
    if (typeof right !== 'number') right = findMagnitude(right);

    return 3 * left + 2 * right;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // parse each snailfish
    const snailfishNumbers: SnailfishNumber[] = input.trim().split('\n').map(line => snailfishParse(line));

    // keep adding all snailfish, adding brackets when needed
    let current = [...snailfishNumbers[0]];
    for (let i = 1; i < snailfishNumbers.length; i++) {
        current = [{ type: 'opening', value: -1 }, ...current, ...snailfishNumbers[i], { type: 'closing', value: -1 }];

        reduceSnailfish(current);
    }

    return findMagnitude(JSON.parse(snailfishStringify(current)));
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // parse each snailfish
    const snailfishNumbers: SnailfishNumber[] = input.trim().split('\n').map(line => snailfishParse(line));

    // find the largest magnitude between two snailfish numbers
    let maxMagnitude = -Infinity;
    for (let i = 0; i < snailfishNumbers.length; i++) {
        for (let j = 0; j < snailfishNumbers.length; j++) {
            if (i === j) continue;

            const current = [{ type: 'opening', value: -1 }, ...structuredClone(snailfishNumbers[i]), ...structuredClone(snailfishNumbers[j]), { type: 'closing', value: -1 }];
            reduceSnailfish(current);

            maxMagnitude = Math.max(maxMagnitude, findMagnitude(JSON.parse(snailfishStringify(current))));
        }
    }

    return maxMagnitude;
};

export { part1, part2 };
