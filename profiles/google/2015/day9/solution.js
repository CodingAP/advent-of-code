import { permutation } from '../../../scripts/common.js';

const part1 = async input => {
    let distances = {};
    input.split('\n').forEach(element => {
        const tokens = element.split(' ');
        if (distances[tokens[0]] == null) distances[tokens[0]] = {};
        if (distances[tokens[2]] == null) distances[tokens[2]] = {};
        distances[tokens[0]][tokens[2]] = parseInt(tokens[4]);
        distances[tokens[2]][tokens[0]] = parseInt(tokens[4]);
    });

    let allDistances = permutation(Object.keys(distances));
    let minDistance = Infinity;
    allDistances.forEach(element => {
        let distance = 0;
        for (let i = 0; i < element.length - 1; i++) {
            distance += distances[element[i]][element[i + 1]];
        }
        minDistance = Math.min(distance, minDistance);
    });

    return minDistance;
}

const part2 = async input => {
    let distances = {};
    input.split('\n').forEach(element => {
        const tokens = element.split(' ');
        if (distances[tokens[0]] == null) distances[tokens[0]] = {};
        if (distances[tokens[2]] == null) distances[tokens[2]] = {};
        distances[tokens[0]][tokens[2]] = parseInt(tokens[4]);
        distances[tokens[2]][tokens[0]] = parseInt(tokens[4]);
    });

    let allDistances = permutation(Object.keys(distances));
    let maxDistance = -Infinity;
    allDistances.forEach(element => {
        let distance = 0;
        for (let i = 0; i < element.length - 1; i++) {
            distance += distances[element[i]][element[i + 1]];
        }
        maxDistance = Math.max(distance, maxDistance);
    });

    return maxDistance;
}

export { part1, part2 }; 