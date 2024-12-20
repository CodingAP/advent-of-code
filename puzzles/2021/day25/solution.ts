/**
 * puzzles/2021/day25/solution.ts
 *
 * ~~ Sea Cucumber ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const grid = input.trim().split('\n');
    const width = grid[0].length, height = grid.length;
    const right: { x: number, y: number}[] = [];
    const down: { x: number, y: number}[] = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '>') right.push({ x, y });
            if (grid[y][x] === 'v') down.push({ x, y });
        }
    }

    let finished = false;
    let step = 0;
    while (!finished) {
        finished = true;

        let moved: number[] = [];
        for (let i = 0; i < right.length; i++) {
            const newX = (right[i].x + 1) % width;
            if (right.find(cucumber => cucumber.x === newX && cucumber.y === right[i].y) === undefined &&
                down.find(cucumber => cucumber.x === newX && cucumber.y === right[i].y) === undefined) {
                moved.push(i);
            }
        }

        if (moved.length !== 0) finished = false;
        moved.forEach(i => right[i].x = (right[i].x + 1) % width);

        moved = [];
        for (let i = 0; i < down.length; i++) {
            const newY = (down[i].y + 1) % height;
            if (right.find(cucumber => cucumber.x === down[i].x && cucumber.y === newY) === undefined &&
                down.find(cucumber => cucumber.x === down[i].x && cucumber.y === newY) === undefined) {
                moved.push(i);
            }
        }

        if (moved.length !== 0) finished = false;
        moved.forEach(i => down[i].y = (down[i].y + 1) % height);

        step++;
    }

    return step;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    return '2021 DONE!';
};

export { part1, part2 };
