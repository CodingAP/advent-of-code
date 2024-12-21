/**
 * puzzles/2019/day06/solution.ts
 *
 * ~~ Universal Orbit Map ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/20/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const orbits: { [key: string]: string } = {};
    input.trim().split('\n').forEach(element => {
        let tokens = element.split(')');
        orbits[tokens[1]] = tokens[0];
    });

    let orbitCount = 0;
    Object.keys(orbits).forEach(element => {
        let current = element;
        while (current != 'COM') {
            current = orbits[current];
            orbitCount++;
        }
    });
    return orbitCount;
}

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const orbits: { [key: string]: string } = {};
    input.trim().split('\n').forEach(element => {
        let tokens = element.split(')');
        orbits[tokens[1]] = tokens[0];
    });

    const person: string[] = [];
    const santa: string[] = [];

    let current = 'YOU';
    while (current != 'COM') {
        current = orbits[current];
        person.push(current);
    }

    current = 'SAN';
    while (current != 'COM') {
        current = orbits[current];
        santa.push(current);
    }

    const orbitsToMovePerson = person.filter(element => !santa.includes(element));
    const orbitsToMoveSanta = santa.filter(element => !person.includes(element));
    return orbitsToMovePerson.length + orbitsToMoveSanta.length;
}

export { part1, part2 };