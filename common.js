module.exports = {
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
                array[y][x] = value;
            }
        }
        return array;
    },
    forEach2DArray: (array, callback) => {
        for (let y = 0; y < array.length; y++) {
            for (let x = 0; x < array[y].length; x++) {
                callback(array[y][x], x, y);
            }
        }
    },
    permutator: (inputArr) => {
        let result = [];
      
        const permute = (arr, m = []) => {
            if (arr.length === 0) {
                result.push(m)
            } else {
                for (let i = 0; i < arr.length; i++) {
                    let curr = arr.slice();
                    let next = curr.splice(i, 1);
                    permute(curr.slice(), m.concat(next))
                }
            }
        }
      
        permute(inputArr)
      
        return result;
    },
    md5: require('md5'),
    addAll: array => {
        let sum = 0;
        array.forEach(value => { sum += value });
        return sum;
    },
    arraysEqual: (a, b, orderSensitive = true) => {
        let sortedA = [...a], sortedB = [...b];
        
        if (!orderSensitive) {
            sortedA.sort();
            sortedB.sort();
        }

        if (sortedA === sortedB) return true;
        if (sortedA == null || sortedB == null) return false;
        if (sortedA.length !== sortedB.length) return false;

        for (var i = 0; i < sortedA.length; ++i) {
            if (sortedA[i] !== sortedB[i]) return false;
        }
        return true;
    }
}