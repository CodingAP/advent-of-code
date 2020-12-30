const input = require('fs').readFileSync('./years/2018/day23/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let nanobots = [];
    input.split(/\r\n/).forEach(value => {
        let position = value.split(' ')[0].split(/[<>]/)[1].split(',').map(value => parseInt(value));
        let radius = parseInt(value.split(' ')[1].split('=')[1]);
        
        nanobots.push({ position: { x: position[0], y: position[1], z: position[2] }, radius });
    });
    
    let largest = null;
    nanobots.forEach(value => {
        if (largest == null || value.radius > largest.radius) largest = value;
    });
    
    let count = 0;
    nanobots.forEach(value => {
        let distance = Math.abs(largest.position.x - value.position.x) + Math.abs(largest.position.y - value.position.y) + Math.abs(largest.position.z - value.position.z);
        if (distance <= largest.radius) count++;
    });
    return count;
}