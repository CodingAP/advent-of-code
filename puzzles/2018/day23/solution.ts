/**
 * puzzles/2018/day23/solution.ts
 *
 * ~~ Experimental Emergency Teleportation ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/7/2024
 */

const manhattan = (a: { x: number, y: number, z: number }, b: { x: number, y: number, z: number }) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);

interface MinHeapNode {
    score: number;
    data: { [key: string]: any };
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

interface Point {
    x: number;
    y: number;
    z: number;
}

// count how many bots intersect a given box
const intersectCount = (bots: { position: Point, radius: number }[], start: Point, end: Point): number => {
    return bots.reduce((count, bot) => {
        let d = 0;

        Object.keys(start).forEach(axis => {
            const key = axis as keyof Point;
            const low = start[key];
            const high = end[key] - 1;

            d += Math.abs(bot.position[key] - low) + Math.abs(bot.position[key] - high);
            d -= high - low;
        });

        d = Math.floor(d / 2);
        return count + (d <= bot.radius ? 1 : 0);
    }, 0);
};

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // parse nanobots
    const bots = input.trim().split('\n').reduce<{ position: Point, radius: number }[]>((array, line) => {
        const [pos, r] = line.split(', ');
        const [x, y, z] = pos.replace(/[<>]/g, '').split('=')[1].split(',').map(num => parseInt(num));
        array.push({ position: { x, y, z}, radius: parseInt(r.split('=')[1]) });
        return array;
    }, []);

    // sort to find the largest radius
    bots.sort((a, b) => b.radius - a.radius);

    // count how many are in radius, including initial nanobot
    let inRadius = 0;
    for (let i = 0; i < bots.length; i++) {
        if (manhattan(bots[0].position, bots[i].position) <= bots[0].radius) inRadius++;
    }
    return inRadius;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // parse nanobots
    const bots = input.trim().split('\n').reduce<{ position: Point, radius: number }[]>((array, line) => {
        const [pos, r] = line.split(', ');
        const [x, y, z] = pos.replace(/[<>]/g, '').split('=')[1].split(',').map(num => parseInt(num));
        array.push({ position: { x, y, z}, radius: parseInt(r.split('=')[1]) });
        return array;
    }, []);

    // start with the biggest possible box
    const maxBoxSize = Math.pow(2, Math.ceil(Math.log2(Math.max(...bots.map(bot => Math.max(...Object.values(bot.position)) + bot.radius)))));
    const initialBox = { start: { x: -maxBoxSize, y: -maxBoxSize, z: -maxBoxSize }, end: { x: maxBoxSize, y: maxBoxSize, z: maxBoxSize } };

    // keep subdividing the box into octants to find the largest range
    const queue = new MinHeap();
    queue.insert({ score: -bots.length, data: { size: -maxBoxSize * 2, distance: 3 * maxBoxSize, boundingBox: initialBox } });

    while (queue.size() != 0) {
        const current = queue.extractMin();

        // find the closest 1x1x1 square
        if (current.data.size === -1) return current.data.distance;

        // we use negative numbers to use a minheap as a maxheap
        const size = Math.floor(current.data.size / -2);
        [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 1 }, { x: 0, y: 1, z: 0 }, { x: 0, y: 1, z: 1 }, { x: 1, y: 0, z: 0 }, { x: 1, y: 0, z: 1 }, { x: 1, y: 1, z: 0 }, { x: 1, y: 1, z: 1 }].forEach(octant => {
            const start = { x: (current.data.boundingBox.start.x + size * octant.x), y: (current.data.boundingBox.start.y + size * octant.y), z: (current.data.boundingBox.start.z + size * octant.z) };
            const end = { x: start.x + size, y: start.y + size, z: start.z + size };
            const intersectionCount = intersectCount(bots, start, end);

            queue.insert({ score: -intersectionCount, data: { size: -size, distance: manhattan({ x: 0, y: 0, z: 0 }, start), boundingBox: { start, end } }});
        });
    }

    return 0;
};

export { part1, part2 };
