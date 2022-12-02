const part1 = async input => {
    let rotate = grid => new Array(grid.length).fill(0).map((element, row) => new Array(grid[row].length).fill(0).map((element, col) => grid[grid[row].length - col - 1][row]));
    let flipHorizontally = grid => new Array(grid.length).fill(0).map((element, row) => grid[row].reverse());
    let flipVertically = grid => [...grid].reverse();
    let convertToString = grid => grid.map(element => element.join('')).join('');

    const getAllVersions = image => {
        let rows = image.split('/');
        let grid = new Array(rows.length).fill(0).map((element, row) => new Array(rows[row].length).fill(0).map((element, col) => rows[row][col]));

        return [...new Set(
            [
                convertToString(grid),
                convertToString(flipVertically(grid)),
                convertToString(flipHorizontally(grid)),
                convertToString(rotate(grid)),
                convertToString(flipVertically(rotate(grid))),
                convertToString(flipHorizontally(rotate(grid))),
                convertToString(rotate(rotate(grid))),
                convertToString(rotate(rotate(rotate(grid))))
            ]
        )];
    }

    let conversions = input.split('\n').reduce((obj, line) => {
        let [left, right] = line.split(' => ');

        let allVersions = getAllVersions(left);
        left = left.replace(/\//g, '');
        if (left.length == 4) allVersions.forEach(num => obj[left.length][num] = right.replace(/\//g, ''));
        else allVersions.forEach(num => {
            let lines = right.split('/');
            obj[left.length][num] = [
                lines[0].slice(0, 2) + lines[1].slice(0, 2),
                lines[0].slice(2) + lines[1].slice(2),
                lines[2].slice(0, 2) + lines[3].slice(0, 2),
                lines[2].slice(2) + lines[3].slice(2)
            ];
        });
        
        return obj;
    }, { 4: {}, 9: {} });

    let image = ['.#...####'];
    // image = ['#..#', '....', '....', '#..#']
    for (let count = 0; count < 2; count++) {
        let tileSize = (image.length % 2 == 0) ? 2 : 3;
        let imageSize = image.length / tileSize;
        let newImage = [];

        for (let y = 0; y < imageSize; y++) {
            for (let x = 0; x < imageSize; x++) {
                let tile = image[y * imageSize + x];
                let conversion = conversions[tile.length][tile];
                image.splice(y * imageSize + x, ) = conversion;
            }
        }
    }
    return 0;
}

const part2 = async input => {
    return 0;
}

export { part1, part2 };