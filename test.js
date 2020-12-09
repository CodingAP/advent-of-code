const common = require('./common');

let grid = common.create2DArray(5, 5, (x, y) => { return x + y; });

console.log(grid);