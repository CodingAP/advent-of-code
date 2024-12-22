/**
 * puzzles/2019/day12/solution.ts
 *
 * ~~ The N-Body Problem ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/21/2024
 */

/**
 * find the greatest common factor of two numbers
 */
const gcf = (a: number, b: number): number => b == 0 ? a : gcf(b, a % b);

/**
 * find the least common multiple of two numbers
 */
const lcm = (a: number, b: number): number => a / gcf(a, b) * b;

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const bodies = input.trim().split('\n').map(line => {
        const [x, y, z] = line.replace(/[<>]/g, '').split(', ').map(num => parseInt(num.split('=')[1]));
        return { position: { x, y, z }, velocity: { x: 0, y: 0, z: 0 } };
    });

    for (let step = 0; step < 1000; step++) {
        // update velocity 
        for (let i = 0; i < bodies.length; i++) {
            for (let j = 0; j < bodies.length; j++) {
                if (i === j) continue;

                bodies[i].velocity.x += Math.sign(bodies[j].position.x - bodies[i].position.x);
                bodies[i].velocity.y += Math.sign(bodies[j].position.y - bodies[i].position.y);
                bodies[i].velocity.z += Math.sign(bodies[j].position.z - bodies[i].position.z);
            }   
        }

        // update position
        for (let i = 0; i < bodies.length; i++) {
            bodies[i].position.x += bodies[i].velocity.x;
            bodies[i].position.y += bodies[i].velocity.y;
            bodies[i].position.z += bodies[i].velocity.z;
        }
    }

    let energy = 0;

    for (let i = 0; i < bodies.length; i++) {
        const position = Math.abs(bodies[i].position.x) + Math.abs(bodies[i].position.y) + Math.abs(bodies[i].position.z);
        const velocity = Math.abs(bodies[i].velocity.x) + Math.abs(bodies[i].velocity.y) + Math.abs(bodies[i].velocity.z);

        energy += position * velocity;
    }

    return energy;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const bodies = input.trim().split('\n').map(line => {
        const [x, y, z] = line.replace(/[<>]/g, '').split(', ').map(num => parseInt(num.split('=')[1]));
        return { position: { x, y, z }, velocity: { x: 0, y: 0, z: 0 } };
    });

    const repeats = ['x', 'y', 'z'].map(axis => {
        let steps = 0;
        const visited = new Set<string>();
        while (true) {
            // update velocity 
            for (let i = 0; i < bodies.length; i++) {
                for (let j = 0; j < bodies.length; j++) {
                    if (i === j) continue;

                    bodies[i].velocity[axis] += Math.sign(bodies[j].position[axis] - bodies[i].position[axis]);
                }   
            }

            // update position
            for (let i = 0; i < bodies.length; i++) {
                bodies[i].position[axis] += bodies[i].velocity[axis];
            }

            let keys: string[] = [];
            for (let i = 0; i < bodies.length; i++) {
                keys.push(`${bodies[i].position[axis]},${bodies[i].velocity[axis]}`);
            }

            if (visited.has(keys.join('|'))) return steps;
            visited.add(keys.join('|'));

            steps++;
        }
    });

    return repeats.reduce((acc, num) => lcm(acc, num), 1);
};

export { part1, part2 };
