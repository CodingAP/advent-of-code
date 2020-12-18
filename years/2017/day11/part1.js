const input = require('fs').readFileSync('./years/2017/day11/input.txt').toString().trim();
const { stdout } = require('process');
const common = require('../../../scripts/common');

module.exports = () => {
    let directions = input.split(',');
    let position = { x: 0, y: 0 };
    let xStep = 866, yStep = 500;

    let steps = {
        n: { x: 0, y: 2 * yStep },
        ne: { x: xStep, y: yStep },
        se: { x: xStep, y: -yStep },
        s: { x: 0, y: -2 * yStep },
        sw: { x: -xStep, y: -yStep },
        nw: { x: -xStep, y: yStep },
    };

    for (let i = 0; i < directions.length; i++) {
        let step = steps[directions[i]];
        position.x += step.x;
        position.y += step.y;
    }

    console.log(Math.abs(position.x / xStep), Math.abs(position.y / yStep));
    return (Math.abs(position.x / xStep) + Math.abs(position.y / yStep)) / 2;
}