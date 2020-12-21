const input = require('fs').readFileSync('./years/2020/day20/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let convertArrayToBinary = array => {
        return parseInt(array.map(value => (value) ? '1' : '0').join(''), 2);
    }

    let getAllBorders = piece => {
        let pieceBorders = {};

        pieceBorders.top = piece[0];
        pieceBorders.bottom = piece[piece.length - 1];
        pieceBorders.left = [];
        pieceBorders.right = [];

        for (let i = 0; i < piece.length; i++) {
            pieceBorders.left.push(piece[i][0]);
            pieceBorders.right.push(piece[i][piece[i].length - 1]);
        }

        pieceBorders.reverseTop = common.copy(pieceBorders.top).reverse();
        pieceBorders.reverseBottom = common.copy(pieceBorders.bottom).reverse();
        pieceBorders.reverseLeft = common.copy(pieceBorders.left).reverse();
        pieceBorders.reverseRight = common.copy(pieceBorders.right).reverse();

        common.objectMap(pieceBorders, (key, value) => {
            return convertArrayToBinary(value);
        });

        let possible = [];

        possible.push([pieceBorders.top, pieceBorders.right, pieceBorders.bottom, pieceBorders.left]);
        possible.push([pieceBorders.bottom, pieceBorders.reverseRight, pieceBorders.top, pieceBorders.reverseLeft]);
        possible.push([pieceBorders.reverseTop, pieceBorders.left, pieceBorders.reverseBottom, pieceBorders.right]);
        possible.push([pieceBorders.reverseLeft, pieceBorders.top, pieceBorders.reverseRight, pieceBorders.bottom]);
        possible.push([pieceBorders.reverseRight, pieceBorders.reverseTop, pieceBorders.reverseLeft, pieceBorders.reverseBottom]);
        possible.push([pieceBorders.right, pieceBorders.bottom, pieceBorders.left, pieceBorders.top]);
        possible.push([pieceBorders.reverseBottom, pieceBorders.reverseLeft, pieceBorders.reverseTop, pieceBorders.reverseRight]);
        possible.push([pieceBorders.right, pieceBorders.reverseBottom, pieceBorders.left, pieceBorders.reverseTop]);

        return possible;
    }

    let borders = {};
    let pieces = {};

    input.split('\n\n').forEach(grid => {
        let splitGrid = grid.split('\n');

        let id = parseInt(splitGrid[0].split(/\s/)[1].replace(/:/g, ''));

        let pieceGrid = common.create2DArray(10, 10, (x, y) => {
            return splitGrid[y + 1].charAt(x) == '#';
        });
        borders[id] = getAllBorders(pieceGrid);
    });

    common.objectForEach(borders, (key1, value1) => {
        common.objectForEach(borders, (key2, value2) => {
            if (key1 == key2) return;
            if (!pieces[key1]) pieces[key1] = [];
            for (let i = 0; i < value1.length; i++) {
                for (let j = 0; j < value2.length; j++) {
                    if (value1[i][0] == value2[j][2] || value1[i][2] == value2[j][0] || value1[i][1] == value2[j][3] || value1[i][3] == value2[j][1]) {
                        pieces[key1].push(key2);
                        return;
                    }
                }
            }
        });
    });

    let sum = 1;
    common.objectForEach(pieces, (key, value) => {
        if (value.length == 2) sum *= parseInt(key);
    });
    return sum;
}