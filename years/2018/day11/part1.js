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
    let largestCoord = { x: 0, y: 0 };

    for (let y = 1; y < grid.length - 1; y++) {
        for (let x = 1; x < grid[0].length - 1; x++) {
            let sum = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    sum += grid[y + i][x + j];
                }
            }
            if (sum > largest) {
                largest = sum;
                largestCoord = { x: x - 1, y: y - 1 };
            }
        }
    }
    return `${largestCoord.x},${largestCoord.y}`;
}