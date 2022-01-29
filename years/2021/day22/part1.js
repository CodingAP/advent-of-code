const common = require('../../../scripts/common');

module.exports = input => {
    let cubes = {};
    input.split('\n').forEach(element => {
        let tokens = element.split(' ');
        let spread = tokens[1].split(',').map(element => element.split('='));

        let startX = parseInt(spread[0][1].split('..')[0]), endX = parseInt(spread[0][1].split('..')[1]);
        let startY = parseInt(spread[1][1].split('..')[0]), endY = parseInt(spread[1][1].split('..')[1]);
        let startZ = parseInt(spread[2][1].split('..')[0]), endZ = parseInt(spread[2][1].split('..')[1]);

        let alreadyThere = 0;

        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                for (let z = startZ; z <= endZ; z++) {
                    if (cubes[`${x},${y},${z}`]) alreadyThere++;
                    cubes[`${x},${y},${z}`] = (tokens[0] == 'on');
                }
            }
        }
        console.log(alreadyThere);
    });
    return Object.values(cubes).filter(element => element).length;
}