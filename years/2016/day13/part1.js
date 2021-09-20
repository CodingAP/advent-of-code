const common = require('../../../scripts/common');
const input = common.readInput('./years/2016/day13/input.txt');

module.exports = () => {
    let grid = common.create2DArray(50, 50, (x, y) => {
        let formula = x * x + 3 * x + 2 * x * y + y + y * y;
        formula += parseInt(input);
        return formula.toString(2).replace(/0/g, '').length % 2;
    });

    return common.mazeSolver(grid, { x: 1, y: 1 }, { x: 31, y: 39 }).length - 1;
}