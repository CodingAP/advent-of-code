import { permutation } from '../../../scripts/common.js';

const part1 = async input => {
    let happinesses = {};
    input.split('\n').forEach(element => {
        let tokens = element.split(' ');

        if (happinesses[tokens[0]] == null) happinesses[tokens[0]] = {};
        happinesses[tokens[0]][tokens[10].replace('.', '')] = parseInt(tokens[3]) * ((tokens[2] == 'gain') ? 1 : -1);
    });

    let allSeats = permutation(Object.keys(happinesses));
    let maxHappiness = -Infinity;
    allSeats.forEach(element => {
        let happiness = 0;
        for (let i = 0; i < element.length; i++) {
            happiness += happinesses[element[i]][element[(i + 1) % element.length]];
            happiness += happinesses[element[(i + 1) % element.length]][element[i]];
        }
        maxHappiness = Math.max(happiness, maxHappiness);
    });
    
    return maxHappiness;
}

const part2 = async input => {
    let happinesses = {};
    input.split('\n').forEach(element => {
        let tokens = element.split(' ');

        if (happinesses[tokens[0]] == null) happinesses[tokens[0]] = {};
        happinesses[tokens[0]][tokens[10].replace('.', '')] = parseInt(tokens[3]) * ((tokens[2] == 'gain') ? 1 : -1);
    });

    happinesses.Me = {};
    Object.keys(happinesses).forEach(element => {
        happinesses.Me[element] = 0;
        happinesses[element].Me = 0;
    });

    let allSeats = permutation(Object.keys(happinesses));
    let maxHappiness = -Infinity;
    allSeats.forEach(element => {
        let happiness = 0;
        for (let i = 0; i < element.length; i++) {
            happiness += happinesses[element[i]][element[(i + 1) % element.length]];
            happiness += happinesses[element[(i + 1) % element.length]][element[i]];
        }
        maxHappiness = Math.max(happiness, maxHappiness);
    });

    return maxHappiness;
}

export { part1, part2 }; 