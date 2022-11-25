import { powerSet } from '../../../../scripts/common.js';
const common = {
    powerSet,
    parseListToInt: input => input.split('\n').map(element => parseInt(element)),
    addAll: input => input.reduce((acc, num) => acc + num, 0)
}

const part1 = async input => {
    let possible = [];
    let allCombos = common.powerSet(common.parseListToInt(input));

    allCombos.forEach(value => {
        if (common.addAll(value) == 150) possible.push(value);
    });

    return possible.length;
}

const part2 = async input => {
    let possible = [];
    let allCombos = common.powerSet(common.parseListToInt(input));

    allCombos.forEach(value => {
        if (common.addAll(value) == 150) possible.push(value);
    });

    let smallestPossible = [];
    let smallest = Infinity;
    possible.forEach(value => {
        if (value.length < smallest) {
            smallestPossible = [value];
            smallest = value.length;
        } else if (value.length == smallest) {
            smallestPossible.push(value);
        }
    })

    return smallestPossible.length;
}

export { part1, part2 };