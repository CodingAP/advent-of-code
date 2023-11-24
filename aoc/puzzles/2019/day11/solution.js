import { IntcodeComputer } from '../../../../scripts/intcode.js';

const part1 = async input => {
    let position = { x: 0, y: 0 };
    let direction = 0;
    let directionVectors = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }];

    let panels = { '0,0': 0 };

    let computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));
    computer.inputs = [panels[`${position.x},${position.y}`]];
    while (!computer.halted) {
        let color = computer.runUntilOutput();
        let turn = computer.runUntilOutput();

        if (computer.halted) break;

        panels[`${position.x},${position.y}`] = color;

        if (turn == 0) {
            direction--;
            if (direction < 0) direction = directionVectors.length - 1;
        } else {
            direction = (direction + 1) % (directionVectors.length - 1);
        }

        position.x += directionVectors[direction].x;
        position.y += directionVectors[direction].y;

        computer.inputs = [panels[`${position.x},${position.y}`] || 0];
    }

    return Object.keys(panels).length;
}

const part2 = async input => {
    let position = { x: 0, y: 0 };
    let direction = 0;
    let directionVectors = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }];

    let panels = { '0,0': 1 };

    let computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));
    computer.inputs = [panels[`${position.x},${position.y}`]];
    while (!computer.halted) {
        let color = computer.runUntilOutput();
        let turn = computer.runUntilOutput();

        if (computer.halted) break;

        panels[`${position.x},${position.y}`] = color;

        if (turn == 0) {
            direction--;
            if (direction < 0) direction = directionVectors.length - 1;
        } else {
            direction = (direction + 1) % (directionVectors.length - 1);
        }

        position.x += directionVectors[direction].x;
        position.y += directionVectors[direction].y;

        computer.inputs = [panels[`${position.x},${position.y}`] || 0];
    }

    let coords = Object.keys(panels).map(element => element.split(',').map(num => parseInt(num)));
    let minX = coords.reduce((min, coord) => Math.min(min, coord[0]), Infinity);
    let maxX = coords.reduce((max, coord) => Math.max(max, coord[0]), -Infinity);
    let minY = coords.reduce((min, coord) => Math.min(min, coord[1]), Infinity);
    let maxY = coords.reduce((max, coord) => Math.max(max, coord[1]), -Infinity);
    
    let identifier = '';
    for (let y = minY; y <= maxY; y++) {
        let row = '';
        for (let x = minX; x <= maxX; x++) {
            row += (panels[`${x},${y}`] == 1) ? '#' : ' '; 
        }
        identifier += row + '\n';
    }
    console.log(identifier);
    return 'idk yet';
}

export { part1, part2 };