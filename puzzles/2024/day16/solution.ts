/**
 * puzzles/2024/day16/solution.ts
 *
 * ~~ Reindeer Maze ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/15/2024
 */

type Point = { x: number, y: number };

const DIRECTIONS: Point[] = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];

interface MinHeapNode {
    score: number;
    node: string;
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

const dijkstra = (graph: { [key: string]: { [key: string]: number } }, start: Point, directionless: boolean): { [key: string]: number } => {
    const queue = new MinHeap();
    const distances: { [key: string]: number } = {};

    let startingKey = `${start.x},${start.y},0`;
    if (directionless) startingKey = `${start.x},${start.y}`;

    queue.insert({ score: 0, node: startingKey });
    distances[startingKey] = 0;

    while (queue.size() != 0) {
        const current = queue.extractMin();

        if (distances[current.node] < current.score) continue;

        if (graph[current.node] === undefined) continue;

        Object.entries(graph[current.node]).forEach(([next, weight]) => {
            const newScore = current.score + weight;
            if (distances[next] === undefined || distances[next] > newScore) {
                distances[next] = newScore;
                queue.insert({ score: newScore, node: next });
            }
        });
    }

    return distances;
}

const parseGrid = (grid: string[]) => {
    const width = grid[0].length, height = grid.length;

    // construct a graph to make dijkstra search easier
    let start = { x: 0, y: 0 };
    let end = { x: 0, y: 0 };
    const forward: { [key: string]: { [key: string]: number } } = {};
    const reverse: { [key: string]: { [key: string]: number } } = {};
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === 'S') start = { x, y };
            if (grid[y][x] === 'E') end = { x, y };

            if (grid[y][x] !== '#') {
                DIRECTIONS.forEach((direction, i) => {
                    const position = { x: x + direction.x, y: y + direction.y };

                    const key = `${x},${y},${i}`;
                    const moveKey = `${position.x},${position.y},${i}`;

                    if (position.x >= 0 && position.x < width && position.y >= 0 && position.y < height && grid[position.y][position.x] !== '#') {
                        if (forward[key] === undefined) forward[key] = {};
                        if (reverse[moveKey] === undefined) reverse[moveKey] = {};

                        forward[key][moveKey] = 1;
                        reverse[moveKey][key] = 1;
                    }

                    for (const rotateKey of [`${x},${y},${(i + 3) % 4}`, `${x},${y},${(i + 1) % 4}`]) {
                        if (forward[key] === undefined) forward[key] = {};
                        if (reverse[rotateKey] === undefined) reverse[rotateKey] = {};

                        forward[key][rotateKey] = 1000;
                        reverse[rotateKey][key] = 1000;
                    }
                });
            }
        }
    }

    DIRECTIONS.forEach((_, i) => {
        const key = `${end.x},${end.y}`;
        const rotateKey = `${end.x},${end.y},${i}`;

        if (forward[rotateKey] === undefined) forward[rotateKey] = {};
        if (reverse[key] === undefined) reverse[key] = {};

        forward[rotateKey][key] = 0;
        reverse[key][rotateKey] = 0;
    });

    return { start, end, forward, reverse };
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const grid = input.split('\n');
    const { start, end, forward } = parseGrid(grid);
    
    const distances = dijkstra(forward, start, false);
    return distances[`${end.x},${end.y}`];
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const grid = input.split('\n');
    const { start, end, forward, reverse } = parseGrid(grid);

    const fromStart = dijkstra(forward, start, false);
    const toEnd = dijkstra(reverse, end, true);

    const endKey = `${end.x},${end.y}`;
    const target = fromStart[endKey];
    const spaces = new Set<string>();
    
    Object.keys(fromStart).forEach(position => {
        if (position !== endKey && fromStart[position] + toEnd[position] === target) {
            const [x, y] = position.split(',');
            spaces.add(`${x},${y}`);
        }
    });

    return spaces.size;
};

export { part1, part2 };
