// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2023/day11/solution.ts
 * 
 * ~~ Cosmic Expansion ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/10/2023
 */

/**
 * gets all possible combinations of elements with length k
 * 
 * @param {any[]} array list of elements to combine
 * @param {number} k length of set
 * @returns {any[][]}
 */
const combination = (array, k) => {
    let result = [];

    const combRecursive = (_array, _k, _i, _current) => {
        if (_current.length == k) result.push(_current);
        if (_current.length == k || _i == _array.length) return;

        combRecursive(_array, _k, _i + 1, [_array[_i], ..._current]);
        combRecursive(_array, _k, _i + 1, [..._current]);
    }

    combRecursive(array, k, 0, []);
    return result;
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    // parse input
    const grid = input.split(/\n/).map(line => line.split(''));
    let expansions = { horizontal: [], vertical: [] };

    // note horizontal expansions
    for (let x = 0; x < grid[0].length; x++) {
        let hasGalaxy = false;
        for (let y = 0; y < grid.length; y++) {
            if (grid[y][x] == '#') hasGalaxy = true;
        }

        if (!hasGalaxy) expansions.horizontal.push(x);
    }

    // note vertical expansions
    for (let y = 0; y < grid.length; y++) {
        let hasGalaxy = false;
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == '#') hasGalaxy = true;
        }

        if (!hasGalaxy) expansions.vertical.push(y);
    }

    // get galaxies' expanded positions
    const expansion = 2;
    let galaxies = [];
    let current = { x: 0, y: 0 };
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == '#') galaxies.push({ x: current.x, y: current.y });

            if (expansions.horizontal.includes(x)) current.x += expansion;
            else current.x++;
        }

        current.x = 0;
        if (expansions.vertical.includes(y)) current.y += expansion;
        else current.y++;
    }

    // find all distances between all pairs
    return combination(new Array(galaxies.length).fill(0).map((_, index) => index), 2)
        .reduce((sum, [a, b]) => sum + Math.abs(galaxies[a].x - galaxies[b].x) + Math.abs(galaxies[a].y - galaxies[b].y), 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    // parse input
    const grid = input.split(/\n/).map(line => line.split(''));
    let expansions = { horizontal: [], vertical: [] };

    // note horizontal expansions
    for (let x = 0; x < grid[0].length; x++) {
        let hasGalaxy = false;
        for (let y = 0; y < grid.length; y++) {
            if (grid[y][x] == '#') hasGalaxy = true;
        }

        if (!hasGalaxy) expansions.horizontal.push(x);
    }

    // note vertical expansions
    for (let y = 0; y < grid.length; y++) {
        let hasGalaxy = false;
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == '#') hasGalaxy = true;
        }

        if (!hasGalaxy) expansions.vertical.push(y);
    }

    // get galaxies' expanded positions
    const expansion = 1000000;
    let galaxies = [];
    let current = { x: 0, y: 0 };
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == '#') galaxies.push({ x: current.x, y: current.y });

            if (expansions.horizontal.includes(x)) current.x += expansion;
            else current.x++;
        }

        current.x = 0;
        if (expansions.vertical.includes(y)) current.y += expansion;
        else current.y++;
    }

    // find all distances between all pairs
    return combination(new Array(galaxies.length).fill(0).map((_, index) => index), 2)
        .reduce((sum, [a, b]) => sum + Math.abs(galaxies[a].x - galaxies[b].x) + Math.abs(galaxies[a].y - galaxies[b].y), 0);
}

export { part1, part2 };