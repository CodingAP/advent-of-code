// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2023/day17/solution.ts
 * 
 * ~~ Clumsy Crucible ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/16/2023
 */

/**
 * represents a state of the path finding algorithm
 * 
 * @typedef {Object} PathState
 * @property {number} x x position of path
 * @property {number} y y position of path
 * @property {number} direction direction of the path
 * @property {run} run current length of the same direction
 */

/**
 * functions to manage a minheap, which will help with finishing dijkstra's algorithm faster
 */
const MinHeap = {
    siftDown(arr, i = 0, value = arr[i]) {
        if (i < arr.length) {
            let key = value[0];
            while (true) {
                let j = i * 2 + 1;
                if (j + 1 < arr.length && arr[j][0] > arr[j + 1][0]) j++;
                if (j >= arr.length || key <= arr[j][0]) break;
                arr[i] = arr[j];
                i = j;
            }
            arr[i] = value;
        }
    },
    pop(arr) {
        return this.exchange(arr, arr.pop());
    },
    exchange(arr, value) {
        if (!arr.length) return value;

        let oldValue = arr[0];
        this.siftDown(arr, 0, value);
        return oldValue;
    },
    push(arr, value) {
        let key = value[0], i = arr.length, j;

        while ((j = (i - 1) >> 1) >= 0 && key < arr[j][0]) {
            arr[i] = arr[j];
            i = j;
        }

        arr[i] = value;
        return arr;
    }
};

/**
 * helper constants to give name to numbers and move the beam
 */
const directions = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
    MOVEMENTS: [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }]
};

/**
 * turns a path state into a string for maps
 * 
 * @param {PathState} state state to convert 
 * @returns {string}
 */
const toKey = state => `${state.x},${state.y},${state.direction},${state.run}`;

/**
 * find the neighbors allowed by the minimum and maximum run length
 * 
 * adheres to rules stated in prose (no 180s, left/right turns happen after minimum, straight stops after maximum) 
 * 
 * @param {string[][]} grid grid to traverse
 * @param {PathState} state current state to find the neighbors
 * @param {number} minRun how many straight paths before allowed to turn
 * @param {number} maxRun how many straight paths allowed
 * @returns {{ x: number, y: number, direction: number, run: number, heatLoss: number }[]}
 */
const neighbors = (grid, state, minRun, maxRun) => {
    let neighbors = [];

    // check straight
    let straightX = state.x + directions.MOVEMENTS[state.direction].x;
    let straightY = state.y + directions.MOVEMENTS[state.direction].y;
    if (straightX >= 0 && straightX < grid[0].length && straightY >= 0 && straightY < grid.length && state.run < maxRun) {
        neighbors.push({ x: straightX, y: straightY, direction: state.direction, run: state.run + 1, heatLoss: grid[straightY][straightX] });
    }

    if (state.run >= minRun) {
        // check left
        let leftDirection = (state.direction + 3) % directions.MOVEMENTS.length;
        let leftX = state.x + directions.MOVEMENTS[leftDirection].x;
        let leftY = state.y + directions.MOVEMENTS[leftDirection].y;

        if (leftX >= 0 && leftX < grid[0].length && leftY >= 0 && leftY < grid.length) {
            neighbors.push({ x: leftX, y: leftY, direction: leftDirection, run: 1, heatLoss: grid[leftY][leftX] });
        }

        // check left
        let rightDirection = (state.direction + 1) % directions.MOVEMENTS.length;
        let rightX = state.x + directions.MOVEMENTS[rightDirection].x;
        let rightY = state.y + directions.MOVEMENTS[rightDirection].y;

        if (rightX >= 0 && rightX < grid[0].length && rightY >= 0 && rightY < grid.length) {
            neighbors.push({ x: rightX, y: rightY, direction: rightDirection, run: 1, heatLoss: grid[rightY][rightX] });
        }
    }

    return neighbors;
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    // parse input
    const grid = input.split(/\n/).map(line => line.split('').map(num => parseInt(num)));

    // start dijkstra's algorithm
    // i used a minheap to make the process of searching paths fast
    let start = { x: 0, y: 0, direction: directions.RIGHT, run: 0 };
    let queue = [], heatLosses = {};
    MinHeap.push(queue, [0, start])
    heatLosses[toKey(start)] = 0;

    // find shortest path
    while (queue.length != 0) {
        let [heatLoss, current] = MinHeap.pop(queue);

        // the first path to reach the end will be the shortest
        if (current.x == grid[0].length - 1 && current.y == grid.length - 1) return heatLoss;

        // find all neighbors that can be accessed
        for (let neighbor of neighbors(grid, current, 0, 3)) {
            let currentHeatLoss = heatLosses[toKey(neighbor)] || Infinity;
            if (heatLoss + neighbor.heatLoss < currentHeatLoss) {
                heatLosses[toKey(neighbor)] = heatLoss + neighbor.heatLoss;
                MinHeap.push(queue, [heatLoss + neighbor.heatLoss, neighbor])
            }
        }
    }
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    // parse input
    const grid = input.split(/\n/).map(line => line.split('').map(num => parseInt(num)));

    // start dijkstra's algorithm
    let start = { x: 0, y: 0, direction: directions.RIGHT, run: 0 };
    let queue = [], heatLosses = {};
    MinHeap.push(queue, [0, start])
    heatLosses[toKey(start)] = 0;

    // find shortest path
    while (queue.length != 0) {
        let [heatLoss, current] = MinHeap.pop(queue);

        // the first path to reach the end will be the shortest
        if (current.x == grid[0].length - 1 && current.y == grid.length - 1 && current.run >= 4) return heatLoss;

        // find all neighbors that can be accessed
        for (let neighbor of neighbors(grid, current, 4, 10)) {
            let currentHeatLoss = heatLosses[toKey(neighbor)] || Infinity;
            if (heatLoss + neighbor.heatLoss < currentHeatLoss) {
                heatLosses[toKey(neighbor)] = heatLoss + neighbor.heatLoss;
                MinHeap.push(queue, [heatLoss + neighbor.heatLoss, neighbor])
            }
        }
    }
}

export { part1, part2 };