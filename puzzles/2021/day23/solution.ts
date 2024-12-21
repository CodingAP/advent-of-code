/**
 * puzzles/2021/day23/solution.ts
 *
 * ~~ Amphipod ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

const TYPES: { [key: string]: number } = { A: 1, B: 10, C: 100, D: 1000 };
const ROOMS_TO_HALLWAY: { [key: string]: number[] } = {
    A: [3, 2, 2, 4, 6, 8, 9],
    B: [5, 4, 2, 2, 4, 6, 7],
    C: [7, 6, 4, 2, 2, 4, 5],
    D: [9, 8, 6, 4, 2, 2, 3]
};

interface RoomState {
    hallway: string[];
    rooms: { [key: string]: string[] };
};

interface MinHeapNode {
    score: number;
    state: RoomState; 
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

const hash = (state: RoomState) => state.hallway.join('') + Object.values(state.rooms).map(room => room.join('')).join('');

// calculate all possible next states
const generateNextMove = (state: RoomState): MinHeapNode[] => {
    const next: MinHeapNode[] = [];

    // move amphipods into correct rooms
    for (let i = 0; i < state.hallway.length; i++) {
        if (state.hallway[i] !== '.') {
            // check for any blockers in hallway
            const type = state.hallway[i];
            const door = Object.keys(TYPES).indexOf(type) + 2;
            let blockers = state.hallway.slice(i + 1, door);
            if (i + 1 > door) blockers = state.hallway.slice(door, i);

            if (blockers.every(blocker => blocker === '.') && state.rooms[type].every(amphipod => amphipod === '.' || amphipod === type)) {
                const newState = structuredClone(state);
                newState.hallway[i] = '.';
                let steps = 0;
                for (let j = 0; j < newState.rooms[type].length; j++) {
                    if (newState.rooms[type][j] !== '.') {
                        newState.rooms[type][j - 1] = type;
                        steps = j - 1;
                        break;
                    } else if (j === newState.rooms[type].length - 1) {
                        newState.rooms[type][j] = type;
                        steps = j;
                        break;
                    } 
                }
                
                const newScore = (steps + ROOMS_TO_HALLWAY[type][i]) * TYPES[type];
                next.push({ score: newScore, state: newState });
            }
        }
    }

    // move amphipods out of incorrect rooms
    Object.keys(state.rooms).forEach((type, index) => {
        // skip rooms already filled out or empty
        if (state.rooms[type].every(amphipod => amphipod === type || amphipod === '.')) return;

        // try to move from top
        for (let i = 0; i < state.rooms[type].length; i++) {
            if (state.rooms[type][i] !== '.') {
                const moveType = state.rooms[type][i];

                // check left
                let checkX = index + 1;
                while (checkX >= 0 && state.hallway[checkX] === '.') {
                    const newState = structuredClone(state);
                    newState.hallway[checkX] = moveType;
                    newState.rooms[type][i] = '.';
                    
                    const newScore = (i + ROOMS_TO_HALLWAY[type][checkX]) * TYPES[moveType];
                    next.push({ score: newScore, state: newState });
                    checkX--;
                }

                // check right
                checkX = index + 2;
                while (checkX < state.hallway.length && state.hallway[checkX] === '.') {
                    const newState = structuredClone(state);
                    newState.hallway[checkX] = moveType;
                    newState.rooms[type][i] = '.';

                    const newScore = (i + ROOMS_TO_HALLWAY[type][checkX]) * TYPES[moveType];
                    next.push({ score: newScore, state: newState });
                    checkX++;
                }

                break;
            }
        }
    });

    return next;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const rows = input.trim().split('\n');
    
    // only valid spots to enter the hallway is the ones with the # in it
    const initialRoom: RoomState = {
        hallway: rows[1].slice(1, rows[1].length - 1).split('').filter((_, i) => rows[2][i + 1] === '#'),
        rooms: {}
    }

    // place objects in rooms
    Object.keys(TYPES).forEach((type, i) => {
        initialRoom.rooms[type] = [rows[2][i * 2 + 3], rows[3][i * 2 + 3]]; 
    });

    const queue = new MinHeap();
    const visited = new Set<string>();

    queue.insert({ score: 0, state: initialRoom });

    while (queue.size() !== 0) {
        const current = queue.extractMin();
        
        // check if state is finished
        let finished = true;
        Object.keys(current.state.rooms).forEach(type => {
            if (!current.state.rooms[type].every(amphipod => amphipod === type)) finished = false;
        });

        if (finished) return current.score;

        const stateHash = hash(current.state);
        if (visited.has(stateHash)) continue;
        visited.add(stateHash);

        // generate all possible next moves and add to queue
        const nextMoves = generateNextMove(current.state);
        for (const move of nextMoves) queue.insert({ score: current.score + move.score, state: move.state });
    }

    return -1;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const rows = input.trim().split('\n');
    const extra = [
        '  #D#C#B#A#',
        '  #D#B#A#C#'
    ];
    
    // only valid spots to enter the hallway is the ones with the # in it
    const initialRoom: RoomState = {
        hallway: rows[1].slice(1, rows[1].length - 1).split('').filter((_, i) => rows[2][i + 1] === '#'),
        rooms: {}
    }

    // place objects in rooms
    Object.keys(TYPES).forEach((type, i) => {
        initialRoom.rooms[type] = [rows[2][i * 2 + 3], extra[0][i * 2 + 3], extra[1][i * 2 + 3], rows[3][i * 2 + 3]]; 
    });

    const queue = new MinHeap();
    const visited = new Set<string>();

    queue.insert({ score: 0, state: initialRoom });

    while (queue.size() !== 0) {
        const current = queue.extractMin();
        
        // check if state is finished
        let finished = true;
        Object.keys(current.state.rooms).forEach(type => {
            if (!current.state.rooms[type].every(amphipod => amphipod === type)) finished = false;
        });

        if (finished) return current.score;

        const stateHash = hash(current.state);
        if (visited.has(stateHash)) continue;
        visited.add(stateHash);

        // generate all possible next moves and add to queue
        const nextMoves = generateNextMove(current.state);
        for (const move of nextMoves) queue.insert({ score: current.score + move.score, state: move.state });
    }

    return -1;
};

export { part1, part2 };
