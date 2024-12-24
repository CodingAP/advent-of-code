/**
 * puzzles/2019/day15/solution.ts
 *
 * ~~ Oxygen System ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/21/2024
 */

import IntcodeComputer from '../intcode.ts';

const DIRECTIONS: { [key: string]: { x: number, y: number }} = {
    1: { x: 0, y: 1 },
    2: { x: 0, y: -1 },
    3: { x: -1, y: 0 },
    4: { x: 1, y: 0 },
};

const generateMaze = (program: number[]) => {
    const starting = { x: 0, y: 0, computer: new IntcodeComputer([...program]), steps: 0 };
    const queue = [starting];
    const visited = new Set<string>();

    const instructions = Object.keys(DIRECTIONS);
    const walls = new Set<string>();
    let oxygen = { x: 0, y: 0, steps: 0 };

    while (queue.length !== 0) {
        const current = queue.shift();
        if (current === undefined) break;

        for (const instruction of instructions) {
            const position = { x: current.x + DIRECTIONS[instruction].x, y: current.y + DIRECTIONS[instruction].y };
            if (visited.has(`${position.x},${position.y}`)) continue;

            const newComputer = current.computer.copy();

            newComputer.inputs.push(parseInt(instruction));
            const response = newComputer.runUntilOutput();
            if (response === undefined) continue;

            if (response === 0) {
                walls.add(`${position.x},${position.y}`);
            } else {
                queue.push({ ...position, computer: newComputer, steps: current.steps + 1 });
                visited.add(`${position.x},${position.y}`);
                if (response === 2) oxygen = { ...position, steps: current.steps + 1 };
            }
        }
    }

    return { walls, oxygen };
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const program = input.trim().split(',').map(num => parseInt(num));

    return generateMaze(program).oxygen.steps;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const program = input.trim().split(',').map(num => parseInt(num));

    const { walls, oxygen } = generateMaze(program);

    const queue = [{ x: oxygen.x, y: oxygen.y, steps: 0 }];
    const visited = new Set<string>();

    let max = -Infinity;
    while (queue.length !== 0) {
        const current = queue.shift();
        if (current === undefined) break;

        Object.values(DIRECTIONS).forEach(direction => {
            const position = { x: current.x + direction.x, y: current.y + direction.y };
            if (walls.has(`${position.x},${position.y}`) || visited.has(`${position.x},${position.y}`)) return;

            queue.push({ ...position, steps: current.steps + 1 });
            visited.add(`${position.x},${position.y}`);

            max = Math.max(max, current.steps + 1);
        });
    }

    return max;
};

export { part1, part2 };
