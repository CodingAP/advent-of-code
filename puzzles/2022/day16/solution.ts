// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2022/day16/solution.ts
 * 
 * ~~ Proboscidea Volcanium ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
 */

const bfs = (grid, starting, ending) => {
    let queue = [];
    let visited = [starting];

    if (starting == ending) return [starting];
    queue.push([starting]);

    while (queue.length > 0) {
        let path = queue.shift();
        let node = path[path.length - 1];

        for (let neighbor of grid[node]) {
            if (visited.includes(neighbor)) continue;

            if (neighbor == ending) return path.concat([neighbor]);
            visited.push(neighbor);
            queue.push(path.concat([neighbor]));
        }
    }

    return [];
}

const findRates = (distances, valve, minutes, left, opened = {}) => {
    let allRates = [opened];

    left.forEach((other, index) => {
        let newMinutes = minutes - distances[valve][other] - 1;
        if (newMinutes < 1) return;

        let newOpened = JSON.parse(JSON.stringify(opened));
        newOpened[other] = newMinutes;

        let newLeft = [...left];
        newLeft.splice(index, 1);

        allRates.push(...findRates(distances, other, newMinutes, newLeft, newOpened));
    });

    return allRates;
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    let graph = {}, rates = {};
    
    input.split('\n').forEach(line => {
        let tokens = line.replace(/,/g, '').split(' ');

        graph[tokens[1]] = tokens.slice(9);
        rates[tokens[1]] = parseInt(tokens[4].replace(';', '').split('=')[1]);
    });

    let distances = {};
    Object.keys(graph).forEach(start => {
        Object.keys(graph).forEach(end => {
            if (distances[start] == null) distances[start] = {};
            distances[start][end] = bfs(graph, start, end).length - 1;
        });
    });

    let nonzeroValves = Object.keys(graph).filter(valve => rates[valve] != 0);
    return findRates(distances, 'AA', 30, nonzeroValves).map(path => Object.entries(path).reduce((acc, [key, value]) => acc + rates[key] * value, 0)).sort((a, b) => b - a)[0];
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let graph = {}, rates = {};

    input.split('\n').forEach(line => {
        let tokens = line.replace(/,/g, '').split(' ');

        graph[tokens[1]] = tokens.slice(9);
        rates[tokens[1]] = parseInt(tokens[4].replace(';', '').split('=')[1]);
    });

    let distances = {};
    Object.keys(graph).forEach(start => {
        Object.keys(graph).forEach(end => {
            if (distances[start] == null) distances[start] = {};
            distances[start][end] = bfs(graph, start, end).length - 1;
        });
    });

    let nonzeroValves = Object.keys(graph).filter(valve => rates[valve] != 0);
    let allRates = findRates(distances, 'AA', 26, nonzeroValves);

    let maxScores = {};
    allRates.forEach(rate => {
        let key = Object.keys(rate).sort().join(',');
        let score = Object.entries(rate).reduce((acc, [key, value]) => acc + rates[key] * value, 0);

        if (maxScores[key] == null) maxScores[key] = -Infinity;
        maxScores[key] = Math.max(score, maxScores[key]);
    });

    let highest = -Infinity;
    Object.keys(maxScores).forEach(player => {
        Object.keys(maxScores).forEach(elephant => {
            let allValves = new Set();
            let playerList = player.split(',');
            playerList.forEach(valve => allValves.add(valve));
            let elephantList = elephant.split(',');
            elephantList.forEach(valve => allValves.add(valve));

            if (allValves.size == (playerList.length + elephantList.length)) highest = Math.max(maxScores[player] + maxScores[elephant], highest);
        });
    });

    return highest;
}

export { part1, part2 };