const input = require('fs').readFileSync('./years/2020/day17/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let space = {};
    
    let rows = input.split('\n');
    for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[y].length; x++) {
            space[`${x},${y},0`] = (rows[y].charAt(x) == '#');
        }
    }

    for (let i = 0; i < 6; i++) {
        let newSpace = {};

        common.objectForEach(space, (key, value) => {
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    for (let z = -1; z <= 1; z++) {
                        if (x == 0 && y == 0 && z == 0) continue;
                        let [currentX, currentY, currentZ] = key.split(',').map(value => parseInt(value));
                        if (space[`${currentX + x},${currentY + y},${currentZ + z}`] == null) space[`${currentX + x},${currentY + y},${currentZ + z}`] = false;
                    }
                }
            }
        });

        common.objectForEach(space, (key, value) => {
            let neighbors = 0;
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    for (let z = -1; z <= 1; z++) {
                        if (x == 0 && y == 0 && z == 0) continue;  
                        let current = common.parseListToInt(key, ',');
                        if (space[`${current[0] + x},${current[1] + y},${current[2] + z}`]) neighbors++;
                    }
                }
            }

            newSpace[key] = (value) ? (neighbors == 2 || neighbors == 3) : (neighbors == 3);
        });

        space = newSpace;
    }
    
    let active = 0;
    
    common.objectForEach(space, (key, value) => {
        if (value) active++;
    });

    return active;
}