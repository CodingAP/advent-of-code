import { IntcodeComputer } from '../../../../scripts/intcode.js';

const part1 = async input => {
    let amount = 0;
    for (let y = 0; y < 50; y++) {
        for (let x = 0; x < 50; x++) {
            let computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));
            computer.inputs = [x, y];
            computer.run();
            if (computer.outputs[0] == 1) amount++;
        }
    }
    return amount;
}

const part2 = async input => {
    let position = { x: 0, y: 0 };
    while (true) {
        let computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));
        computer.inputs = [position.x, position.y];
        computer.run();
        if (computer.outputs[0] == 1) {
            let valid = true;
            [{ x: position.x + 100, y: position.y }, { x: position.x + 100, y: position.y + 100 }, { x: position.x, y: position.y + 100 }].forEach(corner => {
                let computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));
                computer.inputs = [corner.x, corner.y];
                computer.run();
                if (computer.outputs[0] == 0) valid = false;
            })
            if (valid) break;
        }

        position.x++;
        position.y++;
        console.log(position);
    }

    return position.x * 10000 + position.y;
}

export { part1, part2 };