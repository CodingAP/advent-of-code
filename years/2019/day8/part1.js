const input = require('fs').readFileSync('./years/2019/day8/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let width = 25;
    let height = 6;

    let layers = new Array(input.length / (width * height));
    for (let i = 0; i < layers.length; i++) layers[i] = common.create2DArray(width, height);

    for (let i = 0; i < layers.length; i++) {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                layers[i][y][x] = input.charAt(i * (width * height) + y * width + x);
            }
        }
    }

    let lowest = Infinity;
    let index = 0;
    for (let i = 0; i < layers.length; i++) {
        let zeros = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (layers[i][y][x] == '0') zeros++;
            }
        }

        if (zeros < lowest) {
            lowest = zeros;
            index = i;
        }
    }

    let ones = 0, twos = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (layers[index][y][x] == '1') ones++;
            if (layers[index][y][x] == '2') twos++;
        }
    }
    return ones * twos;
}