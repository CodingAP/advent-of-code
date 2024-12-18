/**
 * puzzles/2024/day18/solution.ts
 *
 * ~~ RAM Run ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/17/2024
 */

const WIDTH = 70, HEIGHT = 70;
type Point = { x: number, y: number };

// run a bfs with the given set of walls to find the shortest path
const bfs = (walls: Set<string>, start: Point, end: Point) => {
    const queue: { x: number, y: number, steps: number }[] = [];
    const visited = new Set<string>();

    queue.push({ ...start, steps: 0 });
    visited.add(`${start.x},${start.y}`);

    while (queue.length !== 0) {
        const current = queue.shift();
        if (current === undefined) break;

        // returns amount of steps when reached the end
        if (current.x === end.x && current.y === end.y) return current.steps;

        [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }].forEach(direction => {
            const position = { x: current.x + direction.x, y: current.y + direction.y };
            if (position.x < 0 || position.x > WIDTH || position.y < 0 || position.y > HEIGHT || walls.has(`${position.x},${position.y}`) || visited.has(`${position.x},${position.y}`)) return;

            queue.push({ ...position, steps: current.steps + 1 });
            visited.add(`${position.x},${position.y}`);
        });
    }

    // returns -1 when the end cannot be reached
    return -1;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // only use the first 1024 walls
    const walls = new Set(input.split('\n').slice(0, 1024));

    return bfs(walls, { x: 0, y: 0 }, { x: WIDTH, y: HEIGHT });
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const walls = input.split('\n');
    const currentWalls = new Set<string>();

    // keep running until the end cannot be reached
    for (let i = 0; i < walls.length; i++) {
        currentWalls.add(walls[i]);
        if (bfs(currentWalls, { x: 0, y: 0 }, { x: WIDTH, y: HEIGHT }) === -1) return walls[i];
    }
};

export { part1, part2 };
