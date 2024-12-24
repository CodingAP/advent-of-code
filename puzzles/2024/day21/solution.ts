/**
 * puzzles/2024/day21/solution.ts
 *
 * ~~ Keypad Conundrum ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/20/2024
 */

// directions given to bfs to traverse keypads
const BFS_DIRECTIONS = {
    '^': { x: 0, y: -1 },
    '>': { x: 1, y: 0 },
    'v': { x: 0, y: 1 },
    '<': { x: -1, y: 0 }
};

// normal keypad button positions
const KEYPAD: { [key: string]: { x: number, y: number } } = {
    7: { x: 0, y: 0 },
    8: { x: 1, y: 0 },
    9: { x: 2, y: 0 },
    4: { x: 0, y: 1 },
    5: { x: 1, y: 1 },
    6: { x: 2, y: 1 },
    1: { x: 0, y: 2 },
    2: { x: 1, y: 2 },
    3: { x: 2, y: 2 },
    X: { x: 0, y: 3 },
    0: { x: 1, y: 3 },
    A: { x: 2, y: 3 }
};

// direction keypad button positions
const DIRECTIONS: { [key: string]: { x: number, y: number } } = {
    X:   { x: 0, y: 0 },
    '^': { x: 1, y: 0 },
    A:   { x: 2, y: 0 },
    '<': { x: 0, y: 1 },
    'v': { x: 1, y: 1 },
    '>': { x: 2, y: 1 },
};

// generate all paths from one button to another
const getCommand = (input: { [key: string]: { x: number, y: number } }, start: string, end: string) => {
    const queue = [{ ...input[start], path: '' }];
    const distances: { [key: string]: number } = {};

    if (start === end) return ['A'];

    const allPaths: string[] = [];
    while (queue.length) {
        const current = queue.shift();
        if (current === undefined) break;

        // find all paths
        if (current.x === input[end].x && current.y === input[end].y) allPaths.push(current.path + 'A');
        if (distances[`${current.x},${current.y}`] !== undefined && distances[`${current.x},${current.y}`] < current.path.length) continue;

        Object.entries(BFS_DIRECTIONS).forEach(([direction, vector]) => {
            const position = { x: current.x + vector.x, y: current.y + vector.y };

            // don't allow traversal into the blank areas
            if (input.X.x === position.x && input.X.y === position.y) return;

            // only traverse if there is a button to hit
            const button = Object.values(input).find(button => button.x === position.x && button.y === position.y);
            if (button !== undefined) {
                const newPath = current.path + direction;
                if (distances[`${position.x},${position.y}`] === undefined || distances[`${position.x},${position.y}`] >= newPath.length) {
                    queue.push({ ...position, path: newPath });
                    distances[`${position.x},${position.y}`] = newPath.length;
                }
            }
        });
    }

    // sort from smallest to largest paths
    return allPaths.sort((a, b) => a.length - b.length);
}

// find the smallest amount of button presses, given the robot and code to enter
const getKeyPresses = (input: { [key: string]: { x: number, y: number } }, code: string, robot: number, memo: { [key: string]: number }): number => {
    const key = `${code},${robot}`;
    if (memo[key] !== undefined) return memo[key];

    let current = 'A';
    let length = 0;
    for (let i = 0; i < code.length; i++) {
        // find the smallest move for each transition
        const moves = getCommand(input, current, code[i]);
        if (robot === 0) length += moves[0].length;
        else length += Math.min(...moves.map(move => getKeyPresses(DIRECTIONS, move, robot - 1, memo)));
        current = code[i];
    }

    memo[key] = length;
    return length;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const keycodes = input.trim().split('\n');
    const memo: { [key: string]: number } = {};

    return keycodes.reduce((sum, code) => {
        const numerical = parseInt((code.split('').filter(character => character.match(/\d/)).join('')));
        return sum + numerical * getKeyPresses(KEYPAD, code, 2, memo);
    }, 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const keycodes = input.trim().split('\n');
    const memo: { [key: string]: number } = {};

    return keycodes.reduce((sum, code) => {
        const numerical = parseInt((code.split('').filter(character => character.match(/\d/)).join('')));
        return sum + numerical * getKeyPresses(KEYPAD, code, 25, memo);
    }, 0);
};

export { part1, part2 };
