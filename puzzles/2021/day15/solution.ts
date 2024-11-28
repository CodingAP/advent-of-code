// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2021/day15/solution.ts
 *
 * ~~ Chiton ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

const create2DArray = (width, height, fill) => {
    let array = new Array(height).fill('').map(_ => new Array(width));

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (typeof fill === 'function') array[y][x] = fill(x, y);
            else array[y][x] = fill;
        }
    }

    return array;
};

/**
 * min heap implementation
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }

    /**
     * inserts an element and heapifies it until it is in the correct location
     * 
     * @param {{ score: number, data: { [key: string]: any } }} element element to insert with the score 
     */
    insert(element) {
        this.heap.push(element);
        let index = this.heap.length - 1;

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].score >= this.heap[parentIndex].score) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    /**
     * gets the smallest element, which is at the beginning, then heapifies
     * 
     * @returns {{ score: number, data: { [key: string]: any } }} the smallest scored element
     */
    extractMin() {
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        let index = 0;

        while (true) {
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            let smallest = index;

            if (leftChild < this.heap.length && this.heap[leftChild].score < this.heap[smallest].score) smallest = leftChild;
            if (rightChild < this.heap.length && this.heap[rightChild].score < this.heap[smallest].score) smallest = rightChild;
            if (smallest === index) break;
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }

        return min;
    }

    /**
     * return the size of the heap
     * 
     * @returns {number} the size of the heap
     */
    size() {
        return this.heap.length;
    }
}

/**
 * finds the best path from the starting point to the ending point
 * 
 * @param {number[][]} grid maze grid with the levels 
 * @param {{ x: number, y: number }} start starting point and level
 * @param {{ x: number, y: number }} end ending point and level
 * @returns {number} how many units it takes to travel
 */
const solveMazeWeighted = (grid, start, end) => {
    const minHeap = new MinHeap();
    minHeap.insert({ score: 0, data: { ...start } });

    const visited = new Set();
    const directions = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 }
    ];

    while (minHeap.size() > 0) {
        const current = minHeap.extractMin();
        const { x, y } = current.data;

        // if already visited, don't try again
        if (visited.has(`${x},${y}`)) continue;
        visited.add(`${x},${y}`);

        if (x === end.x && y === end.y) return current.score;
        
        // try all possible directions and update the state accordingly
        for (const dir of directions) {
            const nx = x + dir.x, ny = y + dir.y;
            if (nx < 0 || ny < 0 || ny >= grid.length || nx >= grid[0].length) continue;

            if (!visited.has(`${nx},${ny}`)) {
                minHeap.insert({ score: current.score + grid[ny][nx], data: { x: nx, y: ny } });
            }
        }
    }

    return -1;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let rows = input.trim().split('\n');
    let grid = create2DArray(rows[0].length, rows.length, (x, y) => {
        return parseInt(rows[y][x]);
    });

    return solveMazeWeighted(grid, { x: 0, y: 0 }, { x: grid[0].length - 1, y: grid[1].length - 1 });
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let rows = input.trim().split('\n');
    let grid = create2DArray(rows[0].length * 5, rows.length * 5, (x, y) => {
        let quadrantX = Math.floor(x / rows[0].length);
        let quadrantY = Math.floor(y / rows.length);

        let value = parseInt(rows[y - (quadrantY * rows.length)][x - (quadrantX * rows[0].length)]) + (quadrantX + quadrantY);
        if (value > 9) value -= 9;
        return value;
    });

    return solveMazeWeighted(grid, { x: 0, y: 0 }, { x: grid[0].length - 1, y: grid[1].length - 1 });
};

export { part1, part2 };
