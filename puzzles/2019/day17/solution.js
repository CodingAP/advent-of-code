import { IntcodeComputer } from '../../../../scripts/intcode.js';

const part1 = async input => {
    let camera = {};
    let computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));
    
    let output, x = 0, y = 0;
    do {
        output = computer.runUntilOutput();
        if (output == null) {}
        else if (output == 10) {
            x = 0;
            y++;
        } else camera[`${x++},${y}`] = String.fromCharCode(output);
    } while (output != null);

    return Object.keys(camera).reduce((acc, position) => {
        let [x, y] = position.split(',').map(num => parseInt(num));

        if ([{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 0, y: 0}].reduce((neighbors, direction) => {
            if (camera[`${x + direction.x},${y + direction.y}`] == '#') neighbors++;
            return neighbors;
        }, 0) == 5) acc += x * y;
        return acc;
    }, 0);
}

const part2 = async input => {
    let camera = {};
    let computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));

    let output, x = 0, y = 0;
    do {
        output = computer.runUntilOutput();
        if (output == null) { }
        else if (output == 10) {
            x = 0;
            y++;
        } else camera[`${x++},${y}`] = String.fromCharCode(output);
    } while (output != null);

    let directions = [{ x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }];
    let robot = { x: 0, y: 0, direction: 0 };
    Object.entries(camera).forEach(position => {
        if (position[1].match(/[\<\v\^\>]/g)) {
            let [x, y] = position[0].split(',').map(num => parseInt(num));
            robot = { x, y, direction: ['<', '^', '>', 'v'].indexOf(position[1]) }; 
        }
    });

    let directionList = [], steps = 0;
    while (true) {
        let newPosition = { x: robot.x + directions[robot.direction].x, y: robot.y + directions[robot.direction].y };
        if (camera[`${newPosition.x},${newPosition.y}`] != '#') {
            let left = { x: robot.x + directions[(robot.direction + 3) % 4].x, y: robot.y + directions[(robot.direction + 3) % 4].y };
            let right = { x: robot.x + directions[(robot.direction + 1) % 4].x, y: robot.y + directions[(robot.direction + 1) % 4].y };
        
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

    computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));
    computer.program[0] = 2;
    computer.inputs = 'A,B,A,C,B,C,A,B,A,C\nR,6,L,10,R,8,R,8\nR,12,L,8,L,10\nR,12,L,10,R,6,L,10\nn\n'.split('').map(character => character.charCodeAt(0));
    computer.run();
    
    return computer.outputs[computer.outputs.length - 1];
}

export { part1, part2 };