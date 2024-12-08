/**
 * puzzles/2018/day20/solution.ts
 *
 * ~~ A Regular Map ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/6/2024
 */

interface GridNode {
    N: boolean;
    E: boolean;
    S: boolean;
    W: boolean;
};

const DIRECTIONS: { [key: string]: { x: number, y: number } } = {
    N: { x: 0, y: -1 },
    E: { x: 1, y: 0 },
    S: { x: 0, y: 1 },
    W: { x: -1, y: 0 },
};

const OPPOSITE: { [key: string]: string } = {
    N: 'S',
    E: 'W',
    S: 'N',
    W: 'E'
}

const key = (position: { x: number, y: number }) => `${position.x},${position.y}`;

const parseRegex = (regex: string) => {
    let position = { x: 0, y: 0, steps: 0 };
    const stack: { x: number, y: number, steps: number }[] = [];
    const map: { [key: string]: GridNode } = {};
    map[key(position)] = { N: false, E: false, S: false, W: false };
    
    // keep track of previous positions in a stack
    for (let i = 0; i < regex.length; i++) {
        if (regex[i].match(/[NESW]/g)) {
            const newPosition = { x: position.x + DIRECTIONS[regex[i]].x, y: position.y + DIRECTIONS[regex[i]].y, steps: position.steps + 1 };
            if (map[key(newPosition)] === undefined) map[key(newPosition)] = { N: false, E: false, S: false, W: false };

            map[key(position)][regex[i] as keyof GridNode] = true;
            map[key(newPosition)][OPPOSITE[regex[i]] as keyof GridNode] = true;

            position = newPosition;
        } else if (regex[i] === '(') {
            // push
            stack.push({ ...position });
        } else if (regex[i] === ')') {
            // pop
            position = stack.pop() as { x: number, y: number, steps: number };
        } else if (regex[i] === '|') {
            // peek
            position = stack.at(-1) as { x: number, y: number, steps: number };
        }
    }

    return map;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const regex = input.trim().slice(1, -1);
    const map = parseRegex(regex);

    // do bfs to find the longest path
    const queue: { x: number, y: number, steps: number }[] = [{ x: 0, y: 0, steps: 0 }];
    const visited = new Set();
    visited.add(`0,0`);
    let maxSteps = -Infinity;

    while (queue.length !== 0) {
        const current = queue.shift();
        if (current === undefined) break;

        const node = map[`${current.x},${current.y}`];
        if (node !== undefined) {
            Object.entries(node).forEach(([direction, valid]) => {
                if (!valid) return;

                const position = { x: current.x + DIRECTIONS[direction].x, y: current.y + DIRECTIONS[direction].y };
                if (visited.has(`${position.x},${position.y}`)) return;

                queue.push({ ...position, steps: current.steps + 1 });
                visited.add(`${position.x},${position.y}`);

                maxSteps = Math.max(maxSteps, current.steps + 1);
            });
        }
    }

    return maxSteps;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const regex = input.trim().slice(1, -1);
    const map = parseRegex(regex);

    // do bfs to find all paths with length 1000
    const queue: { x: number, y: number, steps: number }[] = [{ x: 0, y: 0, steps: 0 }];
    const visited = new Set();
    visited.add(`0,0`);
    let roomCount = 0;

    while (queue.length !== 0) {
        const current = queue.shift();
        if (current === undefined) break;

        // if steps >1000, room is valid
        if (current.steps >= 1000) roomCount++;
            
        const node = map[`${current.x},${current.y}`];
        if (node !== undefined) {
            Object.entries(node).forEach(([direction, valid]) => {
                if (!valid) return;

                const position = { x: current.x + DIRECTIONS[direction].x, y: current.y + DIRECTIONS[direction].y };
                if (visited.has(`${position.x},${position.y}`)) return;

                queue.push({ ...position, steps: current.steps + 1 });
                visited.add(`${position.x},${position.y}`);
            });
        }
    }

    return roomCount;
};

export { part1, part2 };
