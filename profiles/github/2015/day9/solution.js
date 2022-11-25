import { permutation } from '../../../../scripts/common.js';
const common = { permutator: permutation };

const part1 = async input => {
    let distances = {};
    let distancesInput = input.split('\n');
    for (let i = 0; i < distancesInput.length; i++) {
        let tokens = distancesInput[i].split(' ');
        if (!distances[tokens[0]]) distances[tokens[0]] = {};
        distances[tokens[0]][tokens[2]] = parseInt(tokens[4]);

        if (!distances[tokens[2]]) distances[tokens[2]] = {};
        distances[tokens[2]][tokens[0]] = parseInt(tokens[4]);
    }

    let shortestDistance = Infinity;
    let cities = Object.keys(distances);
    let allPermutes = common.permutator(cities);
    for (let i = 0; i < allPermutes.length; i++) {
        let distance = 0;
        for (let j = 0; j < allPermutes[i].length - 1; j++) {
            distance += distances[allPermutes[i][j]][allPermutes[i][j + 1]];
        }
        if (distance < shortestDistance) shortestDistance = distance;
    }

    return shortestDistance;
}

const part2 = async input => {
    let distances = {};
    let distancesInput = input.split('\n');
    for (let i = 0; i < distancesInput.length; i++) {
        let tokens = distancesInput[i].split(' ');
        if (!distances[tokens[0]]) distances[tokens[0]] = {};
        distances[tokens[0]][tokens[2]] = parseInt(tokens[4]);

        if (!distances[tokens[2]]) distances[tokens[2]] = {};
        distances[tokens[2]][tokens[0]] = parseInt(tokens[4]);
    }

    let largestDistance = -Infinity;
    let cities = Object.keys(distances);
    let allPermutes = common.permutator(cities);
    for (let i = 0; i < allPermutes.length; i++) {
        let distance = 0;
        for (let j = 0; j < allPermutes[i].length - 1; j++) {
            distance += distances[allPermutes[i][j]][allPermutes[i][j + 1]];
        }
        if (distance > largestDistance) largestDistance = distance;
    }

    return largestDistance;
}

export { part1, part2 };