import { IntcodeComputer } from '../../../../scripts/intcode.js';

const part1 = async input => {
    let computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));

    let count = 0;
    let grid = {};
    while (!computer.halted) {
        let x = computer.runUntilOutput(), y = computer.runUntilOutput();
        let tile = computer.runUntilOutput();
        if (computer.halted) break;

        if (tile == 2) count++;
        grid[`${x},${y}`] = tile;
    }

    // let coords = Object.keys(grid).map(element => element.split(',').map(num => parseInt(num)));
    // let minX = coords.reduce((min, coord) => Math.min(min, coord[0]), Infinity);
    // let maxX = coords.reduce((max, coord) => Math.max(max, coord[0]), -Infinity);
    // let minY = coords.reduce((min, coord) => Math.min(min, coord[1]), Infinity);
    // let maxY = coords.reduce((max, coord) => Math.max(max, coord[1]), -Infinity);

    // let characters = [' ', '@', '#', '-', 'o'];
    // let game = '';
    // for (let y = minY; y <= maxY; y++) {
    //     let row = '';
    //     for (let x = minX; x <= maxX; x++) {
    //         row += characters[grid[`${x},${y}`]];
    //     }
    //     game += row + '\n';
    // }
    // console.log(game);
    return count;
}

const part2 = async input => {
    let computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));
    computer.program[0] = 2;

    let ball = { x: 0, direction: 1 };
    let paddle = 0;
    let joystick = 0;
    while (!computer.halted) {
        if (computer.inputs.length == 0) computer.inputs = [joystick];
        let x = computer.runUntilOutput();
        let y = computer.runUntilOutput();
        let tile = computer.runUntilOutput();
        if (computer.halted) break;

        if (tile == 4) ball = { x, direction: 1 };
        if (tile == 3) paddle = x;
        joystick = ball.direction;
        if (ball.x != paddle.x) joystick = 0;
        console.log(ball, paddle, joystick);

        if (x == -1 && y == 0) console.log('score:', tile);
    }
    return 0;
}

export { part1, part2 };