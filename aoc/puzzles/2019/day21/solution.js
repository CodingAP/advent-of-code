import { IntcodeComputer } from '../../../../scripts/intcode.js';

const part1 = async input => {
    let computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));

    computer.inputs = `NOT C J\nAND D J\nNOT A T\nOR T J\nWALK\n`.split('').map(character => character.charCodeAt(0));
    let output = computer.runUntilOutput();
    do {
        if (output > 127) return output;
        process.stdout.write(String.fromCharCode(output));
        output = computer.runUntilOutput();
    } while (output != null)
}

const part2 = async input => {
    let computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));

    computer.inputs = `NOT C J\nAND D J\nAND H J\nNOT B T\nAND D T\nOR T J\nNOT A T\nOR T J\nRUN\n`.split('').map(character => character.charCodeAt(0));
    let output = computer.runUntilOutput();
    do {
        if (output > 127) return output;
        process.stdout.write(String.fromCharCode(output));
        output = computer.runUntilOutput();
    } while (output != null)
}

export { part1, part2 };