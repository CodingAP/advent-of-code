const common = require('../../../scripts/common');

module.exports = input => {
    let grid = common.create2DArray(128, 128);
    for (let l = 0; l < 128; l++) {
        let inputString = `${input}-${l}`;
        let ascii = Array.from(inputString).map((element, index) => inputString.charCodeAt(index));
        ascii.push(17, 31, 73, 47, 23);

        let numbers = Array.from(Array(256).keys());
        let position = 0;
        let skipSize = 0;

        for (let i = 0; i < 64; i++) {
            for (let j = 0; j < ascii.length; j++) {
                let subarray = [];
                for (let k = 0; k < ascii[j]; k++) {
                    subarray.push(numbers[(position + k) % numbers.length]);
                }

                subarray.reverse();

                for (let k = 0; k < subarray.length; k++) {
                    numbers[(position + k) % numbers.length] = subarray[k];
                }

                position += ascii[j] + skipSize;
                skipSize++;
            }
        }

        let string = '';
        for (let i = 0; i < 16; i++) {
            let subarray = numbers.slice(i * 16, i * 16 + 16);
            let xorNumber = subarray[0];
            for (let j = 1; j < subarray.length; j++) {
                xorNumber ^= subarray[j];
            }

            string += ((xorNumber < 10) ? '0' : '') + xorNumber.toString(16);
        }

        for (let i = 0; i < string.length; i++) {
            let number = parseInt(string[i], 16);
            let bits = number.toString(2).split('');
            while (bits.length < 4) bits.unshift('0');

            grid[l][i * 4 + 0] = bits[0] == '1';
            grid[l][i * 4 + 1] = bits[1] == '1';
            grid[l][i * 4 + 2] = bits[2] == '1';
            grid[l][i * 4 + 3] = bits[3] == '1';
        }
    }

    let removeRegion = (x, y) => {
        let squares = 0;
        grid[y][x] = false;
        if (x - 1 >= 0 && grid[y][x - 1]) removeRegion(x - 1, y);
        if (x + 1 < 128 && grid[y][x + 1]) removeRegion(x + 1, y);
        if (y - 1 >= 0 && grid[y - 1][x]) removeRegion(x, y - 1);
        if (y + 1 < 128 && grid[y + 1][x]) removeRegion(x, y + 1);
        return squares;
    } 

    let regions = 0;
    common.forEach2DArray(grid, (value, x, y) => {
        if (value) {
            regions++;
            console.log(removeRegion(x, y));
        }
    });
    return regions;
}