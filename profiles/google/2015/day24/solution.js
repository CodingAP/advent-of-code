import { combination } from '../../../scripts/common.js';

const part1 = async input => {
    let packages = input.split('\n').map(element => parseInt(element));
    let idealWeight = packages.reduce((acc, element) => acc + element, 0) / 3;
    
    let smallest = null;
    for (let i = 1; i < packages.length; i++) {
        let allCombinations = combination(packages, i);
        for (let comb of allCombinations) {
            if (comb.reduce((acc, element) => acc + element, 0) == idealWeight) {
                let quantum = comb.reduce((acc, element) => acc * element, 1);
                if (!smallest || quantum < smallest) smallest = quantum;
            }
        }
        if (smallest) break;
    }
    return smallest;
}

const part2 = async input => {
    let packages = input.split('\n').map(element => parseInt(element));
    let idealWeight = packages.reduce((acc, element) => acc + element, 0) / 4;

    let smallest = null;
    for (let i = 1; i < packages.length; i++) {
        let allCombinations = combination(packages, i);
        for (let comb of allCombinations) {
            if (comb.reduce((acc, element) => acc + element, 0) == idealWeight) {
                let quantum = comb.reduce((acc, element) => acc * element, 1);
                if (!smallest || quantum < smallest) smallest = quantum;
            }
        }
        if (smallest) break;
    }
    return smallest;
}

export { part1, part2 }; 