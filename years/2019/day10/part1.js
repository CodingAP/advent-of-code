const common = require('../../../scripts/common');

module.exports = input => {
    let rows = input.split('\n');
    let grid = common.create2DArray(rows.length, rows[0].length);
    common.map2DArray(grid, (value, x, y) => {
        return rows[y][x] == '#';
    });

    common.forEach2DArray(grid, (currentValue, currentX, currentY) => {
        if (!currentValue) return;
        common.forEach2DArray(grid, (otherValue, otherX, otherY) => {
            if (!otherValue) return;
            if (currentX == otherX && currentY == otherY) return;

            let rangeX = otherX - currentX;
            let rangeY = otherY - currentY;
            
        });
    });
    return 0;
}