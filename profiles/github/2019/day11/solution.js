import { IntcodeComputer } from '../../../../scripts/intcode.js';

const part1 = async input => {
    let position = { x: 0, y: 0 };
    let direction = 0;
    let directionVectors = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }];

    let panels = { '0,0': 0 };

    let computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));
    let sendInput = true;
    while (!computer.halted) {
        if (sendInput) {
            computer.inputs = [panels[`${position.x},${position.y}`]];
            sendInput = false;
        }

        if (computer.outputs.length == 2) {
            panels[`${position.x},${position.y}`] = computer.outputs[0];
            if (computer.outputs[1] == 0) {
                direction--;
                if (direction < 0) direction = directionVectors.length - 1;
            } else {
                direction = (direction + 1) % (directionVectors.length - 1);
            }
            computer.outputs = [];

            position.x += directionVectors[direction].x;
            position.y += directionVectors[direction].y;

            if (panels[`${position.x},${position.y}`] == null) panels[`${position.x},${position.y}`] = 0;
            sendInput = true;
        }

        computer.runInstruction();
    }

    return Object.keys(panels).length;
}

const part2 = async input => {
    return 0;
}

export { part1, part2 };