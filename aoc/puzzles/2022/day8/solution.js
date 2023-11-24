const part1 = async input => {
    let rows = input.split('\n').map(line => line.split('').map(num => parseInt(num)));
    
    let visible = 0;
    for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[y].length; x++) {
            let trees = [
                new Array(x).fill(0).map((element, index) => rows[y][index]),
                new Array(y).fill(0).map((element, index) => rows[index][x]),
                new Array(rows[y].length - x - 1).fill(0).map((element, index) => rows[y][rows[y].length - index - 1]),
                new Array(rows.length - y - 1).fill(0).map((element, index) => rows[rows.length - index - 1][x])
            ];

            if (trees.reduce((acc, row) => {
                let visible = true;
                row.forEach(height => {
                    if (height >= rows[y][x]) visible = false;
                });
                if (visible) acc++;
                return acc;
            }, 0) > 0) visible++;
        }
    }
    return visible;
}

const part2 = async input => {
    let rows = input.split('\n').map(line => line.split('').map(num => parseInt(num)));

    let highest = -Infinity;
    for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[y].length; x++) {
            let trees = [
                new Array(x).fill(0).map((element, index) => rows[y][index]),
                new Array(y).fill(0).map((element, index) => rows[index][x]),
                new Array(rows[y].length - x - 1).fill(0).map((element, index) => rows[y][rows[y].length - index - 1]),
                new Array(rows.length - y - 1).fill(0).map((element, index) => rows[rows.length - index - 1][x])
            ].map(array => array.reverse());

            let score = trees.reduce((score, row) => {
                let distance = row.findIndex(height => height >= rows[y][x]) + 1;
                if (distance == 0) distance = row.length;
                return distance * score;
            }, 1);
            
            highest = Math.max(score, highest);
        }
    }
    return highest;
}

export { part1, part2 };