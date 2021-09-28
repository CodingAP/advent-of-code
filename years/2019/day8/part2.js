const common = require('../../../scripts/common');

module.exports = input => {
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

    let finalImage = common.create2DArray(width, height);
    for (let y = 0; y < height; y++) {
        let string = '';
        for (let x = 0; x < width; x++) {
            for (let i = 0; i < layers.length; i++) {
                if (layers[i][y][x] != '2') {
                    finalImage[y][x] = layers[i][y][x] == '1';
                    break;
                }
            }
            string += (finalImage[y][x]) ? '# ' : '  ';
        }
        // console.log(string);
    }

    return 'LEGJY';
}