import { powerSet } from '../../../scripts/common.js';

const part1 = async input => {
    let containers = input.split('\n').map(number => parseInt(number));
    let allCombinations = powerSet(containers);

    return allCombinations.filter(element => element.reduce((acc, element) => acc + element, 0) == 150).length;
}

const part2 = async input => {
    let containers = input.split('\n').map(number => parseInt(number));
    let allCombinations = powerSet(containers);

    let filledContainers = allCombinations.filter(element => element.reduce((acc, element) => acc + element, 0) == 150);
    let minLength = filledContainers.reduce((acc, element) => Math.min(acc, element.length), Infinity);

    return filledContainers.filter(element => element.length == minLength).length;
}

export { part1, part2 }; 