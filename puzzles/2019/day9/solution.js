import { IntcodeComputer } from '../../../../scripts/intcode.js';

const part1 = async input => {
    let computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));
    computer.inputs = [1];
    computer.run();

    return computer.outputs[computer.outputs.length - 1];
}

const part2 = async input => {
    let computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));
    computer.inputs = [2];
    computer.run();

    return computer.outputs[computer.outputs.length - 1];
}

export { part1, part2 };