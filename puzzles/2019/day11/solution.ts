/**
 * puzzles/2019/day11/solution.ts
 *
 * ~~ Space Police ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/20/2024
 */

import IntcodeComputer from '../intcode.ts';

const DIRECTIONS = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }];

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const computer = new IntcodeComputer(input.trim().split(',').map(num => parseInt(num)));

    const robot = { x: 0, y: 0, direction: 0 };
    const panels: { [key: string]: number } = { [`${robot.x},${robot.y}`]: 0 };

    computer.inputs.push(panels[`${robot.x},${robot.y}`]);

    while (!computer.halted) {
        const color = computer.runUntilOutput();
        if (color === undefined) break;
        const direction = computer.runUntilOutput();
        if (direction === undefined) break;

        panels[`${robot.x},${robot.y}`] = color;
        robot.direction = (robot.direction + (direction === 0 ? 3 : 1)) % DIRECTIONS.length;
        robot.x += DIRECTIONS[robot.direction].x;
        robot.y += DIRECTIONS[robot.direction].y;

        if (panels[`${robot.x},${robot.y}`] === undefined) panels[`${robot.x},${robot.y}`] = 0;
        computer.inputs.push(panels[`${robot.x},${robot.y}`]);
    }

    return Object.values(panels).length;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const computer = new IntcodeComputer(input.trim().split(',').map(num => parseInt(num)));

    const robot = { x: 0, y: 0, direction: 0 };
    const panels: { [key: string]: number } = { [`${robot.x},${robot.y}`]: 1 };

    computer.inputs.push(panels[`${robot.x},${robot.y}`]);

    while (!computer.halted) {
        const color = computer.runUntilOutput();
        if (color === undefined) break;
        const direction = computer.runUntilOutput();
        if (direction === undefined) break;

        panels[`${robot.x},${robot.y}`] = color;
        robot.direction = (robot.direction + (direction === 0 ? 3 : 1)) % DIRECTIONS.length;
        robot.x += DIRECTIONS[robot.direction].x;
        robot.y += DIRECTIONS[robot.direction].y;

        if (panels[`${robot.x},${robot.y}`] === undefined) panels[`${robot.x},${robot.y}`] = 0;
        computer.inputs.push(panels[`${robot.x},${robot.y}`]);
    }

    const coords = Object.keys(panels).map(position => position.split(',').map(num => parseInt(num)));
    const minX = Math.min(...coords.map(coord => coord[0]));
    const maxX = Math.max(...coords.map(coord => coord[0]));
    const minY = Math.min(...coords.map(coord => coord[1]));
    const maxY = Math.max(...coords.map(coord => coord[1]));

    for (let y = maxY; y >= minY; y--) {
        let row = '';
        for (let x = minX; x <= maxX; x++) {
            if (panels[`${x},${y}`] === 1) row += '#';
            else row += ' ';
        }
        console.log(row);
    }

    return 'HCZRUGAZ';
};

export { part1, part2 };
