const part1 = async input => {
    let width = 50, height = 6;
    let rows = new Array(height).fill(0).map((element, y) => new Array(width).fill(false));

    input.split('\n').forEach(line => {
        let tokens = line.split(' ');
        if (tokens[0] == 'rect') {
            let [w, h] = tokens[1].split('x').map(num => parseInt(num));
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    rows[y][x] = true;
                }
            }
        } else {
            let index = parseInt(tokens[2].split('=')[1]);
            let amount = parseInt(tokens[4]);
            let array = [];

            if (tokens[1] == 'row') {
                for (let x = 0; x < width; x++) array.push(rows[index][x]);
                for (let i = 0; i < amount; i++) array.unshift(array.pop());
                for (let x = 0; x < width; x++) rows[index][x] = array[x];
            } else {
                for (let y = 0; y < height; y++) array.push(rows[y][index]);
                for (let i = 0; i < amount; i++) array.unshift(array.pop());
                for (let y = 0; y < height; y++) rows[y][index] = array[y];
            }
        }
    });

    return rows.flatMap(element => element).filter(element => element).length;
}

const part2 = async input => {
    let width = 50, height = 6;
    let rows = new Array(height).fill(0).map((element, y) => new Array(width).fill(false));

    input.split('\n').forEach(line => {
        let tokens = line.split(' ');
        if (tokens[0] == 'rect') {
            let [w, h] = tokens[1].split('x').map(num => parseInt(num));
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    rows[y][x] = true;
                }
            }
        } else {
            let index = parseInt(tokens[2].split('=')[1]);
            let amount = parseInt(tokens[4]);
            let array = [];

            if (tokens[1] == 'row') {
                for (let x = 0; x < width; x++) array.push(rows[index][x]);
                for (let i = 0; i < amount; i++) array.unshift(array.pop());
                for (let x = 0; x < width; x++) rows[index][x] = array[x];
            } else {
                for (let y = 0; y < height; y++) array.push(rows[y][index]);
                for (let i = 0; i < amount; i++) array.unshift(array.pop());
                for (let y = 0; y < height; y++) rows[y][index] = array[y];
            }
        }
    });
    
    console.log(rows.map(element => element.map(element => (element) ? '#' : ' ').join('')).join('\n'));
    return 'EOARGPHYAO';
}

export { part1, part2 };