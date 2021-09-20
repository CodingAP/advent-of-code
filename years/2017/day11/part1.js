const input = require('fs').readFileSync('./years/2017/day11/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    // let directions = input.split(',');
    // let positions = { n: 0, s: 0, e: 0, w: 0 };
    // let steps = {
    //     n: { n: 2, s: 0, e: 0, w: 0 },
    //     ne: { n: 1, s: 0, e: 1, w: 0 },
    //     se: { n: 0, s: 1, e: 1, w: 0 },
    //     s: { n: 0, s: 2, e: 0, w: 0 },
    //     sw: { n: 0, s: 1, e: 0, w: 1 },
    //     nw: { n: 1, s: 0, e: 0, w: 1 }
    // };

    // for (let i = 0; i < directions.length; i++) {
    //     let currentStep = steps[directions[i]];
    //     positions.n += currentStep.n;
    //     positions.s += currentStep.s;
    //     positions.e += currentStep.e;
    //     positions.w += currentStep.w;
    // }

    // console.log(Math.abs(positions.n - positions.s), Math.abs(positions.w - positions.e));
    //--------------------------------------------------------
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

    let x = position.x / xStep;
    let y = position.y / yStep;

    console.log(Math.abs(position.x / xStep), Math.abs(position.y / yStep));
    return (Math.abs(position.x / xStep) + Math.abs(position.y / yStep));
}