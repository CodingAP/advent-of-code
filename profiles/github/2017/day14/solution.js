let computeKnotHash = string => {
    let hash = new Array(256).fill(0).map((element, index) => index);
    let sizes = string.split('').map(element => element.charCodeAt(0));
    sizes.push(17, 31, 73, 47, 23);

    let position = 0, skip = 0;
    for (let round = 0; round < 64; round++) {
        sizes.forEach(size => {
            for (let i = 0; i < size / 2; i++) {
                let temp = hash[(position + i) % hash.length];
                hash[(position + i) % hash.length] = hash[(position + (size - i - 1)) % hash.length];
                hash[(position + (size - i - 1)) % hash.length] = temp;
            }
            position = (position + size + skip) % hash.length;
            skip++;
        });
    }

    let hashString = '';
    for (let group = 0; group < 16; group++) {
        let number = hash[group * 16];
        for (let xor = 1; xor < 16; xor++) number ^= hash[group * 16 + xor];
        hashString += number.toString(16).padStart(2, '0');
    }

    return hashString;
}

const part1 = async input => {
    let bits = 0;
    for (let i = 0; i < 128; i++) {
        let hash = computeKnotHash(`${input}-${i}`);
        bits += hash.split('').reduce((acc, element) => acc + (parseInt(element, 16).toString(2).split('').filter(element => element == '1').length), 0);
    }
    return bits;
}

const part2 = async input => {
    let grid = new Array(128).fill(0).map(element => new Array(128).fill(0));
    for (let i = 0; i < 128; i++) {
        let hash = computeKnotHash(`${input}-${i}`);
        let bits = hash.split('').reduce((acc, element) => acc + parseInt(element, 16).toString(2).padStart(4, '0'), '');
        bits.split('').map(element => parseInt(element)).forEach((num, index) => grid[i][index] = num);
    }

    let floodErase = (x, y) => {
        grid[y][x] = 0;
        if (x - 1 >= 0 && grid[y][x - 1]) floodErase(x - 1, y);
        if (x + 1 < 128 && grid[y][x + 1]) floodErase(x + 1, y);
        if (y - 1 >= 0 && grid[y - 1][x]) floodErase(x, y - 1);
        if (y + 1 < 128 && grid[y + 1][x]) floodErase(x, y + 1);
    }

    let groupCount = 0;
    for (let y = 0; y < 128; y++) {
        for (let x = 0; x < 128; x++) {
            if (grid[y][x]) {
                groupCount++;
                floodErase(x, y);
            }
        }
    }
    return groupCount;
}

export { part1, part2 };