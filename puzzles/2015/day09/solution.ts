/**
 * puzzles/2015/day09/solution.ts
 * 
 * ~~ All in a Single Night ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

/**
 * take an array and return all possible permutations
 */
const permuation = (array: string[]): string[][] => {
    if (!array.length) return [[]];
    return array.flatMap(element => {
        return permuation(array.filter(perm => perm !== element)).map(perms => [element, ...perms]);
    });
}

/**
 * code for part 1 of the advent of code puzzle
 */
const part1 = (input: string) => {
    // parse input
    const distances = input.trim().split(/\n/g).reduce<{ [key: string]: { [key: string]: number }}>((obj, distance) => {
        const words = distance.split(' ');

        if (obj[words[0]] == null) obj[words[0]] = {};
        obj[words[0]][words[2]] = parseInt(words[4]);

        if (obj[words[2]] == null) obj[words[2]] = {};
        obj[words[2]][words[0]] = parseInt(words[4]);

        return obj;
    }, {});

    // find the shortest distance through brute force
    const allPossible = permuation(Object.keys(distances));
    return allPossible.reduce((min, arrangment) => {
        let distance = 0;
        for (let i = 0; i < arrangment.length - 1; i++) {
            distance += distances[arrangment[i]][arrangment[i + 1]];
        }

        return Math.min(min, distance);
    }, Infinity);
}

/**
 * code for part 2 of the advent of code puzzle
 */
const part2 = (input: string) => {
    // parse input
    const distances = input.trim().split(/\n/g).reduce<{ [key: string]: { [key: string]: number }}>((obj, distance) => {
        const words = distance.split(' ');

        if (obj[words[0]] == null) obj[words[0]] = {};
        obj[words[0]][words[2]] = parseInt(words[4]);

        if (obj[words[2]] == null) obj[words[2]] = {};
        obj[words[2]][words[0]] = parseInt(words[4]);

        return obj;
    }, {});

    // find the longest distance through brute force
    const allPossible = permuation(Object.keys(distances));
    return allPossible.reduce((max, arrangment) => {
        let distance = 0;
        for (let i = 0; i < arrangment.length - 1; i++) {
            distance += distances[arrangment[i]][arrangment[i + 1]];
        }

        return Math.max(max, distance);
    }, -Infinity);
}

export { part1, part2 };