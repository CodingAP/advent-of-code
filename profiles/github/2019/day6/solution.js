const part1 = async input => {
    let orbits = {};
    input.replace(/\r/g, '').split('\n').forEach(element => {
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

const part2 = async input => {
    let orbits = {};
    input.replace(/\r/g, '').split('\n').forEach(element => {
        let tokens = element.split(')');
        orbits[tokens[1]] = tokens[0];
    });

    let person = [];
    let santa = [];

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

    let orbitsToMovePerson = person.filter(element => !santa.includes(element));
    let orbitsToMoveSanta = santa.filter(element => !person.includes(element));
    return orbitsToMovePerson.length + orbitsToMoveSanta.length;
}

export { part1, part2 };