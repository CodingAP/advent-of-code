module.exports = input => {
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