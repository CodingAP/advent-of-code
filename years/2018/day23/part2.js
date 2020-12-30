const input = require('fs').readFileSync('./years/2018/day23/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let nanobots = [];
    input.split(/\r\n/).forEach(value => {
        let position = value.split(' ')[0].split(/[<>]/)[1].split(',').map(value => parseInt(value));
        let radius = parseInt(value.split(' ')[1].split('=')[1]);

        nanobots.push({ position: { x: position[0], y: position[1], z: position[2] }, radius });
    });
}