/**
 * puzzles/2018/day22/solution.ts
 *
 * ~~ Mode Maze ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/7/2024
 */

interface MinHeapNode {
    score: number;
    data: { [key: string]: number };
}

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

/**
 * finds erosion level, recursively calling if not there
 */
const findErosionLevel = (grid: { [key: string]: number }, depth: number, x: number, y: number): number => {
    if (grid[`${x},${y}`] !== undefined) return grid[`${x},${y}`];

    if (y === 0) grid[`${x},${y}`] = x * 16807;
    else if (x === 0) grid[`${x},${y}`] = y * 48271;
    else grid[`${x},${y}`] = findErosionLevel(grid, depth, x - 1, y) * findErosionLevel(grid, depth, x, y - 1);

    grid[`${x},${y}`] = (grid[`${x},${y}`] + depth) % 20183;

    return grid[`${x},${y}`];
}

// defined constants that match what tool/surface doesn't work
const ROCKY = 0, WET = 1, NARROW = 2;
const NEITHER = 0, TORCH = 1, CLIMBING = 2;

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const lines = input.trim().split('\n');
    const depth = parseInt(lines[0].split(': ')[1]);
    const [targetX, targetY] = lines[1].split(': ')[1].split(',').map(num => parseInt(num));

    // finds all the erosion levels needed to get the target's level
    // hard code 0, 0 and targetX, targetY
    const grid: { [key: string]: number } = { '0,0': 0 };
    findErosionLevel(grid, depth, targetX, targetY);
    grid[`${targetX},${targetY}`] = 0;

    // sum up all values after grid is created
    let sum = 0;
    for (let y = 0; y <= targetY; y++) {
        for (let x = 0; x <= targetX; x++) {
            sum += grid[`${x},${y}`] % 3;
        }
    }

    return sum;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const lines = input.trim().split('\n');
    const depth = parseInt(lines[0].split(': ')[1]);
    const [targetX, targetY] = lines[1].split(': ')[1].split(',').map(num => parseInt(num));

    // finds all the erosion levels needed to get the target's level
    // hard code 0, 0 and targetX, targetY
    const grid: { [key: string]: number } = { '0,0': 0 };
    findErosionLevel(grid, depth, targetX, targetY);
    grid[`${targetX},${targetY}`] = 0;

    const queue = new MinHeap();
    const visited: { [key: string]: number } = {};
    queue.insert({ score: 0, data: { x: 0, y: 0, tool: TORCH }});

    while (queue.size() != 0) {
        const current = queue.extractMin();

        // check to see if the current distance is the smallest one
        const key = `${current.data.x},${current.data.y},${current.data.tool}`;
        if (visited[key] !== undefined && visited[key] <= current.score) continue;
        visited[key] = current.score;

        // if at target, return minutes it took to get there
        if (current.data.x === targetX && current.data.y === targetY && current.data.tool === TORCH) return current.score;
        
        // switch tools if necessary
        for (let i = 0; i < 3; i++) {
            const risk = findErosionLevel(grid, depth, current.data.x, current.data.y) % 3;
            if (i === current.data.tool || i === risk) continue;
            queue.insert({ score: current.score + 7, data: { x: current.data.x, y: current.data.y, tool: i } });
        }

        // try to move in any directions
        [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }].forEach(direction => {
            const position = { x: current.data.x + direction.x, y: current.data.y + direction.y };
            if (position.x < 0 || position.y < 0) return;

            const risk = findErosionLevel(grid, depth, position.x, position.y) % 3;
            if (risk !== current.data.tool) queue.insert({ score: current.score + 1, data: { x: position.x, y: position.y, tool: current.data.tool } });
        });
    }
};

export { part1, part2 };
