const common = require('../../../scripts/common');

module.exports = input => {
    let particles = [];

    input.split('\n').forEach(element => {
        let tokens = element.replace(/ /g, '').split(/[<>]/g);

        let particle = {
            position: { x: parseInt(tokens[1].split(',')[0]), y: parseInt(tokens[1].split(',')[1]) },
            velocity: { x: parseInt(tokens[3].split(',')[0]), y: parseInt(tokens[3].split(',')[1]) },
        };

        particles.push(particle);
    });

    let smallestBoundingBox = Infinity;
    let smallest = -1;
    for (let i = 0; i < 20000; i++) {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        for (let j = 0; j < particles.length; j++) {
            let newX = particles[j].position.x + particles[j].velocity.x * i;
            let newY = particles[j].position.y + particles[j].velocity.y * i;

            minX = Math.min(minX, newX);
            maxX = Math.max(maxX, newX);
            minY = Math.min(minY, newY);
            maxY = Math.max(maxY, newY);
        }

        let boundingBox = (maxX - minX) * (maxY - minY);
        if (boundingBox < smallestBoundingBox) {
            smallest = i;
            smallestBoundingBox = boundingBox;
        }
    }

    return smallest;
}