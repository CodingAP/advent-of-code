const input = require('fs').readFileSync('./years/2017/day20/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let particles = [];

    input.split(/\n/).forEach(value => {
        let tokens = value.split(/[<>]/);
        let [ posX, posY, posZ ] = tokens[1].split(/,/).map(value => parseInt(value));
        let [ velX, velY, velZ ] = tokens[3].split(/,/).map(value => parseInt(value));
        let [ accX, accY, accZ ] = tokens[5].split(/,/).map(value => parseInt(value));

        particles.push({ position: { x: posX, y: posY, z: posZ }, velocity: { x: velX, y: velY, z: velZ }, acceleration: { x: accX, y: accY, z: accZ } });
    });

    let points = {};
    for (let i = 0; i < 1000; i++) {
        let closest = -1;
        let distance = Infinity;
        particles.forEach((value, index) => {
            value.velocity.x += value.acceleration.x;
            value.velocity.y += value.acceleration.y;
            value.velocity.z += value.acceleration.z;

            value.position.x += value.velocity.x;
            value.position.y += value.velocity.y;
            value.position.z += value.velocity.z;

            let manhattan = Math.abs(value.position.x) + Math.abs(value.position.y) + Math.abs(value.position.z);
            if (manhattan < distance) {
                distance = manhattan;
                closest = index;
            }
        });
        if (!points[closest]) points[closest] = 0;
        points[closest]++;
    }
    
    let highestPoints = -Infinity;
    let highest = -1;
    common.objectForEach(points, (key, value) => {
        if (value > highestPoints) {
            highest = key;
            highestPoints = value;
        }
    });
    return highest;
}