const input = require('fs').readFileSync('./years/2017/day20/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let particles = [];

    input.split(/\n/).forEach(value => {
        let tokens = value.split(/[<>]/);
        let [posX, posY, posZ] = tokens[1].split(/,/).map(value => parseInt(value));
        let [velX, velY, velZ] = tokens[3].split(/,/).map(value => parseInt(value));
        let [accX, accY, accZ] = tokens[5].split(/,/).map(value => parseInt(value));

        particles.push({ position: { x: posX, y: posY, z: posZ }, velocity: { x: velX, y: velY, z: velZ }, acceleration: { x: accX, y: accY, z: accZ } });
    });

    let points = {};
    for (let i = 0; i < 100; i++) {
        let currentPositions = {};

        particles.forEach((value, index) => {
            value.velocity.x += value.acceleration.x;
            value.velocity.y += value.acceleration.y;
            value.velocity.z += value.acceleration.z;

            value.position.x += value.velocity.x;
            value.position.y += value.velocity.y;
            value.position.z += value.velocity.z;

            let positionString = `${value.position.x},${value.position.y},${value.position.z}`;
            if (!currentPositions[positionString]) currentPositions[positionString] = [];
            currentPositions[positionString].push(index);
        });
        
        common.objectForEach(currentPositions, (key, value) => {
            if (value.length > 1) {
                for (let i = value.length - 1; i >= 0; i--) {
                    particles.splice(value[i], 1);
                }
            }
        });
    }

    return particles.length;
}