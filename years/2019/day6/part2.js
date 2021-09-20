const input = require('fs').readFileSync('./years/2019/day6/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
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

    orbitsToMovePerson = person.filter(element => !santa.includes(element));
    orbitsToMoveSanta = santa.filter(element => !person.includes(element));
    return orbitsToMovePerson.length + orbitsToMoveSanta.length;
}