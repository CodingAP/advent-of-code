const common = require('../../../scripts/common');

module.exports = input => {
    let boundingBoxes = [];
    input.split('\n').forEach(element => {
        let tokens = element.split(' ');
        let spread = tokens[1].split(',').map(element => element.split('='));

        let startX = parseInt(spread[0][1].split('..')[0]), endX = parseInt(spread[0][1].split('..')[1]) + 1;
        let startY = parseInt(spread[1][1].split('..')[0]), endY = parseInt(spread[1][1].split('..')[1]) + 1;
        let startZ = parseInt(spread[2][1].split('..')[0]), endZ = parseInt(spread[2][1].split('..')[1]) + 1;

        boundingBoxes.push({ startX, endX, startY, endY, startZ, endZ, value: tokens[0] == 'on', volume: (endX - startX) * (endY - startY) * (endZ - startZ) });
    });

    let cubes = 0;
    cubes += boundingBoxes[0].volume;

    let currentlyPlacedBB = [boundingBoxes[0]];
    let removed = [];
    for (let i = 1; i < boundingBoxes.length; i++) {
        for (let j = 0; j < currentlyPlacedBB.length; j++) {
            let x_overlap = Math.max(0, Math.min(boundingBoxes[i].endX, currentlyPlacedBB[j].endX) - Math.max(boundingBoxes[i].startX, currentlyPlacedBB[j].startX));
            let y_overlap = Math.max(0, Math.min(boundingBoxes[i].endY, currentlyPlacedBB[j].endY) - Math.max(boundingBoxes[i].startY, currentlyPlacedBB[j].startY));
            let z_overlap = Math.max(0, Math.min(boundingBoxes[i].endZ, currentlyPlacedBB[j].endZ) - Math.max(boundingBoxes[i].startZ, currentlyPlacedBB[j].startZ));

            overlapVolume = x_overlap * y_overlap * z_overlap;
            console.log(overlapVolume, x_overlap, y_overlap, z_overlap);
            cubes -= overlapVolume;
        }

        console.log(boundingBoxes[i].volume);
        if (boundingBoxes[i].value) cubes += boundingBoxes[i].volume;
        currentlyPlacedBB.push(boundingBoxes[i]);
    }

    return cubes;
}