const common = require('../../../scripts/common');

module.exports = input => {
    let gridToString = grid => {
        let string = '';
        grid.forEach(value => {
            string += value.join('') + '\n';
        })
        return string;
    }

    let rotate2DGrid = (grid, size) => {
        let newArray = common.create2DArray(size, size);

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                newArray[i][j] = grid[size - j - 1][i];
            }
        }

        return newArray;
    }

    let flip2DGridH = (grid, size) => {
        let newArray = common.create2DArray(size, size);

        for (let i = 0; i < size; i++) {
            newArray[i] = common.copy(grid[i]).reverse();
        }

        return newArray;
    }

    let flip2DGridV = (grid, size) => {
        return common.copy(grid).reverse();;
    }

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

        possible.push([pieceBorders.top, pieceBorders.right, pieceBorders.bottom, pieceBorders.left]); // 0 - nothing
        possible.push([pieceBorders.bottom, pieceBorders.reverseRight, pieceBorders.top, pieceBorders.reverseLeft]); // 1 - flip v
        possible.push([pieceBorders.reverseTop, pieceBorders.left, pieceBorders.reverseBottom, pieceBorders.right]); // 2 - flip h
        possible.push([pieceBorders.reverseLeft, pieceBorders.top, pieceBorders.reverseRight, pieceBorders.bottom]); // 3 - rotate 1
        possible.push([pieceBorders.reverseRight, pieceBorders.reverseTop, pieceBorders.reverseLeft, pieceBorders.reverseBottom]); // 4 - rotate 1, flip v
        possible.push([pieceBorders.right, pieceBorders.bottom, pieceBorders.left, pieceBorders.top]); // 5 - rotate 1, flip h
        possible.push([pieceBorders.reverseBottom, pieceBorders.reverseLeft, pieceBorders.reverseTop, pieceBorders.reverseRight]); // 6 - rotate 2
        possible.push([pieceBorders.right, pieceBorders.reverseBottom, pieceBorders.left, pieceBorders.reverseTop]); // 7 - rotate 3

        return possible;
    }

    let definitions = {};
    let borders = {};
    let pieces = {};

    input.split('\n\n').forEach(grid => {
        let splitGrid = grid.split('\n');

        let id = parseInt(splitGrid[0].split(/\s/)[1].replace(/:/g, ''));

        let pieceGrid = common.create2DArray(10, 10, (x, y) => {
            return splitGrid[y + 1].charAt(x) == '#';
        });
        definitions[id] = pieceGrid;
        borders[id] = getAllBorders(pieceGrid);
    });

    let squareSize = Math.sqrt(Object.keys(definitions).length);

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

    let seed = Object.keys(pieces).filter(value => pieces[value].length == 2)[0];

    let correct = null;
    let corners = [{ x: 0, y: 0 }, { x: 0, y: squareSize - 1 }, { x: squareSize - 1, y: 0 }, { x: squareSize - 1, y: squareSize - 1 }];
    for (let l = 0; l < 4; l++) {
        for (let k = 0; k < borders[seed].length; k++) {
            let grid = {};
            grid[seed] = { x: corners[l].x, y: corners[l].y, orientation: k };
            let iterations = 0;
            while (Object.keys(grid).length < (squareSize * squareSize)) {
                common.objectForEach(grid, (key, value) => {
                    let neighbors = pieces[key];
                    for (let i = 0; i < neighbors.length; i++) {
                        if (grid[neighbors[i]]) continue;
                        for (let j = 0; j < borders[neighbors[i]].length; j++) {
                            if (borders[key][value.orientation][0] == borders[neighbors[i]][j][2]) grid[neighbors[i]] = { x: value.x, y: value.y - 1, orientation: j }
                            if (borders[key][value.orientation][2] == borders[neighbors[i]][j][0]) grid[neighbors[i]] = { x: value.x, y: value.y + 1, orientation: j }
                            if (borders[key][value.orientation][1] == borders[neighbors[i]][j][3]) grid[neighbors[i]] = { x: value.x + 1, y: value.y, orientation: j }
                            if (borders[key][value.orientation][3] == borders[neighbors[i]][j][1]) grid[neighbors[i]] = { x: value.x - 1, y: value.y, orientation: j }
                        }
                    }
                });
                iterations++;
                if (iterations > 500) break;
            }

            let valid = true;
            common.objectForEach(grid, (key1, value1) => {
                if (!valid) return;
                if (value1.x < 0 || value1.x >= squareSize || value1.y < 0 || value1.y >= squareSize) valid = false;
                common.objectForEach(grid, (key2, value2) => {
                    if (key1 == key2) return;
                    if (value1.x == value2.x && value1.y == value2.y) valid = false;
                });
            });
            if (valid) correct = grid;
        }
    }

    let subsize = 8;
    let ocean = common.create2DArray(squareSize * subsize, squareSize * subsize, '');
    common.objectForEach(correct, (key, value) => {
        let oriented = common.copy(definitions[key]);
        switch (value.orientation) {
            case 0:
                break;
            case 1:
                oriented = flip2DGridV(oriented, 10);
                break;
            case 2:
                oriented = flip2DGridH(oriented, 10);
                break;
            case 3:
                oriented = rotate2DGrid(oriented, 10);
                break;
            case 4:
                oriented = rotate2DGrid(oriented, 10);
                oriented = flip2DGridV(oriented, 10);
                break;
            case 5:
                oriented = rotate2DGrid(oriented, 10);
                oriented = flip2DGridH(oriented, 10);
                break;
            case 6:
                oriented = rotate2DGrid(oriented, 10);
                oriented = rotate2DGrid(oriented, 10);
                break;
            case 7:
                oriented = rotate2DGrid(oriented, 10);
                oriented = rotate2DGrid(oriented, 10);
                oriented = rotate2DGrid(oriented, 10);
                break;
        }

        for (let y = 0; y < subsize; y++) {
            for (let x = 0; x < subsize; x++) {
                ocean[subsize * value.y + y][subsize * value.x + x] = (oriented[(10 - subsize) / 2 + y][(10 - subsize) / 2 + x]) ? '#' : '.';
            }
        }
    });

    let seamonster = [
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' '],
        ['#', ' ', ' ', ' ', ' ', '#', '#', ' ', ' ', ' ', ' ', '#', '#', ' ', ' ', ' ', ' ', '#', '#', '#'],
        [' ', '#', ' ', ' ', '#', ' ', ' ', '#', ' ', ' ', '#', ' ', ' ', '#', ' ', ' ', '#', ' ', ' ', ' '],
    ]

    for (let i = 0; i < 8; i++) {
        let oriented = common.copy(ocean);;
        switch (i) {
            case 0:
                break;
            case 1:
                oriented = flip2DGridV(oriented, squareSize * subsize);
                break;
            case 2:
                oriented = flip2DGridH(oriented, squareSize * subsize);
                break;
            case 3:
                oriented = rotate2DGrid(oriented, squareSize * subsize);
                break;
            case 4:
                oriented = rotate2DGrid(oriented, squareSize * subsize);
                oriented = flip2DGridV(oriented, squareSize * subsize);
                break;
            case 5:
                oriented = rotate2DGrid(oriented, squareSize * subsize);
                oriented = flip2DGridH(oriented, squareSize * subsize);
                break;
            case 6:
                oriented = rotate2DGrid(oriented, squareSize * subsize);
                oriented = rotate2DGrid(oriented, squareSize * subsize);
                break;
            case 7:
                oriented = rotate2DGrid(oriented, squareSize * subsize);
                oriented = rotate2DGrid(oriented, squareSize * subsize);
                oriented = rotate2DGrid(oriented, squareSize * subsize);
                break;
        }

        let strings = gridToString(oriented).split('\n').filter(value => value != '');
        
        let seaMonsters = 0;
        for (let y = 0; y < strings.length - seamonster.length + 1; y++) {
            for (let x = 0; x < strings[y].length - seamonster[0].length + 1; x++) {
                let isSeamonster = true;
                for (let j = 0; j < seamonster.length; j++) {
                    for (let k = 0; k < seamonster[j].length; k++) {
                        if (seamonster[j][k] == '#' && strings[y + j].charAt(x + k) == '.') isSeamonster = false;
                    }
                }
                if (isSeamonster) seaMonsters++;
            }
        }
        if (seaMonsters > 0) return gridToString(oriented).replace(/[.\n]/g, '').length - (seaMonsters * 15);
    }
}