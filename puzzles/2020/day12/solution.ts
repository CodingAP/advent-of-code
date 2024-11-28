// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day12/solution.ts
 *
 * ~~ Rain Risk ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let instructions = input.split('\n');
    let position = { x: 0, y: 0 };
    let dir = 1;
    
    for (let i = 0; i < instructions.length; i++) {
        let amount = parseInt(instructions[i].slice(1));
        switch (instructions[i].charAt(0)) {
            case 'N':
                position.y += amount;
                break;
            case 'S':
                position.y -= amount;
                break;
            case 'E':
                position.x += amount;
                break;
            case 'W':
                position.x -= amount;
                break;
            case 'L':
                dir -= amount / 90;
                if (dir < 0) dir = 4 + dir;
                break;
            case 'R':
                dir += amount / 90;
                dir = dir % 4;
                break;
            case 'F':
                switch (dir) {
                    case 0:
                        position.y += amount;
                        break;
                    case 1:
                        position.x += amount;
                        break;
                    case 2:
                        position.y -= amount;
                        break;
                    case 3:
                        position.x -= amount;
                        break;
                }
                break;
        }
    }

    return Math.abs(position.x) + Math.abs(position.y);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let instructions = input.split('\n');
    let position = { x: 0, y: 0 };
    let waypoint = { x: 10, y: 1 };
    let dir = 1;

    for (let i = 0; i < instructions.length; i++) {
        let amount = parseInt(instructions[i].slice(1));
        let temp = 0;
        switch (instructions[i].charAt(0)) {
            case 'N':
                waypoint.y += amount;
                break;
            case 'S':
                waypoint.y -= amount;
                break;
            case 'E':
                waypoint.x += amount;
                break;
            case 'W':
                waypoint.x -= amount;
                break;
            case 'L':
                for (let i = 0; i < amount / 90; i++) {
                    temp = waypoint.x;
                    waypoint.x = -waypoint.y;
                    waypoint.y = temp;
                }
                break;
            case 'R':
                for (let i = 0; i < amount / 90; i++) {
                    temp = waypoint.x;
                    waypoint.x = waypoint.y;
                    waypoint.y = -temp;
                }
                break;
            case 'F':
                for (let j = 0; j < amount; j++) {
                    position.x += waypoint.x;
                    position.y += waypoint.y;
                }
                break;
        }
    }

    return Math.abs(position.x) + Math.abs(position.y);
};

export { part1, part2 };
