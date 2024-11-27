// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2017/day21/solution.ts
 *
 * ~~ Fractal Art ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

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
            convertToString(flipVertically(flipHorizontally(grid))),
            convertToString(rotate(grid)),
            convertToString(flipVertically(rotate(grid))),
            convertToString(flipHorizontally(rotate(grid))),
            convertToString(rotate(rotate(grid))),
            convertToString(rotate(rotate(rotate(grid))))
        ]
    )];
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let rules = input.trim().split('\n').reduce((obj, line) => {
        let [left, right] = line.split(' => ');

        let allVersions = getAllVersions(left);
        left = left.replace(/\//g, '');
        allVersions.forEach(num => obj[left.length][num] = right.replace(/\//g, ''));
        
        return obj;
    }, { 4: {}, 9: {} });

    let image = ['.#.', '..#', '###'];
    for (let count = 0; count < 5; count++) {
        let tileSize = (image.length % 2 == 0) ? 2 : 3;
        let dimension = image.length / tileSize;

        let newImage = [];
        for (let y = 0; y < dimension; y++) {
            for (let x = 0; x < dimension; x++) {
                let tile = '';
                for (let j = 0; j < tileSize; j++) {
                    tile += image[y * tileSize + j].slice(x * tileSize, x * tileSize + tileSize);
                }
                let conversion = rules[tile.length][tile];
                newImage.push(new Array(tileSize + 1).fill(0).map((element, index) => conversion.slice(index * (tileSize + 1), index * (tileSize + 1) + (tileSize + 1))));
            }
        }

        let imageString = [];
        for (let y = 0; y < dimension; y++) {
            for (let i = 0; i < tileSize + 1; i++) {
                let string = '';
                for (let x = 0; x < dimension; x++) {
                    string += newImage[y * dimension + x][i];
                }
                imageString.push(string);
            }
        }
        image = imageString;
    }
    
    return image.join('').split('').filter(element => element == '#').length;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let rules = input.trim().split('\n').reduce((obj, line) => {
        let [left, right] = line.split(' => ');

        let allVersions = getAllVersions(left);
        left = left.replace(/\//g, '');
        allVersions.forEach(num => obj[left.length][num] = right.replace(/\//g, ''));

        return obj;
    }, { 4: {}, 9: {} });

    let image = ['.#.', '..#', '###'];
    for (let count = 0; count < 18; count++) {
        let tileSize = (image.length % 2 == 0) ? 2 : 3;
        let dimension = image.length / tileSize;

        let newImage = [];
        for (let y = 0; y < dimension; y++) {
            for (let x = 0; x < dimension; x++) {
                let tile = '';
                for (let j = 0; j < tileSize; j++) {
                    tile += image[y * tileSize + j].slice(x * tileSize, x * tileSize + tileSize);
                }
                let conversion = rules[tile.length][tile];
                newImage.push(new Array(tileSize + 1).fill(0).map((element, index) => conversion.slice(index * (tileSize + 1), index * (tileSize + 1) + (tileSize + 1))));
            }
        }

        let imageString = [];
        for (let y = 0; y < dimension; y++) {
            for (let i = 0; i < tileSize + 1; i++) {
                let string = '';
                for (let x = 0; x < dimension; x++) {
                    string += newImage[y * dimension + x][i];
                }
                imageString.push(string);
            }
        }
        image = imageString;
    }

    return image.join('').split('').filter(element => element == '#').length;
};

export { part1, part2 };
