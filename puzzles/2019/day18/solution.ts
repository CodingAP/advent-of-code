/**
 * puzzles/2019/day18/solution.ts
 *
 * ~~ Many-Worlds Interpretation ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/24/2024
 */

interface Part1Node {
    score: number;
    data: { node: string, collected: string[] };
}

interface Part2Node {
    score: number;
    data: { positions: string[], collected: string[] };
}

type MinHeapNode = Part1Node | Part2Node;

/**
 * min heap implementation
 */
class MinHeap {
    heap: MinHeapNode[];
    constructor() {
        this.heap = [];
    }

    /**
     * inserts an element and heapifies it until it is in the correct location
     */
    insert(element: MinHeapNode) {
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
     */
    extractMin() {
        if (this.heap.length === 1) return this.heap.pop() as MinHeapNode;
        const min = this.heap[0];
        this.heap[0] = this.heap.pop() as MinHeapNode;
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
     */
    size() {
        return this.heap.length;
    }
}

const DIRECTIONS = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];

const getAccessibleKeys = (grid: string[][], starting: { x: number, y: number }, collected: string[]) => {
    const width = grid[0].length, height = grid.length;

    const queue = [{ ...starting, steps: 0 }];
    const visited = new Set<string>();

    const keys: { [key: string]: { x: number, y: number, steps: number } } = {};

    while (queue.length !== 0) {
        const current = queue.shift();
        if (current === undefined) break;

        if (visited.has(`${current.x},${current.y}`)) continue;
        visited.add(`${current.x},${current.y}`);
        if (grid[current.y][current.x].match(/[a-z]/g) && !collected.includes(grid[current.y][current.x])) keys[grid[current.y][current.x]] = current;

        DIRECTIONS.forEach(direction => {
            const position = { x: current.x + direction.x, y: current.y + direction.y };
            if (position.x < 0 || position.x >= width || position.y < 0 || position.y > height || grid[position.y][position.x] === '#') return;
            if (grid[position.y][position.x] !== '.' && grid[position.y][position.x].match(/[A-Z]/g) && !collected.includes(grid[position.y][position.x].toLowerCase())) return;

            queue.push({ ...position, steps: current.steps + 1 });
        });
    }

    return keys;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const grid = input.trim().split('\n').map(line => line.split(''));
    const width = grid[0].length, height = grid.length;

    const points: { [key: string]: { x: number, y: number }} = {}; 
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '@') {
                points['0'] = { x, y };
                grid[y][x] = '.';
            } else if (grid[y][x].match(/[a-z]/g)) points[grid[y][x]] = { x, y };
        }   
    }

    const queue = new MinHeap();
    queue.insert({ score: 0, data: { node: '0', collected: [] }});

    const distances: { [key: string]: number } = {};
    
    while (queue.size() !== 0) {
        const current = queue.extractMin() as Part1Node;
        const keys = getAccessibleKeys(grid, points[current.data.node], current.data.collected);

        if (Object.keys(keys).length === 0) return current.score;

        Object.entries(keys).forEach(([key, position]) => {
            const newScore = current.score + position.steps;
            const newCollected = [...current.data.collected, key];

            const hash = key + newCollected.sort().join('');
            if (distances[hash] === undefined || distances[hash] > newScore) {
                queue.insert({ score: newScore, data: { node: key, collected: newCollected } });
                distances[hash] = newScore;
            }
        });
    }

    return -1;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const grid = input.trim().split('\n').map(line => line.split(''));
    const width = grid[0].length, height = grid.length;

    const points: { [key: string]: { x: number, y: number } } = {};
    let originalStart: { x: number, y: number } = { x: 0, y: 0 };
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '@') {
                originalStart = { x, y };
                grid[y][x] = '.';
            } else if (grid[y][x].match(/[a-z]/g)) points[grid[y][x]] = { x, y };
        }   
    }

    const starting: string[] = [];
    for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
            if (i === 0 && j === 0) continue;
            if (i === 0 || j === 0) grid[originalStart.y + j][originalStart.x + i] = '#';
            else {
                const id = starting.length.toString();
                points[id] = { x: originalStart.x + i, y: originalStart.y + j };
                starting.push(id);
            }
        }   
    }

    const queue = new MinHeap();
    queue.insert({ score: 0, data: { positions: starting, collected: [] }});

    const distances: { [key: string]: number } = {};
    
    while (queue.size() !== 0) {
        const current = queue.extractMin() as Part2Node;

        let allFinished = true;
        for (let i = 0; i < current.data.positions.length; i++) {
            const keys = getAccessibleKeys(grid, points[current.data.positions[i]], current.data.collected);

            if (Object.keys(keys).length !== 0) allFinished = false;

            Object.entries(keys).forEach(([key, position]) => {
                const newScore = current.score + position.steps;
                const newCollected = [...current.data.collected, key];

                const positions = [...current.data.positions];
                positions[i] = key;

                const hash = positions.join('') + newCollected.sort().join('');
                if (distances[hash] === undefined || distances[hash] > newScore) {
                    queue.insert({ score: newScore, data: { positions, collected: newCollected } });
                    distances[hash] = newScore;
                }
            });
        }

        if (allFinished) return current.score;
    }

    return -1;
};

export { part1, part2 };
