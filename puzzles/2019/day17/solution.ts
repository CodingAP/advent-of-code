/**
 * puzzles/2019/day17/solution.ts
 *
 * ~~ Care Package ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/24/2024
 */

import IntcodeComputer from '../intcode.ts';

const DIRECTIONS = [{ x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }];

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const camera: { [key: string]: string } = {};
    const computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));
    
    let x = 0, y = 0;
    while (!computer.halted) {
        const output = computer.runUntilOutput();
        if (output === undefined) break;

        if (output === 10) {
            x = 0;
            y++;
        } else camera[`${x++},${y}`] = String.fromCharCode(output);
    }

    return Object.keys(camera).reduce((sum, position) => {
        const [x, y] = position.split(',').map(num => parseInt(num));
        if ([...DIRECTIONS, { x: 0, y: 0 }].every(direction => camera[`${x + direction.x},${y + direction.y}`] === '#')) sum += x * y;
        return sum;
    }, 0);
}

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const camera: { [key: string]: string } = {};
    const computer = new IntcodeComputer(input.trim().split(',').map(num => parseInt(num)));
    
    let x = 0, y = 0;
    while (!computer.halted) {
        const output = computer.runUntilOutput();
        if (output === undefined) break;

        if (output === 10) {
            x = 0;
            y++;
        } else camera[`${x++},${y}`] = String.fromCharCode(output);
    }

    let robot = { x: 0, y: 0, direction: 0 };
    Object.entries(camera).forEach(position => {
        if (position[1].match(/[\<\v\^\>]/g)) {
            const [x, y] = position[0].split(',').map(num => parseInt(num));
            robot = { x, y, direction: ['<', '^', '>', 'v'].indexOf(position[1]) }; 
        }
    });

    const directionList: (number | string)[] = [];
    let steps = 0;
    while (true) {
        const newPosition = { x: robot.x + DIRECTIONS[robot.direction].x, y: robot.y + DIRECTIONS[robot.direction].y };
        if (camera[`${newPosition.x},${newPosition.y}`] != '#') {
            const left = { x: robot.x + DIRECTIONS[(robot.direction + 3) % 4].x, y: robot.y + DIRECTIONS[(robot.direction + 3) % 4].y };
            const right = { x: robot.x + DIRECTIONS[(robot.direction + 1) % 4].x, y: robot.y + DIRECTIONS[(robot.direction + 1) % 4].y };
        
            if (camera[`${left.x},${left.y}`] == '#') {
                robot.direction = (robot.direction + 3) % 4;
                directionList.push(steps, 'L');
                steps = 0;
            }
            else if (camera[`${right.x},${right.y}`] == '#') {
                robot.direction = (robot.direction + 1) % 4;
                directionList.push(steps, 'R');
                steps = 0;
            }
            else break;
        } else {
            robot.x = newPosition.x;
            robot.y = newPosition.y;
            steps++;
        }
    }
    directionList.push(steps);

    // R 6 L 10 R 8 R 8 R 12 L 8 L 10 R 6 L 10 R 8 R 8 R 12 L 10 R 6 L 10 R 12 L 8 L 10 R 12 L 10 R 6 L 10 R 6 L 10 R 8 R 8 R 12 L 8 L 10 R 6 L 10 R 8 R 8 R 12 L 10 R 6 L 10
    // Which can be broke down to...
    // A,B,A,C,B,C,A,B,A,C
    // A: R,6,L,10,R,8,R,8
    // B: R,12,L,8,L,10
    // C: R,12,L,10,R,6,L,10

    const vacuum = new IntcodeComputer(input.trim().split(',').map(num => parseInt(num)));
    vacuum.program[0] = 2;
    vacuum.inputs = 'A,B,A,C,B,C,A,B,A,C\nR,6,L,10,R,8,R,8\nR,12,L,8,L,10\nR,12,L,10,R,6,L,10\ny\n'.split('').map(character => character.charCodeAt(0));
    vacuum.run();
    return vacuum.outputs.at(-1);
}

export { part1, part2 };