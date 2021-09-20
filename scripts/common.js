require = require('esm')(module);
let Combinatorics = require('js-combinatorics');

let common = {
    parseListToInt: (array, splitter = '\n', radix = 10) => {
        return array.split(splitter).map(value => parseInt(value, radix));
    },
    create2DArray: (width, height, initialValue = null) => {
        let array = new Array(height);
        for (let y = 0; y < height; y++) {
            array[y] = new Array(width);
            for (let x = 0; x < width; x++) {
                let value = initialValue;
                if (typeof initialValue === 'function') value = initialValue(x, y);
                if (Array.isArray(initialValue)) value = [...initialValue];
                array[y][x] = value;
            }
        }
        return array;
    },
    map2DArray: (array, callback) => {
        for (let y = 0; y < array.length; y++) {
            for (let x = 0; x < array[y].length; x++) {
                array[y][x] = callback(array[y][x], x, y);
            }
        }
    },
    forEach2DArray: (array, callback) => {
        for (let y = 0; y < array.length; y++) {
            for (let x = 0; x < array[y].length; x++) {
                callback(array[y][x], x, y);
            }
        }
    },
    rotate2DArray: (grid, size) => {
        let newArray = common.create2DArray(size, size);

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                newArray[i][j] = grid[size - j - 1][i];
            }
        }

        return newArray;
    },
    permutator: (array) => {
        return [...new Combinatorics.Permutation(array)];
    },
    md5: require('md5'),
    addAll: array => {
        let sum = array[0];
        array.slice(1).forEach(value => { if (value != null) sum += value });
        return sum;
    },
    prompt: require('prompt-sync')({ sigint: true }),
    copy: obj => {
        return JSON.parse(JSON.stringify(obj));
    },
    arrayEquals: (a, b, matchOrder = false) => {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        let sortedA = JSON.parse(JSON.stringify(a)).sort();
        let sortedB = JSON.parse(JSON.stringify(b)).sort();

        for (var i = 0; i < a.length; ++i) {
            if ((matchOrder ? a : sortedA)[i] !== (matchOrder ? b : sortedB)[i]) return false;
        }
        return true;
    },
    mazeSolver: (maze, startingPosition, endPosition, shortest = true) => {
        let Snake = require('snake');
        let snake = new Snake();

        let result = snake.solve({
            maze: maze,
            start: [ startingPosition.x, maze.length - 1 - startingPosition.y ],
            end: [ endPosition.x, maze.length - 1 - endPosition.y ],
            heuristic: 'breadthFirst'
        });

        return result.route;
    },
    objectForEach: (obj, callback) => {
        let keys = Object.keys(obj);
        keys.forEach(value => {
            callback(value, obj[value]);
        });
    },
    objectMap: (obj, callback) => {
        let keys = Object.keys(obj);
        keys.forEach(value => {
            obj[value] = callback(value, obj[value]);
        });
    },
    factor: number => [...Array(number + 1).keys()].filter(i => number % i === 0),
    gcd: (num1, num2) => {
        while (num1 != 0 && num2 != 0) {
            if (num1 > num2) num1 %= num2;
            else num2 %= num1;
        }
        return Math.max(num1, num2);
    },
    powerSet: array => {
        return [...new Combinatorics.PowerSet(array)];
    },
    cartesianProduct: array => {
        return [...new Combinatorics.CartesianProduct(array)];
    },
    combinations: (array, number) => {
        return [...new Combinatorics.Combination(array, number)];
    },
    baseN: (array, number) => {
        return [...new Combinatorics.BaseN(array, number)];
    },
    readInput: path => {
        return require('fs').readFileSync(path).toString().trim().replace(/\r/g, '');
    }
}

module.exports = common;