/**
 * puzzles/2019/day03/solution.ts
 *
 * ~~ Crossed Wires ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/20/2024
 */

const DIRECTIONS: { [key: string]: { x: number, y: number } } = {
    L: { x: -1, y: 0 },
    D: { x: 0, y: -1 },
    R: { x: 1, y: 0 },
    U: { x: 0, y: 1 },
};

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const wires = input.trim().split('\n').reduce<{ direction: string, steps: number }[][]>((wires, wire) => {
        wires.push(wire.split(',').map(direction => {
            return { direction: direction[0], steps: parseInt(direction.slice(1)) };
        }));

        return wires;
    }, []);

    const wirePoints = wires.map(wire => {
        const locations = new Set<string>();
        const position = { x: 0, y: 0 };

        for (let i = 0; i < wire.length; i++) {
            for (let step = 0; step < wire[i].steps; step++) {
                position.x += DIRECTIONS[wire[i].direction].x;
                position.y += DIRECTIONS[wire[i].direction].y;
                locations.add(`${position.x},${position.y}`);
            }
        }

        return locations;
    });

    return Math.min(...Array.from(wirePoints[0].intersection(wirePoints[1]))
        .map(intersection => intersection.split(',').reduce((sum, num) => sum + Math.abs(parseInt(num)), 0)));
}

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const wires = input.trim().split('\n').reduce<{ direction: string, steps: number }[][]>((wires, wire) => {
        wires.push(wire.split(',').map(direction => {
            return { direction: direction[0], steps: parseInt(direction.slice(1)) };
        }));

        return wires;
    }, []);

    const wirePoints = wires.map(wire => {
        const locations: { [key: string]: number } = {};
        const position = { x: 0, y: 0 };
        let totalSteps = 1;

        for (let i = 0; i < wire.length; i++) {
            for (let step = 0; step < wire[i].steps; step++) {
                position.x += DIRECTIONS[wire[i].direction].x;
                position.y += DIRECTIONS[wire[i].direction].y;

                locations[`${position.x},${position.y}`] = Math.min(locations[`${position.x},${position.y}`] || Infinity, totalSteps);
                totalSteps++;
            }
        }

        return locations;
    });

    return Object.keys(wirePoints[0]).filter(point => wirePoints[1][point])
        .reduce((min, intersection) => Math.min(min, wirePoints[0][intersection] + wirePoints[1][intersection]), Infinity);
}

export { part1, part2 };