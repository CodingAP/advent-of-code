const common = require('../../../scripts/common');

module.exports = input => {
    let grid = common.create2DArray(300, 300, (x, y) => {
        let rackID = x + 10;
        let powerLevel = rackID * y + parseInt(input);
        powerLevel *= rackID;
        powerLevel = Math.floor((powerLevel % 1000) / 100);
        powerLevel -= 5;
        return powerLevel;
    });

    let largest = -Infinity;
    let largestCoord = { x: 0, y: 0, size: 0 };

    // We don't have to get to larger values as they have more negative numbers
    for (let s = 1; s <= 20; s++) {
        for (let y = Math.floor(s / 2); y < grid.length - Math.floor(s / 2); y++) {
            for (let x = Math.floor(s / 2); x < grid[0].length - Math.floor(s / 2); x++) {
                let sum = 0;
                if (s % 2 == 0) {
                    for (let i = -Math.floor(s / 2); i < Math.floor(s / 2); i++) {
                        for (let j = -Math.floor(s / 2); j < Math.floor(s / 2); j++) {
                            sum += grid[y + i][x + j];
                        }
                    }
                } else {
                    for (let i = -Math.floor(s / 2); i <= Math.floor(s / 2); i++) {
                        for (let j = -Math.floor(s / 2); j <= Math.floor(s / 2); j++) {
                            sum += grid[y + i][x + j];
                        }
                    }
                }
                if (sum > largest) {
                    largest = sum;
                    largestCoord = { x: x - Math.floor(s / 2), y: y - Math.floor(s / 2), size: s };
                }
            }
        }
    }
    return `${largestCoord.x},${largestCoord.y},${largestCoord.size}`;
}