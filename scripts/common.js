require = require('esm')(module);
const Combinatorics = require('js-combinatorics');
const dijkstra = require('dijkstrajs');

class BreadthFirstSearch {
    constructor(start, end, cellArr) {
        this.rows = cellArr.length;
        this.columns = cellArr[0].length;
        this.matrix = {};
        this.start = start;
        this.end = end;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.matrix[`${i}_${j}`] = cellArr[i][j];
            }
        }
    }

    getChildren(node) {
        let [i_str, j_str] = node.split('_');
        let i = parseInt(i_str);
        let j = parseInt(j_str);

        let children = [];
        let di_dj_arr = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        di_dj_arr.forEach(([di, dj]) => {
            if (i + di >= 0 && j + dj >= 0 && i + di < this.rows && j + dj < this.columns && !this.matrix[`${i + di}_${j + dj}`].isWall) children.push(`${i + di}_${j + dj}`);
        })

        return children;
    }

    startAlgorithm() {
        let visited = [];
        let parents = {};
        let found = false;

        let pendingNodes = [];
        pendingNodes.push(this.start);
        parents[this.start] = null;

        while (pendingNodes.length) {
            let currNode = pendingNodes[0];

            if (currNode === this.end) {
                visited.push(this.end);
                found = true;
                break;
            }

            let children = this.getChildren(currNode);

            let unvisitedChildren = children.filter(child => !visited.includes(child));

            for (let i = 0; i < unvisitedChildren.length; i++) {
                parents[unvisitedChildren[i]] = currNode;
                if (!pendingNodes.includes(unvisitedChildren[i])) pendingNodes.push(unvisitedChildren[i]);
            }

            visited.push(currNode);
            pendingNodes.shift();
        }

        if (!found) {
            return {
                exploredNodes: visited,
                path: [],
                found
            }
        }

        let path = [this.end];
        let parent = parents[this.end];
        while (parent) {
            path.push(parent);
            parent = parents[parent];
        }

        path.reverse();

        return {
            exploredNodes: visited,
            path,
            found
        }
    }
}

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
    solveMaze: (grid, start, end) => {
        // if value == 1, then its a wall
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[0].length; x++) {
                grid[y][x] = { weight: 0, isWall: grid[y][x] == 1 };
            }
        }

        return new BreadthFirstSearch(`${start.x}_${start.y}`, `${end.x}_${end.y}`, grid).startAlgorithm().path.map(element => {
            let tokens = element.split('_').map(element => parseInt(element));
            return { x: tokens[0], y: tokens[1] };
        });
    },
    solveMazeWeighted: (grid, start, end) => {
        let gridObj = {};

        common.forEach2DArray(grid, (value, x, y) => {
            let current = `${x},${y}`;
            gridObj[current] = {};

            if (y + 1 < grid.length) gridObj[current][`${x},${y + 1}`] = grid[y + 1][x];
            if (y - 1 >= 0) gridObj[current][`${x},${y - 1}`] = grid[y - 1][x];
            if (x + 1 < grid[0].length) gridObj[current][`${x + 1},${y}`] = grid[y][x + 1];
            if (x - 1 >= 0) gridObj[current][`${x - 1},${y}`] = grid[y][x - 1];
        });

        return dijkstra.find_path(gridObj, `${start.x},${start.y}`, `${end.x},${end.y}`).map(element => {
            let [x, y] = common.parseListToInt(element, ',');
            return { x, y };
        });
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
    readInput: (day, year) => {
        return require('fs').readFileSync(`./years/${year}/day${day}/input.txt`).toString().trim().replace(/\r/g, '');
    },
    readFile: path => {
        return require('fs').readFileSync(path).toString().replace(/\r/g, '');
    }
}

module.exports = common;