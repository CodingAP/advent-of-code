/**
 * puzzles/2024/day14/solution.ts
 *
 * ~~ Restroom Redoubt ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/13/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // parse the robots
    const robots = input.trim().split('\n').map(line => {
        const [position, velocity] = line.split(' ');
        const [px, py] = position.split('=')[1].split(',').map(num => parseInt(num));
        const [vx, vy] = velocity.split('=')[1].split(',').map(num => parseInt(num));
        return { position: { x: px, y: py }, velocity: { x: vx, y: vy } };
    });

    const width = 101, height = 103;

    // simulate 100 seconds and see which quadrant robot ends up in
    const quadrants: number[] = [0, 0, 0, 0];
    for (let i = 0; i < robots.length; i++) {
        robots[i].position.x = (robots[i].position.x + robots[i].velocity.x * 100 + width * 100) % width;
        robots[i].position.y = (robots[i].position.y + robots[i].velocity.y * 100 + height * 100) % height;

        // if in either axis, don't count
        if (robots[i].position.x === Math.floor(width / 2) || robots[i].position.y === Math.floor(height / 2)) continue;

        // find the quadrant: 0 is top left, 1 is top right, 2 is bottom left, 3 is bottom right
        const quadrant = Math.floor(robots[i].position.x / Math.ceil(width / 2)) + Math.floor(robots[i].position.y / Math.ceil(height / 2)) * 2;
        quadrants[quadrant]++;
    }

    return quadrants.reduce((mul, num) => mul * num, 1);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // parse the robots
    const robots = input.trim().split('\n').map(line => {
        const [position, velocity] = line.split(' ');
        const [px, py] = position.split('=')[1].split(',').map(num => parseInt(num));
        const [vx, vy] = velocity.split('=')[1].split(',').map(num => parseInt(num));
        return { position: { x: px, y: py }, velocity: { x: vx, y: vy } };
    });

    const width = 101, height = 103;

    let step = 0;
    while (true) {
        step++;

        // simulate the robots
        for (let i = 0; i < robots.length; i++) {
            robots[i].position.x = (robots[i].position.x + robots[i].velocity.x + width) % width;
            robots[i].position.y = (robots[i].position.y + robots[i].velocity.y + height) % height;
        }

        // find all unique positions
        const positions = new Set(robots.map(robot => `${robot.position.x},${robot.position.y}`));

        // check if there is a solid 5x5 area
        // this should only happen if the christmas tree is there
        // that is a guess though
        for (const position of positions) {
            const [x, y] = position.split(',').map(num => parseInt(num));
            let hasGroup = true;

            for (let j = -2; j <= 2; j++) {
                for (let k = -2; k <= 2; k++) {
                    if (!positions.has(`${x + k},${y + j}`)) {
                        hasGroup = false;
                        break;
                    }
                }
                if (!hasGroup) break;
            }

            if (hasGroup) return step;
        }
    }
};

export { part1, part2 };
