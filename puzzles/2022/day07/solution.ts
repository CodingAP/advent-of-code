// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2022/day7/solution.ts
 * 
 * ~~ No Space Left On Device ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    let directories = { '/': { parent: '', files: [], directories: [] } };

    let currentDirectory = '';
    input.split('\n').forEach(line => {
        let tokens = line.split(' ');
        if (line.startsWith('$')) {
            if (tokens[1] == 'cd') {
                if (tokens[2] == '/') {
                    currentDirectory = '/';
                } else if (tokens[2] == '..') {
                    let paths = currentDirectory.split('/');
                    currentDirectory = paths.slice(0, paths.length - 1).join('/');
                } else {
                    currentDirectory = (currentDirectory == '/' ? currentDirectory : currentDirectory + '/') + tokens[2];
                }
            }
        } else {
            if (tokens[0] == 'dir') {
                let newDirectory = (currentDirectory == '/' ? currentDirectory : currentDirectory + '/') + tokens[1];
                directories[newDirectory] = {
                    parent: currentDirectory,
                    files: [],
                    directories: []
                }

                directories[currentDirectory].directories.push(newDirectory);
            } else {
                directories[currentDirectory].files.push({ file: tokens[1], size: parseInt(tokens[0]) });
            }
        }
    });

    let calculateSize = directory => {
        return directories[directory].files.reduce((acc, file) => acc + file.size, 0) +
               directories[directory].directories.reduce((acc, child) => acc + calculateSize(child), 0);
    }
    
    return Object.keys(directories).reduce((acc, key) => {
        let total = calculateSize(key);
        if (total <= 100000) acc += total;
        return acc;
    }, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let directories = { '/': { parent: '', files: [], directories: [] } };

    let currentDirectory = '';
    input.split('\n').forEach(line => {
        let tokens = line.split(' ');
        if (line.startsWith('$')) {
            if (tokens[1] == 'cd') {
                if (tokens[2] == '/') {
                    currentDirectory = '/';
                } else if (tokens[2] == '..') {
                    let paths = currentDirectory.split('/');
                    currentDirectory = paths.slice(0, paths.length - 1).join('/');
                } else {
                    currentDirectory = (currentDirectory == '/' ? currentDirectory : currentDirectory + '/') + tokens[2];
                }
            }
        } else {
            if (tokens[0] == 'dir') {
                let newDirectory = (currentDirectory == '/' ? currentDirectory : currentDirectory + '/') + tokens[1];
                directories[newDirectory] = {
                    parent: currentDirectory,
                    files: [],
                    directories: []
                }

                directories[currentDirectory].directories.push(newDirectory);
            } else {
                directories[currentDirectory].files.push({ file: tokens[1], size: parseInt(tokens[0]) });
            }
        }
    });

    let calculateSize = directory => {
        return directories[directory].files.reduce((acc, file) => acc + file.size, 0) +
               directories[directory].directories.reduce((acc, child) => acc + calculateSize(child), 0);
    }

    let unused = 30000000 - (70000000 - calculateSize('/'));
    let allSizes = Object.keys(directories).map(directory => {
        return calculateSize(directory);
    });

    return allSizes.reduce((lowest, size) => {
        if (size >= unused) return Math.min(lowest, size);
        return lowest;
    }, Infinity);
}

export { part1, part2 };